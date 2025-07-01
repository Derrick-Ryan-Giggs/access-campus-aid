
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Assignment {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  progress: number;
  status: string;
  priority: string;
  accommodations: string[];
}

interface EditAssignmentDialogProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedAssignment: Assignment) => void;
}

const EditAssignmentDialog = ({ assignment, isOpen, onClose, onSave }: EditAssignmentDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    dueDate: '',
    priority: '',
    accommodations: ''
  });

  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title,
        course: assignment.course,
        dueDate: assignment.dueDate,
        priority: assignment.priority,
        accommodations: assignment.accommodations.join(', ')
      });
    }
  }, [assignment]);

  const handleSave = () => {
    if (!assignment || !formData.title || !formData.course || !formData.dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in title, course, and due date",
        variant: "destructive"
      });
      return;
    }

    const updatedAssignment: Assignment = {
      ...assignment,
      title: formData.title,
      course: formData.course,
      dueDate: formData.dueDate,
      priority: formData.priority || 'medium',
      accommodations: formData.accommodations ? formData.accommodations.split(',').map(acc => acc.trim()) : []
    };

    onSave(updatedAssignment);
    toast({
      title: "Assignment Updated",
      description: `"${formData.title}" has been updated successfully`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <Label htmlFor="edit-title">Assignment Title *</Label>
            <Input
              id="edit-title"
              placeholder="Enter assignment title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="edit-course">Course *</Label>
            <Input
              id="edit-course"
              placeholder="e.g., PSYC 301"
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-dueDate">Due Date *</Label>
              <Input
                id="edit-dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
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
            <Label htmlFor="edit-accommodations">Accommodations Needed</Label>
            <Textarea
              id="edit-accommodations"
              placeholder="e.g., Extended time, Alternative format..."
              value={formData.accommodations}
              onChange={(e) => setFormData({...formData, accommodations: e.target.value})}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAssignmentDialog;
