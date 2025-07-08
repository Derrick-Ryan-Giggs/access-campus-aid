import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Calculator, BookOpen, Hash, Volume2, Loader2 } from 'lucide-react';
import { useAcademicAPIs } from '@/hooks/useAcademicAPIs';

const StudyAssistant = () => {
  const { searchDuckDuckGo, getNumberFact, getDefinition, calculate, loading } = useAcademicAPIs();
  const [searchQuery, setSearchQuery] = useState('');
  const [definitionQuery, setDefinitionQuery] = useState('');
  const [calculationQuery, setCalculationQuery] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [definitionResult, setDefinitionResult] = useState<any>(null);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [numberFact, setNumberFact] = useState<any>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    const result = await searchDuckDuckGo(searchQuery);
    setSearchResult(result);
  };

  const handleDefinition = async () => {
    if (!definitionQuery.trim()) return;
    const result = await getDefinition(definitionQuery);
    setDefinitionResult(result);
  };

  const handleCalculation = async () => {
    if (!calculationQuery.trim()) return;
    const result = await calculate(calculationQuery);
    setCalculationResult(result);
  };

  const handleNumberFact = async () => {
    const number = numberInput ? parseInt(numberInput) : undefined;
    const result = await getNumberFact(number);
    setNumberFact(result);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">AI Study Assistant</h2>
        <p className="text-muted-foreground">
          Get instant help with definitions, calculations, facts, and quick searches
        </p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="search">Quick Search</TabsTrigger>
          <TabsTrigger value="dictionary">Dictionary</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="facts">Number Facts</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Quick Search & Definitions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for anything..."
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
        </TabsContent>

        <TabsContent value="dictionary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                English Dictionary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a word to define..."
                  value={definitionQuery}
                  onChange={(e) => setDefinitionQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleDefinition()}
                />
                <Button onClick={handleDefinition} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
                </Button>
              </div>

              {definitionResult && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{definitionResult.word}</h3>
                      {definitionResult.phonetic && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{definitionResult.phonetic}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => speakText(definitionResult.word)}
                          >
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {definitionResult.meanings.map((meaning: any, index: number) => (
                      <div key={index} className="mb-4">
                        <Badge variant="outline" className="mb-2">
                          {meaning.partOfSpeech}
                        </Badge>
                        {meaning.definitions.map((def: any, defIndex: number) => (
                          <div key={defIndex} className="ml-4 mb-2">
                            <p className="text-sm font-medium">{def.definition}</p>
                            {def.example && (
                              <p className="text-xs text-muted-foreground italic mt-1">
                                Example: {def.example}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}

                    {definitionResult.origin && (
                      <div className="mt-4 p-2 bg-background rounded border-l-4 border-primary">
                        <p className="text-sm"><strong>Origin:</strong> {definitionResult.origin}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter calculation (e.g., 2+2, sqrt(16))..."
                  value={calculationQuery}
                  onChange={(e) => setCalculationQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculation()}
                />
                <Button onClick={handleCalculation} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calculator className="h-4 w-4" />}
                </Button>
              </div>

              {calculationResult && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">{calculationResult.expression}</p>
                      <p className="text-2xl font-bold text-primary">{calculationResult.result}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5" />
                Number Facts & Trivia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter a number (or leave blank for random)..."
                  value={numberInput}
                  onChange={(e) => setNumberInput(e.target.value)}
                  type="number"
                />
                <Button onClick={handleNumberFact} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Hash className="h-4 w-4" />}
                  Get Fact
                </Button>
              </div>

              {numberFact && (
                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <Badge variant="secondary" className="mb-3">
                        {numberFact.type} about {numberFact.number}
                      </Badge>
                      <p className="text-lg">{numberFact.text}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2"
                        onClick={() => speakText(numberFact.text)}
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyAssistant;