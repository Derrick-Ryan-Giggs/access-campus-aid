
export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
}

export const mockGroceries: GroceryItem[] = [
  { id: 1, name: "Fresh Apples", category: "Fruits", price: 3.99, description: "Crisp red apples, 2lb bag", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=300&fit=crop" },
  { id: 2, name: "Whole Milk", category: "Dairy", price: 4.29, description: "1 gallon whole milk", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop" },
  { id: 3, name: "Bread Loaf", category: "Bakery", price: 2.99, description: "Whole wheat bread", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop" },
  { id: 4, name: "Bananas", category: "Fruits", price: 1.99, description: "Fresh bananas, 2lb", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop" },
  { id: 5, name: "Chicken Breast", category: "Meat", price: 8.99, description: "Boneless chicken breast, 1lb", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop" },
  { id: 6, name: "Broccoli", category: "Vegetables", price: 2.49, description: "Fresh broccoli crowns", image: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400&h=300&fit=crop" },
  { id: 7, name: "Greek Yogurt", category: "Dairy", price: 5.99, description: "Plain Greek yogurt, 32oz", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&h=300&fit=crop" },
  { id: 8, name: "Salmon Fillet", category: "Fish", price: 12.99, description: "Atlantic salmon, 1lb", image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop" },
  { id: 9, name: "Avocados", category: "Fruits", price: 4.49, description: "Ripe avocados, pack of 4", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop" },
  { id: 10, name: "Spinach", category: "Vegetables", price: 3.29, description: "Fresh baby spinach, 5oz", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop" },
  { id: 11, name: "Brown Rice", category: "Grains", price: 3.99, description: "Long grain brown rice, 2lb", image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop" },
  { id: 12, name: "Blueberries", category: "Fruits", price: 4.99, description: "Fresh blueberries, 1 pint", image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=300&fit=crop" },
  { id: 13, name: "Cheddar Cheese", category: "Dairy", price: 6.49, description: "Sharp cheddar cheese, 8oz", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&h=300&fit=crop" },
  { id: 14, name: "Sweet Potatoes", category: "Vegetables", price: 2.79, description: "Organic sweet potatoes, 2lb", image: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=300&fit=crop" },
  { id: 15, name: "Quinoa", category: "Grains", price: 7.99, description: "Organic quinoa, 1lb", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop" },
  { id: 16, name: "Organic Eggs", category: "Dairy", price: 5.49, description: "Free-range organic eggs, dozen", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=400&h=300&fit=crop" },
];

export const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Meat', 'Fish', 'Bakery', 'Grains'];
