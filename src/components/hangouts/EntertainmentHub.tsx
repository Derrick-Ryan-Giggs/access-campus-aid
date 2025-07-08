import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Users, Smile, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { useEntertainmentAPIs } from '@/hooks/useEntertainmentAPIs';

const EntertainmentHub = () => {
  const { getRandomPokemon, getRandomCharacter, getRandomJoke, startTriviaGame, loading } = useEntertainmentAPIs();
  const [pokemon, setPokemon] = useState<any>(null);
  const [character, setCharacter] = useState<any>(null);
  const [joke, setJoke] = useState<any>(null);
  const [triviaData, setTriviaData] = useState<any>(null);

  const handleGetPokemon = async () => {
    const result = await getRandomPokemon();
    setPokemon(result);
  };

  const handleGetCharacter = async () => {
    const result = await getRandomCharacter();
    setCharacter(result);
  };

  const handleGetJoke = async () => {
    const result = await getRandomJoke();
    setJoke(result);
  };

  const handleStartTrivia = async () => {
    const result = await startTriviaGame();
    setTriviaData(result);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Entertainment Hub</h2>
        <p className="text-muted-foreground">
          Fun activities to break the ice and connect with others!
        </p>
      </div>

      <Tabs defaultValue="pokemon" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pokemon">Pokémon</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
          <TabsTrigger value="jokes">Jokes</TabsTrigger>
          <TabsTrigger value="trivia">Trivia Game</TabsTrigger>
        </TabsList>

        <TabsContent value="pokemon" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Random Pokémon Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGetPokemon} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Get Random Pokémon
              </Button>

              {pokemon && (
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="mx-auto w-32 h-32"
                      />
                      <h3 className="text-2xl font-bold capitalize">{pokemon.name}</h3>
                      
                      <div className="flex justify-center gap-2">
                        {pokemon.types.map((type: string) => (
                          <Badge key={type} variant="secondary" className="capitalize">
                            {type}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
                          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
                        </div>
                        <div>
                          <p><strong>ID:</strong> #{pokemon.id}</p>
                          <p><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Base Stats</h4>
                        <div className="space-y-1">
                          {pokemon.stats.map((stat: any) => (
                            <div key={stat.name} className="flex justify-between text-sm">
                              <span className="capitalize">{stat.name.replace('-', ' ')}:</span>
                              <span className="font-medium">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="characters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Rick & Morty Characters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGetCharacter} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                Get Random Character
              </Button>

              {character && (
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-48 h-48 mx-auto md:mx-0 rounded-lg object-cover"
                      />
                      <div className="flex-1 space-y-3">
                        <h3 className="text-2xl font-bold">{character.name}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Status:</span>
                            <Badge 
                              variant={character.status === 'Alive' ? 'default' : character.status === 'Dead' ? 'destructive' : 'secondary'}
                            >
                              {character.status}
                            </Badge>
                          </div>
                          <div>
                            <span className="font-medium">Species:</span> {character.species}
                          </div>
                          <div>
                            <span className="font-medium">Gender:</span> {character.gender}
                          </div>
                          <div>
                            <span className="font-medium">Origin:</span> {character.origin}
                          </div>
                          <div className="md:col-span-2">
                            <span className="font-medium">Location:</span> {character.location}
                          </div>
                          {character.type && (
                            <div className="md:col-span-2">
                              <span className="font-medium">Type:</span> {character.type}
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-medium">Featured in {character.episode.length} episodes</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jokes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="h-5 w-5" />
                Random Jokes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleGetJoke} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Smile className="h-4 w-4 mr-2" />}
                Get Random Joke
              </Button>

              {joke && (
                <Card className="bg-muted/50">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <Badge variant="outline" className="mb-3">
                        {joke.category}
                      </Badge>
                      
                      {joke.type === 'single' ? (
                        <p className="text-lg">{joke.joke}</p>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-lg font-medium">{joke.setup}</p>
                          <p className="text-lg text-primary">{joke.delivery}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trivia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Trivia Game
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={handleStartTrivia} disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Start New Trivia Round
              </Button>

              {triviaData && (
                <div className="space-y-4">
                  {triviaData.pokemon && (
                    <Card className="bg-blue-50 dark:bg-blue-950/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Pokémon Challenge</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <img
                            src={triviaData.pokemon.sprites.front_default}
                            alt="Mystery Pokemon"
                            className="w-24 h-24"
                          />
                          <div>
                            <p className="font-medium">Who's that Pokémon?</p>
                            <p className="text-sm text-muted-foreground">
                              Hint: It's a {triviaData.pokemon.types.join('/')} type
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="mt-2"
                              onClick={() => alert(`It's ${triviaData.pokemon.name}!`)}
                            >
                              Reveal Answer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {triviaData.character && (
                    <Card className="bg-green-50 dark:bg-green-950/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Character Challenge</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <img
                            src={triviaData.character.image}
                            alt="Mystery Character"
                            className="w-24 h-24 rounded object-cover"
                            style={{ filter: 'blur(10px)' }}
                          />
                          <div>
                            <p className="font-medium">Name this Rick & Morty character!</p>
                            <p className="text-sm text-muted-foreground">
                              Species: {triviaData.character.species} | Status: {triviaData.character.status}
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="mt-2"
                              onClick={() => alert(`It's ${triviaData.character.name}!`)}
                            >
                              Reveal Answer
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {triviaData.joke && (
                    <Card className="bg-purple-50 dark:bg-purple-950/30">
                      <CardHeader>
                        <CardTitle className="text-lg">Bonus Joke</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {triviaData.joke.type === 'single' ? (
                          <p>{triviaData.joke.joke}</p>
                        ) : (
                          <div className="space-y-2">
                            <p className="font-medium">{triviaData.joke.setup}</p>
                            <p className="text-primary">{triviaData.joke.delivery}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EntertainmentHub;