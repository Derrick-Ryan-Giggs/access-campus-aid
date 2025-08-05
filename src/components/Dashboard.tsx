
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, parseISO } from 'date-fns';
import QuickStats from './QuickStats';
import ContactInfo from './ContactInfo';
import { useActivities } from '@/hooks/useActivities';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ActiveSection = 'home' | 'groceries' | 'reminders' | 'tutors' | 'checkout' | 'live-support' | 'personal-care' | 'virtual-hangouts' | 'mentorship' | 'health-wellness' | 'advocacy-legal' | 'smart-assistant' | 'emergency-support' | 'academic-hub';

interface DashboardProps {
  onNavigate: (section: ActiveSection) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const { activities, loading: activitiesLoading, deleteActivity } = useActivities();

  const quickActions = [
    {
      title: "Order Groceries",
      description: "Quick grocery shopping",
      icon: "🛒",
      onClick: () => onNavigate('groceries')
    },
    {
      title: "Set Reminder",
      description: "Add new reminder",
      icon: "⏰",
      onClick: () => onNavigate('reminders')
    },
    {
      title: "Get Support",
      description: "Live assistance",
      icon: "🎥",
      onClick: () => onNavigate('live-support')
    },
    {
      title: "Emergency",
      description: "Safety features",
      icon: "🚨",
      onClick: () => onNavigate('emergency-support')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
      {/* Welcome Section */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Your Personal Dashboard
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          Track your activities, quick actions, and personalized insights.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={action.onClick}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{action.icon}</div>
              <h3 className="font-semibold text-sm">{action.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          {activitiesLoading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">
                      {formatDistanceToNow(parseISO(activity.created_at), { addSuffix: true })}
                    </p>
                    {activity.description && (
                      <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {activity.type.replace('_', ' ')}
                      </Badge>
                      <Badge 
                        variant={activity.status === 'completed' ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteActivity(activity.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recent activities</p>
            </div>
          )}
        </CardContent>
      </Card>

      <QuickStats />
      <ContactInfo />
    </div>
  );
};

export default Dashboard;
