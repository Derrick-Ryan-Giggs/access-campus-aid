
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Mic, MicOff, Calendar, Clock, User, AlertTriangle, CheckCircle2, Plus, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SmartAssistant = () => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: '',
    deadline: '',
    energyLevel: '',
    accommodations: ''
  });

  const prioritizedTasks = [
    {
      id: 1,
      title: 'Submit Psychology Assignment',
      description: 'Research paper on cognitive accessibility',
      priority: 'high',
      deadline: '2024-01-15',
      energyRequired: 'high',
      aiReason: 'Deadline approaching + high energy available this morning',
      accommodations: ['Extended time', 'Screen reader compatible']
    },
    {
      id: 2,
      title: 'Schedule Physical Therapy',
      description: 'Weekly session with Dr. Smith',
      priority: 'medium',
      deadline: '2024-01-12',
      energyRequired: 'low',
      aiReason: 'Optimal scheduling around medication times',
      accommodations: ['Transportation needed', 'Flexible timing']
    },
    {
      id: 3,
      title: 'Join Book Club Event',
      description: 'Virtual discussion tonight',
      priority: 'low',
      deadline: '2024-01-10',
      energyRequired: 'medium',
      aiReason: 'Social activity recommended for wellness balance',
      accommodations: ['Audio format available', 'Closed captions']
    }
  ];

  const recommendations = [
    {
      type: 'Tutoring',
      title: 'Math Tutor Available',
      description: 'Sarah specializes in accessible learning methods',
      reason: 'Based on your recent math struggles and learning preferences',
      action: 'Book Session'
    },
    {
      type: 'Event',
      title: 'Adaptive Gaming Night',
      description: 'Tomorrow 7 PM - Accessible gaming session',
      reason: 'Matches your interests and social wellness needs',
      action: 'Join Event'
    },
    {
      type: 'Service',
      title: 'Grocery Delivery',
      description: 'Schedule weekly essentials delivery',
      reason: 'Energy conservation for academic focus',
      action: 'Set Up'
    }
  ];

  const scheduleInsights = [
    {
      time: '9:00 AM',
      activity: 'Peak Energy - Study Time',
      reason: 'Historical data shows highest productivity',
      type: 'optimal'
    },
    {
      time: '2:00 PM',
      activity: 'Medication Reminder',
      reason: 'Daily routine maintenance',
      type: 'reminder'
    },
    {
      time: '6:00 PM',
      activity: 'Low Energy - Social Activities',
      reason: 'Best time for virtual hangouts',
      type: 'suggestion'
    }
  ];

  const handleVoiceCommand = () => {
    if (!isListening) {
      setIsListening(true);
      toast({
        title: "Voice Assistant Activated",
        description: "Listening for your command... Say 'schedule meeting', 'add task', or 'find tutor'",
      });
      
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        setVoiceText("Schedule a study session for tomorrow at 2 PM");
        toast({
          title: "Command Recognized",
          description: "Processing: 'Schedule a study session for tomorrow at 2 PM'",
        });
      }, 3000);
    } else {
      setIsListening(false);
      toast({
        title: "Voice Assistant Stopped",
        description: "Voice recognition disabled",
      });
    }
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.priority) {
      toast({
        title: "Missing Information",
        description: "Please fill in task title and priority level",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Task Added Successfully!",
      description: `"${newTask.title}" has been added to your AI-prioritized task list`,
    });

    setNewTask({
      title: '',
      description: '',
      priority: '',
      deadline: '',
      energyLevel: '',
      accommodations: ''
    });
  };

  const handleTaskComplete = (taskId: number, taskTitle: string) => {
    toast({
      title: "Task Completed!",
      description: `"${taskTitle}" marked as complete. AI updating your productivity insights.`,
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Brain className="h-8 w-8 text-primary" />
          Smart Personal Assistant
        </h1>
        <p className="text-lg text-gray-600">
          AI-powered task management designed for your accessibility needs
        </p>
      </div>

      {/* Voice Command Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button
              onClick={handleVoiceCommand}
              variant={isListening ? "destructive" : "default"}
              size="lg"
              className="flex items-center gap-2"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              {isListening ? 'Stop Listening' : 'Start Voice Command'}
            </Button>
            {voiceText && (
              <div className="bg-gray-100 p-3 rounded-md flex-1">
                <p className="text-sm"><strong>Recognized:</strong> "{voiceText}"</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Try saying: "Add task", "Schedule meeting", "Find tutor", "Check schedule", "Show recommendations"</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">AI Tasks</TabsTrigger>
          <TabsTrigger value="schedule">Smart Schedule</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">AI-Prioritized Tasks</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Task Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter task title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Task details..."
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="priority">Priority *</Label>
                        <Select value={newTask.priority} onValueChange={(value) => setNewTask({...newTask, priority: value})}>
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
                      <div>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input
                          id="deadline"
                          type="date"
                          value={newTask.deadline}
                          onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="energyLevel">Energy Level Required</Label>
                      <Select value={newTask.energyLevel} onValueChange={(value) => setNewTask({...newTask, energyLevel: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select energy level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Energy</SelectItem>
                          <SelectItem value="medium">Medium Energy</SelectItem>
                          <SelectItem value="low">Low Energy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="accommodations">Accessibility Accommodations</Label>
                      <Textarea
                        id="accommodations"
                        placeholder="e.g., Extended time, Screen reader, Quiet space..."
                        value={newTask.accommodations}
                        onChange={(e) => setNewTask({...newTask, accommodations: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleAddTask} className="w-full">
                      Add Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {prioritizedTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
                        <p className="text-gray-600 mb-3">{task.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                            {task.priority.toUpperCase()} PRIORITY
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {task.deadline}
                          </Badge>
                          <Badge variant="outline">
                            <Zap className="h-3 w-3 mr-1" />
                            {task.energyRequired} energy
                          </Badge>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-md mb-3">
                          <p className="text-sm text-blue-800">
                            <strong>AI Insight:</strong> {task.aiReason}
                          </p>
                        </div>

                        {task.accommodations.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Accommodations:</p>
                            <div className="flex flex-wrap gap-1">
                              {task.accommodations.map((acc, index) => (
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
                      <Button 
                        onClick={() => handleTaskComplete(task.id, task.title)}
                        className="flex-1"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark Complete
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

        <TabsContent value="schedule">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Smart Schedule Insights</h2>
            <div className="grid gap-4">
              {scheduleInsights.map((insight, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-bold text-primary">{insight.time}</div>
                        <div>
                          <h3 className="font-semibold">{insight.activity}</h3>
                          <p className="text-sm text-gray-600">{insight.reason}</p>
                        </div>
                      </div>
                      <Badge variant={insight.type === 'optimal' ? 'default' : 'outline'}>
                        {insight.type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{rec.type}</Badge>
                          <h3 className="text-lg font-semibold">{rec.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-3">{rec.description}</p>
                        <div className="bg-green-50 p-3 rounded-md">
                          <p className="text-sm text-green-800">
                            <strong>AI Recommendation:</strong> {rec.reason}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">{rec.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personal Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Productivity Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                  <p className="text-sm text-gray-600">+12% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Energy Optimization</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">92%</div>
                  <p className="text-sm text-gray-600">Tasks aligned with energy levels</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Accommodation Usage</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
                  <p className="text-sm text-gray-600">Effective accommodation utilization</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartAssistant;
