export const groceryItems = [
  // Fresh Fruits
  {
    id: 1,
    name: "Organic Bananas",
    category: "fruits",
    price: 2.99,
    unit: "bunch",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
    description: "Fresh organic bananas, perfect for snacking",
    inStock: true,
    nutrition: { calories: 105, fiber: "3g", potassium: "422mg" }
  },
  {
    id: 4,
    name: "Avocados",
    category: "fruits",
    price: 1.25,
    unit: "each",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop",
    description: "Ripe Hass avocados",
    inStock: true,
    nutrition: { calories: 234, fiber: "10g", potassium: "690mg" }
  },

  // Fresh Vegetables
  {
    id: 2,
    name: "Sweet Potatoes",
    category: "vegetables",
    price: 1.89,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=300&fit=crop",
    description: "Fresh sweet potatoes, rich in vitamins",
    inStock: true,
    nutrition: { calories: 112, fiber: "3.9g", vitaminA: "184% DV" }
  },
  {
    id: 3,
    name: "Organic Spinach",
    category: "vegetables",
    price: 3.49,
    unit: "bag",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=300&fit=crop",
    description: "Fresh organic baby spinach leaves",
    inStock: true,
    nutrition: { calories: 7, iron: "5% DV", vitaminK: "181% DV" }
  },
  {
    id: 5,
    name: "Organic Carrots",
    category: "vegetables",
    price: 2.29,
    unit: "bag",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=300&h=300&fit=crop",
    description: "Fresh organic carrots",
    inStock: true,
    nutrition: { calories: 25, fiber: "2g", vitaminA: "184% DV" }
  },

  // Grains & Legumes
  {
    id: 6,
    name: "Brown Rice",
    category: "grains",
    price: 4.99,
    unit: "2lb bag",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=300&h=300&fit=crop",
    description: "Whole grain brown rice",
    inStock: true,
    nutrition: { calories: 216, fiber: "3.5g", manganese: "88% DV" }
  },
  {
    id: 7,
    name: "Quinoa",
    category: "grains",
    price: 6.49,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&h=300&fit=crop",
    description: "Organic quinoa, complete protein",
    inStock: true,
    nutrition: { calories: 222, protein: "8g", fiber: "5g" }
  },
  {
    id: 8,
    name: "Black Beans",
    category: "grains",
    price: 1.89,
    unit: "can",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=300&h=300&fit=crop",
    description: "Organic black beans, no salt added",
    inStock: true,
    nutrition: { calories: 227, protein: "15g", fiber: "15g" }
  },

  // Dairy & Alternatives
  {
    id: 9,
    name: "Almond Milk",
    category: "dairy",
    price: 3.99,
    unit: "half gallon",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop",
    description: "Unsweetened almond milk",
    inStock: true,
    nutrition: { calories: 30, calcium: "45% DV", vitaminE: "50% DV" }
  },
  {
    id: 10,
    name: "Greek Yogurt",
    category: "dairy",
    price: 5.99,
    unit: "32oz container",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop",
    description: "Plain Greek yogurt, high protein",
    inStock: true,
    nutrition: { calories: 100, protein: "18g", calcium: "20% DV" }
  },

  // Protein Sources
  {
    id: 11,
    name: "Organic Tofu",
    category: "protein",
    price: 3.49,
    unit: "14oz package",
    image: "https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300&h=300&fit=crop",
    description: "Extra firm organic tofu",
    inStock: true,
    nutrition: { calories: 94, protein: "10g", calcium: "35% DV" }
  },
  {
    id: 12,
    name: "Wild Salmon",
    category: "protein",
    price: 12.99,
    unit: "lb",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=300&fit=crop",
    description: "Fresh wild-caught salmon fillets",
    inStock: true,
    nutrition: { calories: 208, protein: "25g", omega3: "1.8g" }
  },

  // Healthy Snacks
  {
    id: 13,
    name: "Green Tea",
    category: "beverages",
    price: 4.99,
    unit: "box of 20",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    description: "Organic green tea bags",
    inStock: true,
    nutrition: { antioxidants: "High", caffeine: "25mg", calories: 0 }
  },
  {
    id: 14,
    name: "Mixed Nuts",
    category: "snacks",
    price: 8.99,
    unit: "1lb bag",
    image: "https://images.unsplash.com/photo-1529258283598-8d6fe60b27f4?w=300&h=300&fit=crop",
    description: "Unsalted mixed nuts",
    inStock: true,
    nutrition: { calories: 607, protein: "20g", healthyFats: "54g" }
  },
  {
    id: 15,
    name: "Dark Chocolate",
    category: "snacks",
    price: 3.99,
    unit: "bar",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=300&h=300&fit=crop",
    description: "70% dark chocolate bar",
    inStock: true,
    nutrition: { calories: 170, antioxidants: "High", iron: "12% DV" }
  }
];

export const categories = [
  { id: "all", name: "All Items", count: groceryItems.length },
  { id: "fruits", name: "Fresh Fruits", count: groceryItems.filter(item => item.category === "fruits").length },
  { id: "vegetables", name: "Fresh Vegetables", count: groceryItems.filter(item => item.category === "vegetables").length },
  { id: "grains", name: "Grains & Legumes", count: groceryItems.filter(item => item.category === "grains").length },
  { id: "dairy", name: "Dairy & Alternatives", count: groceryItems.filter(item => item.category === "dairy").length },
  { id: "protein", name: "Protein Sources", count: groceryItems.filter(item => item.category === "protein").length },
  { id: "snacks", name: "Healthy Snacks", count: groceryItems.filter(item => item.category === "snacks" || item.category === "beverages").length }
];
