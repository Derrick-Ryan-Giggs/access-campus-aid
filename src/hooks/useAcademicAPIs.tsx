import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useAcademicAPIs = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // DuckDuckGo Instant Answer API
  const searchDuckDuckGo = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
      const data = await response.json();
      
      if (data.AbstractText) {
        return {
          abstract: data.AbstractText,
          source: data.AbstractSource,
          url: data.AbstractURL,
          image: data.Image
        };
      }
      
      if (data.Answer) {
        return {
          answer: data.Answer,
          answerType: data.AnswerType,
          type: 'answer'
        };
      }

      if (data.Definition) {
        return {
          definition: data.Definition,
          source: data.DefinitionSource,
          url: data.DefinitionURL,
          type: 'definition'
        };
      }

      return null;
    } catch (error) {
      console.error('DuckDuckGo API error:', error);
      toast({
        title: "Search Error",
        description: "Failed to search. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Numbers API
  const getNumberFact = async (number?: number, type: 'trivia' | 'math' | 'date' = 'trivia') => {
    try {
      setLoading(true);
      const num = number || Math.floor(Math.random() * 1000);
      const response = await fetch(`http://numbersapi.com/${num}/${type}?json`);
      const data = await response.json();
      
      return {
        text: data.text,
        number: data.number,
        type: data.type,
        found: data.found
      };
    } catch (error) {
      console.error('Numbers API error:', error);
      toast({
        title: "Number Facts Error",
        description: "Failed to get number facts. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Free Dictionary API
  const getDefinition = async (word: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        return {
          word: entry.word,
          phonetic: entry.phonetic,
          phonetics: entry.phonetics,
          meanings: entry.meanings.map((meaning: any) => ({
            partOfSpeech: meaning.partOfSpeech,
            definitions: meaning.definitions.map((def: any) => ({
              definition: def.definition,
              example: def.example,
              synonyms: def.synonyms
            }))
          })),
          origin: entry.origin
        };
      }
      
      return null;
    } catch (error) {
      console.error('Dictionary API error:', error);
      toast({
        title: "Dictionary Error",
        description: "Failed to get definition. Please check spelling and try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Calculate mathematical expressions
  const calculate = async (expression: string) => {
    try {
      setLoading(true);
      // Simple calculation using DuckDuckGo for safety
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(expression)}&format=json&no_html=1&skip_disambig=1`);
      const data = await response.json();
      
      if (data.Answer && data.AnswerType === 'calc') {
        return {
          expression,
          result: data.Answer,
          type: 'calculation'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Calculation error:', error);
      toast({
        title: "Calculation Error",
        description: "Failed to calculate. Please check your expression.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchDuckDuckGo,
    getNumberFact,
    getDefinition,
    calculate,
    loading
  };
};