
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, User } from 'lucide-react';

interface Tutor {
  id: number;
  name: string;
  subjects: string[];
  email: string;
  phone: string;
  availability: string;
  rating: number;
  bio: string;
}

const mockTutors: Tutor[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    subjects: ["Mathematics", "Statistics"],
    email: "sarah.johnson@university.edu",
    phone: "(555) 123-4567",
    availability: "Mon-Wed 2-6 PM",
    rating: 4.8,
    bio: "PhD in Mathematics with 5 years of tutoring experience."
  },
  {
    id: 2,
    name: "Michael Chen",
    subjects: ["Computer Science", "Programming"],
    email: "m.chen@university.edu",
    phone: "(555) 234-5678",
    availability: "Tue-Thu 3-7 PM",
    rating: 4.9,
    bio: "Software engineer and CS graduate student specializing in web development."
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    subjects: ["Biology", "Chemistry"],
    email: "emily.rodriguez@university.edu",
    phone: "(555) 345-6789",
    availability: "Mon-Fri 1-5 PM",
    rating: 4.7,
    bio: "Biology professor with expertise in biochemistry and molecular biology."
  },
  {
    id: 4,
    name: "James Wilson",
    subjects: ["English", "Writing", "Literature"],
    email: "j.wilson@university.edu",
    phone: "(555) 456-7890",
    availability: "Wed-Fri 4-8 PM",
    rating: 4.6,
    bio: "English graduate student specializing in academic writing and essay composition."
  }
];

const Tutors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [requestForm, setRequestForm] = useState({
    subject: '',
    message: '',
    preferredTime: ''
  });

  const allSubjects = Array.from(
    new Set(mockTutors.flatMap(tutor => tutor.subjects))
  ).sort();

  const filteredTutors = mockTutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subjects.some(subject => 
                           subject.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesSubject = selectedSubject === 'All' || 
                          tutor.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const handleRequestHelp = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowRequestForm(true);
  };

  const submitRequest = () => {
    if (requestForm.subject && requestForm.message && selectedTutor) {
      // In a real app, this would send the request to the backend
      alert(`Tutoring request sent to ${selectedTutor.name}!`);
      setShowRequestForm(false);
      setSelectedTutor(null);
      setRequestForm({ subject: '', message: '', preferredTime: '' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Find a Tutor</h2>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tutors or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base"
              aria-label="Search tutors"
            />
          </div>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-base focus:ring-2 focus:ring-primary focus:border-primary"
            aria-label="Filter by subject"
          >
            <option value="All">All Subjects</option>
            {allSubjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {filteredTutors.map(tutor => (
          <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tutor.name}</CardTitle>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {tutor.rating} rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Subjects:</h4>
                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map(subject => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Availability:</h4>
                  <p className="text-sm text-gray-600">{tutor.availability}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-1">About:</h4>
                  <p className="text-sm text-gray-600">{tutor.bio}</p>
                </div>
                
                <div className="pt-2">
                  <Button
                    onClick={() => handleRequestHelp(tutor)}
                    className="w-full bg-primary hover:bg-primary/90"
                    aria-label={`Request tutoring help from ${tutor.name}`}
                  >
                    Request Help
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tutors found matching your search.</p>
        </div>
      )}

      {/* Request Form Modal */}
      {showRequestForm && selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <Card className="bg-white w-full max-w-md">
            <CardHeader>
              <CardTitle>Request Tutoring Help</CardTitle>
              <p className="text-sm text-gray-600">
                Sending request to {selectedTutor.name}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  value={requestForm.subject}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  aria-label="Select subject"
                >
                  <option value="">Select a subject</option>
                  {selectedTutor.subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time</label>
                <Input
                  value={requestForm.preferredTime}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, preferredTime: e.target.value }))}
                  placeholder="e.g., Monday 3-4 PM"
                  aria-label="Preferred tutoring time"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={requestForm.message}
                  onChange={(e) => setRequestForm(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Describe what you need help with..."
                  aria-label="Tutoring request message"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={submitRequest}
                  className="flex-1 bg-secondary hover:bg-secondary/90"
                >
                  Send Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowRequestForm(false);
                    setSelectedTutor(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Tutors;
