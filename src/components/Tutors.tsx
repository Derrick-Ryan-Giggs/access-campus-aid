import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, User, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AddTutorForm from './forms/AddTutorForm';

interface Tutor {
  id: number;
  name: string;
  subjects: string[];
  email: string;
  phone: string;
  availability: string;
  rating: number;
  bio: string;
  image?: string;
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
    bio: "PhD in Mathematics with 5 years of tutoring experience.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    subjects: ["Computer Science", "Programming"],
    email: "m.chen@university.edu",
    phone: "(555) 234-5678",
    availability: "Tue-Thu 3-7 PM",
    rating: 4.9,
    bio: "Software engineer and CS graduate student specializing in web development.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    subjects: ["Biology", "Chemistry"],
    email: "emily.rodriguez@university.edu",
    phone: "(555) 345-6789",
    availability: "Mon-Fri 1-5 PM",
    rating: 4.7,
    bio: "Biology professor with expertise in biochemistry and molecular biology.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "James Wilson",
    subjects: ["English", "Writing", "Literature"],
    email: "j.wilson@university.edu",
    phone: "(555) 456-7890",
    availability: "Wed-Fri 4-8 PM",
    rating: 4.6,
    bio: "English graduate student specializing in academic writing and essay composition.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    subjects: ["Physics", "Calculus"],
    email: "l.park@university.edu",
    phone: "(555) 567-8901",
    availability: "Mon-Thu 10-2 PM",
    rating: 4.9,
    bio: "Physics professor with 15 years experience in quantum mechanics and advanced mathematics.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "David Kumar",
    subjects: ["Economics", "Finance"],
    email: "d.kumar@university.edu",
    phone: "(555) 678-9012",
    availability: "Tue-Fri 9-1 PM",
    rating: 4.5,
    bio: "MBA graduate specializing in microeconomics, financial analysis, and business strategy.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Maria Gonzalez",
    subjects: ["Spanish", "French", "Linguistics"],
    email: "m.gonzalez@university.edu",
    phone: "(555) 789-0123",
    availability: "Mon-Wed 3-7 PM",
    rating: 4.8,
    bio: "Native Spanish speaker with expertise in Romance languages and applied linguistics.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Dr. Robert Chang",
    subjects: ["History", "Political Science"],
    email: "r.chang@university.edu",
    phone: "(555) 890-1234",
    availability: "Thu-Sat 11-4 PM",
    rating: 4.7,
    bio: "History professor specializing in American history, world politics, and research methods.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
  }
];

const Tutors = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [tutors, setTutors] = useState(mockTutors);
  const [showAddForm, setShowAddForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    subject: '',
    message: '',
    preferredTime: ''
  });

  const allSubjects = Array.from(
    new Set(tutors.flatMap(tutor => tutor.subjects))
  ).sort();

  const filteredTutors = tutors.filter(tutor => {
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
      toast({
        title: "Help Request Sent",
        description: `Your tutoring request has been sent to ${selectedTutor.name}. They will contact you soon!`,
      });
      
      setShowRequestForm(false);
      setSelectedTutor(null);
      setRequestForm({ subject: '', message: '', preferredTime: '' });
    } else {
      toast({
        title: "Incomplete Request",
        description: "Please fill in all required fields before sending your request.",
        variant: "destructive",
      });
    }
  };

  const handleAddTutor = (newTutor: Omit<Tutor, 'id'>) => {
    const tutor: Tutor = {
      ...newTutor,
      id: Math.max(...tutors.map(t => t.id)) + 1
    };
    setTutors(prev => [...prev, tutor]);
    setShowAddForm(false);
    toast({
      title: "Tutor Added",
      description: `${newTutor.name} has been added to the tutor list.`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">Find a Tutor</h2>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Tutor
          </Button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 p-3 border-2 border-gray-500 rounded-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white">
              <Search className="text-gray-500 h-5 w-5 flex-shrink-0" />
              <Input
                type="text"
                placeholder="Search tutors or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                aria-label="Search tutors"
              />
            </div>
          </div>
          
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-3 h-12 bg-white border-2 border-gray-500 text-gray-900 rounded-md text-sm sm:text-base focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 w-full sm:w-auto"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {filteredTutors.map(tutor => (
          <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0">
                  {tutor.image ? (
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-primary/10 p-3 sm:p-4 rounded-full">
                      <User className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-base sm:text-lg">{tutor.name}</CardTitle>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      {tutor.rating} rating
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-xs sm:text-sm text-gray-700 mb-1">Subjects:</h4>
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
                  <h4 className="font-medium text-xs sm:text-sm text-gray-700 mb-1">Availability:</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{tutor.availability}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-xs sm:text-sm text-gray-700 mb-1">About:</h4>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{tutor.bio}</p>
                </div>
                
                <div className="pt-2">
                  <Button
                    onClick={() => handleRequestHelp(tutor)}
                    className="w-full bg-primary hover:bg-primary/90 text-sm"
                    size="sm"
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
          <p className="text-gray-500 text-base sm:text-lg">No tutors found matching your search.</p>
        </div>
      )}

      {/* Request Form Modal */}
      {showRequestForm && selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
          <Card className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-lg">Request Tutoring Help</CardTitle>
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

      {/* Add Tutor Form Modal */}
      {showAddForm && (
        <AddTutorForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddTutor}
        />
      )}
    </div>
  );
};

export default Tutors;
