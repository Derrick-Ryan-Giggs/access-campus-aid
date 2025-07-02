
import { Card, CardContent } from '@/components/ui/card';

interface QueueStatusProps {
  queuePosition: number;
}

const QueueStatus = ({ queuePosition }: QueueStatusProps) => {
  return (
    <Card className="mb-4 border-yellow-500 bg-yellow-50">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-pulse bg-yellow-500 rounded-full w-3 h-3"></div>
          <span className="font-semibold">Position in queue: {queuePosition}</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Estimated wait time: {queuePosition * 2} minutes
        </p>
      </CardContent>
    </Card>
  );
};

export default QueueStatus;
