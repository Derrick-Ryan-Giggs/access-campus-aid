import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useEntertainmentAPIs = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // PokeAPI
  const getRandomPokemon = async () => {
    try {
      setLoading(true);
      const randomId = Math.floor(Math.random() * 1010) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      
      return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        types: data.types.map((type: any) => type.type.name),
        sprites: data.sprites,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        stats: data.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      };
    } catch (error) {
      console.error('PokeAPI error:', error);
      toast({
        title: "Pokemon Error",
        description: "Failed to get Pokemon data. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Rick and Morty API
  const getRandomCharacter = async () => {
    try {
      setLoading(true);
      const randomId = Math.floor(Math.random() * 826) + 1;
      const response = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
      const data = await response.json();
      
      return {
        id: data.id,
        name: data.name,
        status: data.status,
        species: data.species,
        type: data.type,
        gender: data.gender,
        origin: data.origin.name,
        location: data.location.name,
        image: data.image,
        episode: data.episode
      };
    } catch (error) {
      console.error('Rick and Morty API error:', error);
      toast({
        title: "Character Error",
        description: "Failed to get character data. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Joke API
  const getRandomJoke = async (category: string = 'Any') => {
    try {
      setLoading(true);
      const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single`);
      const data = await response.json();
      
      if (data.error) {
        // Try with two-part joke
        const twoPartResponse = await fetch(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart`);
        const twoPartData = await twoPartResponse.json();
        
        return {
          setup: twoPartData.setup,
          delivery: twoPartData.delivery,
          category: twoPartData.category,
          type: 'twopart'
        };
      }
      
      return {
        joke: data.joke,
        category: data.category,
        type: 'single'
      };
    } catch (error) {
      console.error('Joke API error:', error);
      toast({
        title: "Joke Error",
        description: "Failed to get jokes. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fun trivia game
  const startTriviaGame = async () => {
    try {
      setLoading(true);
      const [pokemon, character, joke] = await Promise.all([
        getRandomPokemon(),
        getRandomCharacter(),
        getRandomJoke()
      ]);
      
      return {
        pokemon,
        character,
        joke,
        gameId: Date.now()
      };
    } catch (error) {
      console.error('Trivia game error:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getRandomPokemon,
    getRandomCharacter,
    getRandomJoke,
    startTriviaGame,
    loading
  };
};