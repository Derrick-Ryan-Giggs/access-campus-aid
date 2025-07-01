
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Calendar, Edit } from 'lucide-react';
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

interface AssignmentCardProps {
  assignment: Assignment;
  onUpdateProgress: (id: number, progress: number) => void;
  onEdit: (assignment: Assignment) => void;
}

const AssignmentCard = ({ assignment, onUpdateProgress, onEdit }: AssignmentCardProps) => {
  const { toast } = useToast();
  const [progressInput, setProgressInput] = useState('');

  const handleProgressUpdate = () => {
    const progress = Math.min(100, Math.max(0, parseInt(progressInput) || 0));
    onUpdateProgress(assignment.id, progress);
    setProgressInput('');
    toast({
      title: "Progress Updated",
      description: `Assignment progress updated to ${progress}%`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleProgressUpdate();
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h3 className="text-base sm:text-lg font-semibold">{assignment.title}</h3>
              <Badge className={`${getPriorityColor(assignment.priority)} text-white text-xs w-fit`}>
                {assignment.priority.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {assignment.course}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Calendar className="h-3 w-3 mr-1" />
                Due: {assignment.dueDate}
              </Badge>
              <Badge className={`text-xs ${getStatusColor(assignment.status)}`}>
                {assignment.status.replace('-', ' ')}
              </Badge>
            </div>

            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">{assignment.progress}%</span>
              </div>
              <Progress value={assignment.progress} className="h-2" />
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

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <div className="flex items-center gap-2 flex-1">
            <Input
              type="number"
              min="0"
              max="100"
              placeholder="Progress %"
              className="w-20"
              value={progressInput}
              onChange={(e) => setProgressInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              size="sm" 
              onClick={handleProgressUpdate}
              className="whitespace-nowrap"
            >
              Update Progress
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="sm:w-auto"
            onClick={() => onEdit(assignment)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;
