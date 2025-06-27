
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users, FileText, Calendar, Clock, AlertCircle, CheckCircle2, Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AcademicHub = () => {
  const { toast } = useToast();
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    dueDate: '',
    priority: '',
    accommodations: '',
    description: ''
  });
  const [studyGroupPrefs, setStudyGroupPrefs] = useState({
    course: '',
    topic: '',
    learningStyle: '',
    accommodationNeeds: '',
    availability: ''
  });

  const assignments = [
    {
      id: 1,
      title: 'Psychology Research Paper',
      course: 'PSYC 301',
      dueDate: '2024-01-15',
      priority: 'high',
      status: 'in-progress',
      accommodations: ['Extended time', 'Alternative format'],
      description: 'Research paper on cognitive accessibility in learning environments',
      progress: 65
    },
    {
      id: 2,
      title: 'Math Problem Set #8',
      course: 'MATH 201',
      dueDate: '2024-01-12',
      priority: 'medium',
      status: 'not-started',
      accommodations: ['Large print', 'Calculator allowed'],
      description: 'Calculus problems covering derivatives and integrals',
      progress: 0
    },
    {
      id: 3,
      title: 'History Essay',
      course: 'HIST 150',
      dueDate: '2024-01-20',
      priority: 'low',
      status: 'completed',
      accommodations: ['Voice-to-text software'],
      description: 'Essay on civil rights movement accessibility challenges',
      progress: 100
    }
  ];

  const studyGroups = [
    {
      id: 1,
      course: 'PSYC 301',
      topic: 'Cognitive Psychology',
      members: 4,
      maxMembers: 6,
      meetingTime: 'Wednesdays 3:00 PM',
      accommodations: ['Sign language interpreter', 'Quiet environment'],
      compatibility: 92
    },
    {
      id: 2,
      course: 'MATH 201',
      topic: 'Calculus Study Group',
      members: 3,
      maxMembers: 5,
      meetingTime: 'Fridays 2:00 PM',
      accommodations: ['Visual learning aids', 'Extended breaks'],
      compatibility: 87
    },
    {
      id: 3,
      course: 'HIST 150',
      topic: 'Research Methods',
      members: 5,
      maxMembers: 8,
      meetingTime: 'Mondays 4:00 PM',
      accommodations: ['Audio recordings', 'Digital materials'],
      compatibility: 95
    }
  ];

  const sharedNotes = [
    {
      id: 1,
      title: 'Cognitive Psychology - Chapter 5',
      course: 'PSYC 301',
      author: 'Sarah M.',
      format: 'PDF (Screen Reader Compatible)',
      downloads: 23,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Calculus Formulas Cheat Sheet',
      course: 'MATH 201',
      author: 'Alex R.',
      format: 'Large Print PDF',
      downloads: 45,
      rating: 4.9
    },
    {
      id: 3,
      title: 'Civil Rights Timeline',
      course: 'HIST 150',
      author: 'Jamie L.',
      format: 'Interactive Webpage',
      downloads: 31,
      rating: 4.7
    }
  ];

  const examAccommodations = [
    {
      id: 1,
      exam: 'Psychology Midterm',
      course: 'PSYC 301',
      date: '2024-01-18',
      accommodations: ['Extended time (1.5x)', 'Separate room', 'Screen reader'],
      status: 'approved',
      deadline: '2024-01-11'
    },
    {
      id: 2,
      exam: 'Math Final',
      course: 'MATH 201',
      date: '2024-01-25',
      accommodations: ['Large print', 'Calculator', 'Extended time'],
      status: 'pending',
      deadline: '2024-01-18'
    }
  ];

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.course || !newAssignment.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in assignment title, course, and due date",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Assignment Added",
      description: `"${newAssignment.title}" has been added to your tracker with accessibility accommodations`,
    });

    setNewAssignment({
      title: '',
      course: '',
      dueDate: '',
      priority: '',
      accommodations: '',
      description: ''
    });
  };

  const handleJoinStudyGroup = (groupId: number, course: string) => {
    toast({
      title: "Study Group Request Sent",
      description: `Your request to join the ${course} study group has been sent. You'll be notified when approved.`,
    });
  };

  const handleCreateStudyGroup = () => {
    if (!studyGroupPrefs.course || !studyGroupPrefs.topic) {
      toast({
        title: "Missing Information",
        description: "Please provide course and topic information",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Study Group Created",
      description: `Your ${studyGroupPrefs.course} study group has been created with accessibility features`,
    });

    setStudyGroupPrefs({
      course: '',
      topic: '',
      learningStyle: '',
      accommodationNeeds: '',
      availability: ''
    });
  };

  const handleDownloadNotes = (noteTitle: string, format: string) => {
    toast({
      title: "Notes Downloaded",
      description: `"${noteTitle}" downloaded in ${format} format`,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'not-started': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <BookOpen className="h-8 w-8 text-primary" />
          Academic Integration Hub
        </h1>
        <p className="text-lg text-gray-600">
          Centralized academic support with accessibility-first design
        </p>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assignments">Assignment Tracker</TabsTrigger>
          <TabsTrigger value="study-groups">Study Groups</TabsTrigger>
          <TabsTrigger value="notes">Shared Notes</TabsTrigger>
          <TabsTrigger value="accommodations">Exam Accommodations</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Assignment Tracker</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Assignment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Assignment Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter assignment title"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="course">Course *</Label>
                      <Input
                        id="course"
                        placeholder="e.g., PSYC 301"
                        value={newAssignment.course}
                        onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dueDate">Due Date *</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          value={newAssignment.dueDate}
                          onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={newAssignment.priority} onValueChange={(value) => setNewAssignment({...newAssignment, priority: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="accommodations">Required Accommodations</Label>
                      <Textarea
                        id="accommodations"
                        placeholder="e.g., Extended time, Screen reader, Alternative format..."
                        value={newAssignment.accommodations}
                        onChange={(e) => setNewAssignment({...newAssignment, accommodations: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Assignment details..."
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAddAssignment} className="w-full">
                      Add Assignment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{assignment.title}</h3>
                        <p className="text-gray-600 mb-3">{assignment.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{assignment.course}</Badge>
                          <Badge className={`${getPriorityColor(assignment.priority)} text-white`}>
                            {assignment.priority?.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            Due: {assignment.dueDate}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className={`text-sm font-medium ${getStatusColor(assignment.status)}`}>
                              {assignment.progress}% - {assignment.status.replace('-', ' ')}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${assignment.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {assignment.accommodations.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Accommodations:</p>
                            <div className="flex flex-wrap gap-1">
                              {assignment.accommodations.map((acc, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {acc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        Update Progress
                      </Button>
                      <Button variant="outline">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="study-groups">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Groups</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Study Group</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="course">Course *</Label>
                      <Input
                        id="course"
                        placeholder="e.g., PSYC 301"
                        value={studyGroupPrefs.course}
                        onChange={(e) => setStudyGroupPrefs({...studyGroupPrefs, course: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="topic">Study Topic *</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., Cognitive Psychology"
                        value={studyGroupPrefs.topic}
                        onChange={(e) => setStudyGroupPrefs({...studyGroupPrefs, topic: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="learningStyle">Preferred Learning Style</Label>
                      <Select value={studyGroupPrefs.learningStyle} onValueChange={(value) => setStudyGroupPrefs({...studyGroupPrefs, learningStyle: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select learning style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="visual">Visual Learning</SelectItem>
                          <SelectItem value="auditory">Auditory Learning</SelectItem>
                          <SelectItem value="kinesthetic">Hands-on Learning</SelectItem>
                          <SelectItem value="mixed">Mixed Approach</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="accommodationNeeds">Accommodation Needs</Label>
                      <Textarea
                        id="accommodationNeeds"
                        placeholder="e.g., Sign language interpreter, Quiet environment..."
                        value={studyGroupPrefs.accommodationNeeds}
                        onChange={(e) => setStudyGroupPrefs({...studyGroupPrefs, accommodationNeeds: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Textarea
                        id="availability"
                        placeholder="e.g., Weekdays after 3 PM, Weekends morning..."
                        value={studyGroupPrefs.availability}
                        onChange={(e) => setStudyGroupPrefs({...studyGroupPrefs, availability: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleCreateStudyGroup} className="w-full">
                      Create Study Group
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{group.topic}</h3>
                          <Badge variant="outline">{group.course}</Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{group.members}/{group.maxMembers} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{group.meetingTime}</span>
                          </div>
                          <Badge className="bg-green-500 text-white">
                            {group.compatibility}% compatibility
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Available Accommodations:</p>
                          <div className="flex flex-wrap gap-1">
                            {group.accommodations.map((acc, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {acc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleJoinStudyGroup(group.id, group.course)}
                      className="w-full"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Request to Join
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shared Notes Platform</h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Notes
              </Button>
            </div>

            <div className="grid gap-4">
              {sharedNotes.map((note) => (
                <Card key={note.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="outline">{note.course}</Badge>
                          <span className="text-sm text-gray-600">by {note.author}</span>
                          <Badge variant="secondary">{note.format}</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{note.downloads} downloads</span>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500">★ {note.rating}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleDownloadNotes(note.title, note.format)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="accommodations">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Exam Accommodation Tracker</h2>
            
            <div className="grid gap-4">
              {examAccommodations.map((exam) => (
                <Card key={exam.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{exam.exam}</h3>
                        <div className="flex items-center gap-4 mb-3">
                          <Badge variant="outline">{exam.course}</Badge>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Exam: {exam.date}</span>
                          </div>
                          <Badge 
                            className={exam.status === 'approved' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}
                          >
                            {exam.status}
                          </Badge>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Approved Accommodations:</p>
                          <div className="flex flex-wrap gap-1">
                            {exam.accommodations.map((acc, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {acc}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <AlertCircle className="h-4 w-4" />
                          Request deadline: {exam.deadline}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcademicHub;
