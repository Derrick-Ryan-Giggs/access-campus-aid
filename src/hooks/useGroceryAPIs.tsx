import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useGroceryAPIs() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // USDA FoodData Central API
  const searchFoodData = async (query: string) => {
    setLoading(true);
    try {
      // Using the free demo API
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=25&api_key=DEMO_KEY`
      );
      const data = await response.json();
      
      return {
        foods: data.foods?.slice(0, 10).map((food: any) => ({
          id: food.fdcId,
          description: food.description,
          brandOwner: food.brandOwner,
          nutrients: food.foodNutrients?.slice(0, 5).map((nutrient: any) => ({
            name: nutrient.nutrientName,
            amount: nutrient.value,
            unit: nutrient.unitName
          })) || [],
          category: food.foodCategory,
          score: food.score
        })) || [],
        total: data.totalHits || 0
      };
    } catch (error) {
      console.error('USDA FoodData search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to search food data at this time",
        variant: "destructive"
      });
      return { foods: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // Open Food Facts API
  const searchOpenFood = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=20`
      );
      const data = await response.json();
      
      return {
        products: data.products?.slice(0, 10).map((product: any) => ({
          id: product.id,
          name: product.product_name || product.product_name_en,
          brand: product.brands,
          categories: product.categories?.split(',').slice(0, 3) || [],
          nutrition_score: product.nutrition_grades,
          image: product.image_front_small_url,
          ingredients: product.ingredients_text_en?.substring(0, 200) + '...',
          allergens: product.allergens_tags || [],
          labels: product.labels_tags?.slice(0, 3) || [],
          url: `https://world.openfoodfacts.org/product/${product.code}`
        })) || [],
        total: data.count || 0
      };
    } catch (error) {
      console.error('Open Food Facts search error:', error);
      toast({
        title: "Search Error",
        description: "Unable to search food products at this time",
        variant: "destructive"
      });
      return { products: [], total: 0 };
    } finally {
      setLoading(false);
    }
  };

  // Spoonacular API (recipe search)
  const searchRecipes = async (query: string, diet?: string) => {
    setLoading(true);
    try {
      // Using demo API key - replace with actual key for production
      const dietParam = diet ? `&diet=${diet}` : '';
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=12&addRecipeInformation=true&apiKey=demo${dietParam}`
      );
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      return {
        recipes: data.results?.map((recipe: any) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          healthScore: recipe.healthScore,
          diets: recipe.diets || [],
          dishTypes: recipe.dishTypes || [],
          summary: recipe.summary?.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          sourceUrl: recipe.sourceUrl
        })) || [],
        total: data.totalResults || 0
      };
    } catch (error) {
      console.error('Spoonacular search error:', error);
      // Return sample data for demo
      return {
        recipes: [
          {
            id: 1,
            title: "Sample Healthy Recipe",
            image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400",
            readyInMinutes: 30,
            servings: 4,
            healthScore: 85,
            diets: ["vegetarian"],
            dishTypes: ["main course"],
            summary: "A delicious and healthy recipe perfect for any meal...",
            sourceUrl: "#"
          }
        ],
        total: 1
      };
    } finally {
      setLoading(false);
    }
  };

  // Barcode Lookup API
  const lookupBarcode = async (barcode: string) => {
    setLoading(true);
    try {
      // Using UPC Database API (free tier)
      const response = await fetch(
        `https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`
      );
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        return {
          success: true,
          product: {
            name: item.title,
            brand: item.brand,
            description: item.description,
            category: item.category,
            upc: item.upc,
            images: item.images || [],
            lowest_price: item.lowest_recorded_price,
            highest_price: item.highest_recorded_price
          }
        };
      }
      
      return { success: false, message: "Product not found" };
    } catch (error) {
      console.error('Barcode lookup error:', error);
      toast({
        title: "Lookup Error",
        description: "Unable to lookup barcode at this time",
        variant: "destructive"
      });
      return { success: false, message: "Lookup failed" };
    } finally {
      setLoading(false);
    }
  };

  return {
    searchFoodData,
    searchOpenFood,
    searchRecipes,
    lookupBarcode,
    loading
  };
}