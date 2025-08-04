import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Calendar, Clock, Heart, BookOpen, FileText, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useActivities } from '@/hooks/useActivities';

interface Reminder {
  id: number;
  type: 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting';
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
}

const Reminders = () => {
  const { toast } = useToast();
  const { createActivity } = useActivities();
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      type: 'medication',
      title: 'Take Morning Medication',
      description: 'Vitamin D - 2 tablets',
      date: '2024-06-25',
      time: '08:00',
      completed: false
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Doctor Appointment',
      description: 'Annual check-up with Dr. Smith',
      date: '2024-06-26',
      time: '14:30',
      completed: false
    },
    {
      id: 3,
      type: 'academic',
      title: 'Group Discussion - Psychology',
      description: 'Discuss Chapter 7: Cognitive Behavioral Therapy',
      date: '2024-06-27',
      time: '10:00',
      completed: false
    },
    {
      id: 4,
      type: 'meeting',
      title: 'Meeting with Prof. Johnson',
      description: 'Discuss thesis proposal and next steps',
      date: '2024-06-28',
      time: '15:00',
      completed: false
    },
    {
      id: 5,
      type: 'exam',
      title: 'Mathematics CAT Exam',
      description: 'Calculus II - Room 204',
      date: '2024-06-30',
      time: '09:00',
      completed: false
    },
    {
      id: 6,
      type: 'exam',
      title: 'Final Exam - Biology',
      description: 'Comprehensive final exam covering all chapters',
      date: '2024-07-05',
      time: '13:00',
      completed: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'medication' as 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting',
    title: '',
    description: '',
    date: '',
    time: ''
  });

  const addReminder = async () => {
    if (newReminder.title && newReminder.date && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now(),
        ...newReminder,
        completed: false
      };
      setReminders(prev => [...prev, reminder]);
      
      // Create activity record
      await createActivity({
        type: 'reminder',
        title: `Reminder: ${newReminder.title}`,
        description: `${newReminder.type} reminder set for ${newReminder.date} at ${newReminder.time}`,
        status: 'active',
        metadata: {
          reminder_type: newReminder.type,
          scheduled_date: newReminder.date,
          scheduled_time: newReminder.time
        }
      });

      setNewReminder({
        type: 'medication',
        title: '',
        description: '',
        date: '',
        time: ''
      });
      setShowAddForm(false);

      toast({
        title: "Reminder Created",
        description: `${reminder.title} has been added to your reminders.`,
      });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const toggleCompleted = async (id: number) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );

    if (reminder) {
      // Create activity record for status change
      const activityStatus = !reminder.completed ? 'completed' : 'active';
      await createActivity({
        type: 'reminder',
        title: `Reminder ${!reminder.completed ? 'completed' : 'reactivated'}: ${reminder.title}`,
        description: `${reminder.type} reminder status changed`,
        status: activityStatus,
        metadata: {
          reminder_id: reminder.id,
          reminder_type: reminder.type
        }
      });

      toast({
        title: reminder.completed ? "Reminder Reactivated" : "Reminder Completed",
        description: reminder.completed ? 
          `${reminder.title} has been marked as pending.` : 
          `${reminder.title} has been completed!`,
      });
    }
  };

  const deleteReminder = (id: number) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(prev => prev.filter(reminder => reminder.id !== id));

    if (reminder) {
      toast({
        title: "Reminder Deleted",
        description: `${reminder.title} has been removed from your reminders.`,
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medication': return <Heart className="h-4 w-4" />;
      case 'appointment': return <Calendar className="h-4 w-4" />;
      case 'academic': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <FileText className="h-4 w-4" />;
      case 'meeting': return <Users className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'medication': return 'Medication';
      case 'appointment': return 'Appointment';
      case 'academic': return 'Academic';
      case 'exam': return 'Exam/CAT';
      case 'meeting': return 'Meeting';
      default: return 'Reminder';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medication': return 'bg-blue-100 text-blue-800';
      case 'appointment': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-purple-100 text-purple-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'meeting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingReminders = reminders.filter(r => !r.completed);
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Reminders</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90"
        >
          Add New Reminder
        </Button>
      </div>

      {/* Add Reminder Form */}
      {showAddForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Reminder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={newReminder.type}
                onChange={(e) => setNewReminder(prev => ({
                  ...prev,
                  type: e.target.value as 'medication' | 'appointment' | 'academic' | 'exam' | 'meeting'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="medication">Medication</option>
                <option value="appointment">Medical Appointment</option>
                <option value="academic">Academic/Study Group</option>
                <option value="exam">Exam/CAT</option>
                <option value="meeting">Meeting with Lecturer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={newReminder.title}
                onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter reminder title"
                aria-label="Reminder title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                value={newReminder.description}
                onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Additional details..."
                aria-label="Reminder description"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, date: e.target.value }))}
                  aria-label="Reminder date"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input
                  type="time"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                  aria-label="Reminder time"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={addReminder} className="bg-secondary hover:bg-secondary/90">
                Add Reminder
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Reminders */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Upcoming Reminders ({upcomingReminders.length})
        </h3>
        <div className="space-y-4">
          {upcomingReminders.map(reminder => (
            <Card key={reminder.id} className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(reminder.type)}`}>
                        {getTypeIcon(reminder.type)} {getTypeLabel(reminder.type)}
                      </span>
                    </div>
                    <h4 className="font-semibold text-lg">{reminder.title}</h4>
                    <p className="text-gray-600 mb-2">{reminder.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {reminder.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {reminder.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleCompleted(reminder.id)}
                      variant="outline"
                      size="sm"
                    >
                      Complete
                    </Button>
                    <Button
                      onClick={() => deleteReminder(reminder.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {upcomingReminders.length === 0 && (
            <p className="text-gray-500 text-center py-8">No upcoming reminders</p>
          )}
        </div>
      </div>

      {/* Completed Reminders */}
      {completedReminders.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Completed ({completedReminders.length})</h3>
          <div className="space-y-2">
            {completedReminders.map(reminder => (
              <Card key={reminder.id} className="opacity-60">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium line-through">{reminder.title}</h4>
                      <p className="text-sm text-gray-500">{reminder.date} at {reminder.time}</p>
                    </div>
                    <Button
                      onClick={() => toggleCompleted(reminder.id)}
                      variant="outline"
                      size="sm"
                    >
                      Undo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reminders;
