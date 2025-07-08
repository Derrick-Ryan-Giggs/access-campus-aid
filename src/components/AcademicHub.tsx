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
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Users, Upload, Plus, CheckCircle2, AlertCircle, Clock, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AssignmentCard from './academic/AssignmentCard';
import SharedNotesCard from './academic/SharedNotesCard';
import EditAssignmentDialog from './academic/EditAssignmentDialog';
import StudyAssistant from './academic/StudyAssistant';

const AcademicHub = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Psychology Research Paper',
      course: 'PSYC 301',
      dueDate: '2024-01-15',
      progress: 65,
      status: 'in-progress',
      priority: 'high',
      accommodations: ['Extended time', 'Alternative format']
    },
    {
      id: 2,
      title: 'Statistics Problem Set',
      course: 'STAT 201',
      dueDate: '2024-01-12',
      progress: 30,
      status: 'started',
      priority: 'medium',
      accommodations: ['Calculator allowed', 'Extra time']
    },
    {
      id: 3,
      title: 'History Essay',
      course: 'HIST 101',
      dueDate: '2024-01-20',
      progress: 0,
      status: 'not-started',
      priority: 'low',
      accommodations: ['Voice-to-text software']
    }
  ]);

  const [studyGroups, setStudyGroups] = useState([
    {
      id: 1,
      name: 'Psychology Study Circle',
      course: 'PSYC 301',
      members: 6,
      maxMembers: 8,
      nextMeeting: '2024-01-11 14:00',
      accessibility: ['Screen reader friendly', 'Closed captions', 'Wheelchair accessible']
    },
    {
      id: 2,
      name: 'Statistics Help Group',
      course: 'STAT 201',
      members: 4,
      maxMembers: 6,
      nextMeeting: '2024-01-13 16:00',
      accessibility: ['Large print materials', 'Audio explanations', 'Extended time']
    }
  ]);

  const [sharedNotes, setSharedNotes] = useState([
    {
      id: 1,
      title: 'Cognitive Psychology - Week 3',
      course: 'PSYC 301',
      author: 'Sarah M.',
      downloads: 45,
      rating: 4.8,
      format: ['PDF', 'Audio', 'Large Print']
    },
    {
      id: 2,
      title: 'Statistics Formulas Cheat Sheet',
      course: 'STAT 201',
      author: 'Mike L.',
      downloads: 78,
      rating: 4.9,
      format: ['PDF', 'Word', 'Braille']
    }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    dueDate: '',
    priority: '',
    accommodations: ''
  });

  const [newNote, setNewNote] = useState({
    title: '',
    course: '',
    description: '',
    file: null as File | null
  });

  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleUpdateProgress = (assignmentId: number, newProgress: number) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, progress: newProgress, status: newProgress === 100 ? 'completed' : newProgress > 0 ? 'in-progress' : 'not-started' }
        : assignment
    ));
  };

  const handleEditAssignment = (assignment: any) => {
    setEditingAssignment(assignment);
    setIsEditDialogOpen(true);
  };

  const handleSaveAssignment = (updatedAssignment: any) => {
    setAssignments(assignments.map(assignment => 
      assignment.id === updatedAssignment.id ? updatedAssignment : assignment
    ));
    setEditingAssignment(null);
  };

  const handleAddAssignment = () => {
    if (!newAssignment.title || !newAssignment.course || !newAssignment.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in title, course, and due date",
        variant: "destructive"
      });
      return;
    }

    const assignment = {
      id: Date.now(),
      title: newAssignment.title,
      course: newAssignment.course,
      dueDate: newAssignment.dueDate,
      progress: 0,
      status: 'not-started',
      priority: newAssignment.priority || 'medium',
      accommodations: newAssignment.accommodations ? newAssignment.accommodations.split(',').map(acc => acc.trim()) : []
    };

    setAssignments([...assignments, assignment]);
    toast({
      title: "Assignment Added",
      description: `"${newAssignment.title}" has been added to your tracker`,
    });

    setNewAssignment({
      title: '',
      course: '',
      dueDate: '',
      priority: '',
      accommodations: ''
    });
  };

  const handleJoinStudyGroup = (groupId: number, groupName: string) => {
    setStudyGroups(studyGroups.map(group => 
      group.id === groupId 
        ? { ...group, members: group.members + 1 }
        : group
    ));
    
    toast({
      title: "Joined Study Group",
      description: `You've successfully joined "${groupName}"`,
    });
  };

  const handleUploadNotes = () => {
    if (!newNote.title || !newNote.course) {
      toast({
        title: "Missing Information",
        description: "Please provide note title and course",
        variant: "destructive"
      });
      return;
    }

    const note = {
      id: Date.now(),
      title: newNote.title,
      course: newNote.course,
      author: 'You',
      downloads: 0,
      rating: 0,
      format: ['PDF']
    };

    setSharedNotes([...sharedNotes, note]);
    toast({
      title: "Notes Uploaded",
      description: `"${newNote.title}" has been shared with the community`,
    });

    setNewNote({
      title: '',
      course: '',
      description: '',
      file: null
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewNote({...newNote, file});
      toast({
        title: "File Selected",
        description: `${file.name} is ready to upload`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'started': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
          <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          Academic Integration Hub
        </h1>
        <p className="text-base sm:text-lg text-gray-600 px-4">
          Streamlined academic support with accessibility accommodations
        </p>
      </div>

      <Tabs defaultValue="assignments" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
          <TabsTrigger value="assignments" className="text-xs sm:text-sm p-2 sm:p-3">Assignment Tracker</TabsTrigger>
          <TabsTrigger value="study-groups" className="text-xs sm:text-sm p-2 sm:p-3">Study Groups</TabsTrigger>
          <TabsTrigger value="notes" className="text-xs sm:text-sm p-2 sm:p-3">Shared Notes</TabsTrigger>
          <TabsTrigger value="assistant" className="text-xs sm:text-sm p-2 sm:p-3">AI Assistant</TabsTrigger>
          <TabsTrigger value="accommodations" className="text-xs sm:text-sm p-2 sm:p-3">Exam Accommodations</TabsTrigger>
        </TabsList>

        <TabsContent value="assignments">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Assignment Tracker</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-lg mx-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Assignment</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-[70vh] overflow-y-auto">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <Label htmlFor="accommodations">Accommodations Needed</Label>
                      <Textarea
                        id="accommodations"
                        placeholder="e.g., Extended time, Alternative format..."
                        value={newAssignment.accommodations}
                        onChange={(e) => setNewAssignment({...newAssignment, accommodations: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAddAssignment} className="w-full">
                      Add Assignment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  onUpdateProgress={handleUpdateProgress}
                  onEdit={handleEditAssignment}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="study-groups">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Study Groups</h2>
            <div className="grid gap-3 sm:gap-4">
              {studyGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold mb-2">{group.name}</h3>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {group.course}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            {group.members}/{group.maxMembers} members
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Next: {new Date(group.nextMeeting).toLocaleDateString()} at {new Date(group.nextMeeting).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Accessibility Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {group.accessibility.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full sm:w-auto" 
                      onClick={() => handleJoinStudyGroup(group.id, group.name)}
                      disabled={group.members >= group.maxMembers}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {group.members >= group.maxMembers ? 'Group Full' : 'Join Group'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">Shared Notes</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Notes
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-lg mx-auto">
                  <DialogHeader>
                    <DialogTitle>Upload Study Notes</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="noteTitle">Title *</Label>
                      <Input
                        id="noteTitle"
                        placeholder="Enter note title"
                        value={newNote.title}
                        onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="noteCourse">Course *</Label>
                      <Input
                        id="noteCourse"
                        placeholder="e.g., PSYC 301"
                        value={newNote.course}
                        onChange={(e) => setNewNote({...newNote, course: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="noteDescription">Description</Label>
                      <Textarea
                        id="noteDescription"
                        placeholder="Brief description of the notes..."
                        value={newNote.description}
                        onChange={(e) => setNewNote({...newNote, description: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="noteFile">Upload File</Label>
                      <Input
                        id="noteFile"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                    </div>
                    <Button onClick={handleUploadNotes} className="w-full">
                      Upload Notes
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {sharedNotes.map((note) => (
                <SharedNotesCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assistant">
          <StudyAssistant />
        </TabsContent>

        <TabsContent value="accommodations">
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold">Exam Accommodations</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Available Accommodations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'Extended time (1.5x)',
                      'Extended time (2x)',
                      'Separate testing room',
                      'Screen reader compatible',
                      'Large print format',
                      'Alternative format',
                      'Scribe assistance',
                      'Voice-to-text software'
                    ].map((accommodation, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{accommodation}</span>
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Approved
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg">Upcoming Exams</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { course: 'PSYC 301', exam: 'Midterm', date: '2024-01-18', accommodations: ['Extended time', 'Separate room'] },
                      { course: 'STAT 201', exam: 'Final', date: '2024-01-25', accommodations: ['Calculator', 'Extended time'] },
                      { course: 'HIST 101', exam: 'Final', date: '2024-01-22', accommodations: ['Voice-to-text', 'Extended time'] }
                    ].map((exam, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{exam.course} - {exam.exam}</h4>
                          <Badge variant="outline" className="text-xs w-fit">
                            <Calendar className="h-3 w-3 mr-1" />
                            {exam.date}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {exam.accommodations.map((acc, accIndex) => (
                            <Badge key={accIndex} variant="secondary" className="text-xs">
                              {acc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <EditAssignmentDialog
        assignment={editingAssignment}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingAssignment(null);
        }}
        onSave={handleSaveAssignment}
      />
    </div>
  );
};

export default AcademicHub;
