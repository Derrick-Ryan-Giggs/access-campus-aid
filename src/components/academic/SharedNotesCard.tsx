
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SharedNote {
  id: number;
  title: string;
  course: string;
  author: string;
  downloads: number;
  rating: number;
  format: string[];
}

interface SharedNotesCardProps {
  note: SharedNote;
}

const SharedNotesCard = ({ note }: SharedNotesCardProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    // Simulate file download
    toast({
      title: "Download Started",
      description: `Downloading "${note.title}" in PDF format...`,
    });

    // Create a fake download link
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${note.title.replace(/\s+/g, '_')}.pdf`;
    
    // For demonstration, we'll show a success message after a short delay
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `"${note.title}" has been downloaded successfully.`,
      });
    }, 1500);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2">{note.title}</h3>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="outline" className="text-xs">
                {note.course}
              </Badge>
              <Badge variant="outline" className="text-xs">
                By {note.author}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {note.downloads} downloads
              </Badge>
              {note.rating > 0 && (
                <Badge variant="outline" className="text-xs">
                  ⭐ {note.rating}
                </Badge>
              )}
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium mb-1">Available Formats:</p>
              <div className="flex flex-wrap gap-1">
                {note.format.map((format, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full sm:w-auto"
          onClick={handleDownload}
        >
          Download Notes
        </Button>
      </CardContent>
    </Card>
  );
};

export default SharedNotesCard;
