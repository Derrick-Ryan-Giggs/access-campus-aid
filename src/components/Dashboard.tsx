
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import QuickStats from './QuickStats';
import ContactInfo from './ContactInfo';

type ActiveSection = 'home' | 'groceries' | 'reminders' | 'tutors' | 'checkout' | 'live-support' | 'personal-care' | 'virtual-hangouts' | 'mentorship' | 'health-wellness' | 'advocacy-legal' | 'smart-assistant' | 'emergency-support' | 'academic-hub';

interface DashboardProps {
  onNavigate: (section: ActiveSection) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const recentActivities = [
    { action: "Grocery order", status: "Delivered", time: "2 hours ago", color: "bg-green-100 text-green-800" },
    { action: "Tutor session", status: "Scheduled", time: "Today 3:00 PM", color: "bg-blue-100 text-blue-800" },
    { action: "Reminder set", status: "Active", time: "Yesterday", color: "bg-yellow-100 text-yellow-800" },
    { action: "Health check", status: "Completed", time: "3 days ago", color: "bg-purple-100 text-purple-800" }
  ];

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
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.color}`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <QuickStats />
      <ContactInfo />
    </div>
  );
};

export default Dashboard;
