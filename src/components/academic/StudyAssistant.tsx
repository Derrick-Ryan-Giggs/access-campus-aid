import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2 } from 'lucide-react';
import { useAcademicAPIs } from '@/hooks/useAcademicAPIs';

const StudyAssistant = () => {
  const { searchDuckDuckGo, loading } = useAcademicAPIs();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const result = await searchDuckDuckGo(searchQuery);
    setSearchResult(result);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">AI Study Assistant</h2>
        <p className="text-muted-foreground">
          Get instant help with research, quick searches, and academic information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Search & Research
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for anything academic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>

          {searchResult && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                {searchResult.abstract && (
                  <div>
                    <h4 className="font-semibold mb-2">{searchResult.source}</h4>
                    <p className="text-sm mb-2">{searchResult.abstract}</p>
                    {searchResult.url && (
                      <a href={searchResult.url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                        Read more →
                      </a>
                    )}
                  </div>
                )}
                
                {searchResult.answer && (
                  <div>
                    <Badge variant="secondary" className="mb-2">{searchResult.answerType}</Badge>
                    <p className="font-semibold">{searchResult.answer}</p>
                  </div>
                )}
                
                {searchResult.definition && (
                  <div>
                    <h4 className="font-semibold mb-2">Definition</h4>
                    <p className="text-sm">{searchResult.definition}</p>
                    {searchResult.url && (
                      <a href={searchResult.url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline">
                        Source: {searchResult.source}
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyAssistant;