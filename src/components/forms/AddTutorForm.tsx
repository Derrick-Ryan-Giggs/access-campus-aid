
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface AddTutorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tutor: {
    name: string;
    subjects: string[];
    email: string;
    phone: string;
    availability: string;
    rating: number;
    bio: string;
    image?: string;
  }) => void;
}

const AddTutorForm = ({ isOpen, onClose, onSubmit }: AddTutorFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    subjects: '',
    email: '',
    phone: '',
    availability: '',
    rating: '5.0',
    bio: '',
    image: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subjects || !formData.email || !formData.bio) {
      return;
    }

    onSubmit({
      name: formData.name,
      subjects: formData.subjects.split(',').map(s => s.trim()).filter(s => s),
      email: formData.email,
      phone: formData.phone,
      availability: formData.availability,
      rating: parseFloat(formData.rating),
      bio: formData.bio,
      image: formData.image || undefined
    });

    setFormData({
      name: '',
      subjects: '',
      email: '',
      phone: '',
      availability: '',
      rating: '5.0',
      bio: '',
      image: ''
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Add New Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter tutor's full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="subjects">Subjects * (comma separated)</Label>
              <Input
                id="subjects"
                value={formData.subjects}
                onChange={(e) => setFormData(prev => ({ ...prev, subjects: e.target.value }))}
                placeholder="e.g., Mathematics, Physics, Chemistry"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="tutor@university.edu"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                placeholder="e.g., Mon-Wed 2-6 PM"
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData(prev => ({ ...prev, rating: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Brief description of expertise and experience"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Photo URL (optional)</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-secondary hover:bg-secondary/90">
                Add Tutor
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

export default AddTutorForm;
