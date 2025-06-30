
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddGroceryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (grocery: {
    name: string;
    category: string;
    price: number;
    description: string;
    image?: string;
  }) => void;
  categories: string[];
}

const AddGroceryForm = ({ isOpen, onClose, onSubmit, categories }: AddGroceryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0] || '',
    price: '',
    description: '',
    image: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      return;
    }

    onSubmit({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image || undefined
    });

    setFormData({
      name: '',
      category: categories[0] || '',
      price: '',
      description: '',
      image: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle>Add New Grocery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-900 font-medium">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter item name"
                className="bg-white border-2 border-gray-500 text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-900 font-medium">Category *</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-white border-2 border-gray-500 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                required
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="price" className="text-gray-900 font-medium">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                className="bg-white border-2 border-gray-500 text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-900 font-medium">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter item description"
                rows={3}
                className="bg-white border-2 border-gray-500 text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <Label htmlFor="image" className="text-gray-900 font-medium">Image URL (optional)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="bg-white border-2 border-gray-500 text-gray-900 placeholder:text-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">
                Add Item
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddGroceryForm;
