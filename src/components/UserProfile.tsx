
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, X, Settings, Shield, HelpCircle } from 'lucide-react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'accessibility'>('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'STU2024001',
    year: 'Third Year',
    program: 'Computer Science'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-8 animate-fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-lg shadow-xl animate-scale-in overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <h2 className="text-lg font-semibold">User Profile</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'accessibility'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Accessibility
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={profile.studentId}
                    readOnly
                    className="bg-gray-100"
                  />
                </div>
                <div>
                  <Label htmlFor="year">Academic Year</Label>
                  <Input
                    id="year"
                    value={profile.year}
                    onChange={(e) => setProfile(prev => ({ ...prev, year: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="program">Study Program</Label>
                  <Input
                    id="program"
                    value={profile.program}
                    onChange={(e) => setProfile(prev => ({ ...prev, program: e.target.value }))}
                  />
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Reminders</Label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Emergency Contacts Access</Label>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download My Data
                  </Button>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Accessibility Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Screen Reader Support</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      All interface elements include proper ARIA labels and semantic HTML structure for screen readers.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Keyboard Navigation</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Full keyboard navigation support with visible focus indicators and logical tab ordering.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">High Contrast Mode</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Enhanced color contrast for better visibility
                      </p>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Large Text Mode</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Increase text size throughout the application
                      </p>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Reduced Motion</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Minimize animations and transitions
                      </p>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Accessibility Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    EmpowerU includes specialized features for emergency situations:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
                    <li>One-click emergency button with large, high-contrast design</li>
                    <li>Voice-activated emergency commands (when supported)</li>
                    <li>Automatic location sharing with emergency contacts</li>
                    <li>Simple, clear emergency contact information display</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
