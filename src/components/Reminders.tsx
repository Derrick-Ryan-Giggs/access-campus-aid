import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id: number;
  type: 'medication' | 'appointment';
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
}

const Reminders = () => {
  const { toast } = useToast();
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
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'medication' as 'medication' | 'appointment',
    title: '',
    description: '',
    date: '',
    time: ''
  });

  const addReminder = () => {
    if (newReminder.title && newReminder.date && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now(),
        ...newReminder,
        completed: false
      };
      setReminders(prev => [...prev, reminder]);
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

  const toggleCompleted = (id: number) => {
    const reminder = reminders.find(r => r.id === id);
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );

    if (reminder) {
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
                  type: e.target.value as 'medication' | 'appointment'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="medication">Medication</option>
                <option value="appointment">Appointment</option>
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
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reminder.type === 'medication' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {reminder.type === 'medication' ? '💊 Medication' : '📅 Appointment'}
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
