import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useEnhancedAcademicAPIs() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Google Scholar API (using scholarly search)
  const searchScholar = async (query: string) => {
    setLoading(true);
    try {
      // Using serpapi for Google Scholar search (free tier available)
      const response = await fetch(`https://serpapi.com/search.json?engine=google_scholar&q=${encodeURIComponent(query)}&api_key=demo`);
      const data = await response.json();
      
      return {
        results: data.organic_results?.slice(0, 5).map((result: any) => ({
          title: result.title,
          authors: result.publication_info?.authors,
          snippet: result.snippet,
          link: result.link,
          citation_count: result.inline_links?.cited_by?.total,
          year: result.publication_info?.summary?.match(/\d{4}/)?.[0]
        })) || [],
        total: data.search_information?.total_results || 0
      };
    } catch (error) {
      console.error('Scholar search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to search academic papers at this time",
        variant: "destructive"
      });
      return { results: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // arXiv API for scientific papers
  const searchArxiv = async (query: string, maxResults = 10) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}&start=0&max_results=${maxResults}`
      );
      const xmlText = await response.text();
      
      // Parse XML response (simplified)
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      const entries = xmlDoc.querySelectorAll('entry');
      
      const results = Array.from(entries).map(entry => {
        const id = entry.querySelector('id')?.textContent || '';
        const title = entry.querySelector('title')?.textContent?.replace(/\s+/g, ' ').trim() || '';
        const summary = entry.querySelector('summary')?.textContent?.replace(/\s+/g, ' ').trim() || '';
        const authors = Array.from(entry.querySelectorAll('author name')).map(
          author => author.textContent
        );
        const published = entry.querySelector('published')?.textContent || '';
        const categories = Array.from(entry.querySelectorAll('category')).map(
          cat => cat.getAttribute('term')
        );
        
        return {
          id: id.split('/').pop(),
          title,
          authors,
          summary,
          published: new Date(published).toLocaleDateString(),
          categories,
          url: id
        };
      });
      
      return { results, total: results.length };
    } catch (error) {
      console.error('arXiv search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to search arXiv papers at this time",
        variant: "destructive"
      });
      return { results: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // OpenLibrary API for books and academic resources
  const searchBooks = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=10`
      );
      const data = await response.json();
      
      return {
        results: data.docs?.map((book: any) => ({
          title: book.title,
          authors: book.author_name || [],
          first_publish_year: book.first_publish_year,
          isbn: book.isbn?.[0],
          cover_id: book.cover_i,
          subjects: book.subject?.slice(0, 5) || [],
          key: book.key,
          url: `https://openlibrary.org${book.key}`
        })) || [],
        total: data.numFound || 0
      };
    } catch (error) {
      console.error('OpenLibrary search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to search books at this time",
        variant: "destructive"
      });
      return { results: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // CrossRef API for citation data
  const searchCitations = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.crossref.org/works?query=${encodeURIComponent(query)}&rows=10`
      );
      const data = await response.json();
      
      return {
        results: data.message?.items?.map((item: any) => ({
          title: item.title?.[0],
          authors: item.author?.map((author: any) => 
            `${author.given || ''} ${author.family || ''}`.trim()
          ) || [],
          journal: item['container-title']?.[0],
          published: item.published?.['date-parts']?.[0]?.join('-'),
          doi: item.DOI,
          cited_by: item['is-referenced-by-count'] || 0,
          url: item.URL
        })) || [],
        total: data.message?.['total-results'] || 0
      };
    } catch (error) {
      console.error('CrossRef search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to search citations at this time",
        variant: "destructive"
      });
      return { results: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  return {
    searchScholar,
    searchArxiv,
    searchBooks,
    searchCitations,
    loading
  };
}