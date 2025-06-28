
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, X, Settings, Shield, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile = ({ isOpen, onClose }: UserProfileProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'accessibility'>('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'STU2024001',
    year: 'Third Year',
    program: 'Computer Science'
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsReminders: true,
    emergencyContactsAccess: true,
    highContrastMode: false,
    largeTextMode: false,
    reducedMotion: false
  });

  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully saved.",
      });
    }, 500);
  };

  const handleChangePassword = () => {
    if (!changePasswordForm.currentPassword || !changePasswordForm.newPassword || !changePasswordForm.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }

    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }

    if (changePasswordForm.newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Password Changed",
        description: "Your password has been successfully updated.",
      });
      setChangePasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 500);
  };

  const handleDownloadData = () => {
    toast({
      title: "Preparing Download",
      description: "Your data export is being prepared. You'll receive an email with the download link within 24 hours.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "We've sent you an email with instructions to confirm account deletion. This action cannot be undone.",
      variant: "destructive"
    });
  };

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Setting Updated",
      description: `${setting.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${settings[setting] ? 'disabled' : 'enabled'}.`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-4 sm:pt-8 animate-fade-in px-4">
      <div className="bg-white w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] rounded-lg shadow-xl animate-scale-in overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-3 sm:p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            <h2 className="text-base sm:text-lg font-semibold">User Profile</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => setActiveTab('accessibility')}
              className={`flex-1 py-2 px-2 sm:px-3 rounded-md text-xs sm:text-sm font-medium transition-colors ${
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
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="studentId" className="text-sm">Student ID</Label>
                  <Input
                    id="studentId"
                    value={profile.studentId}
                    readOnly
                    className="bg-gray-100 text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="year" className="text-sm">Academic Year</Label>
                  <Input
                    id="year"
                    value={profile.year}
                    onChange={(e) => setProfile(prev => ({ ...prev, year: e.target.value }))}
                    className="text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="program" className="text-sm">Study Program</Label>
                  <Input
                    id="program"
                    value={profile.program}
                    onChange={(e) => setProfile(prev => ({ ...prev, program: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Email Notifications</Label>
                    <input 
                      type="checkbox" 
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications')}
                      className="rounded" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">SMS Reminders</Label>
                    <input 
                      type="checkbox" 
                      checked={settings.smsReminders}
                      onChange={() => handleSettingChange('smsReminders')}
                      className="rounded" 
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Emergency Contacts Access</Label>
                    <input 
                      type="checkbox" 
                      checked={settings.emergencyContactsAccess}
                      onChange={() => handleSettingChange('emergencyContactsAccess')}
                      className="rounded" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full text-sm">
                        Change Password
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md mx-auto">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
                          <Input
                            id="currentPassword"
                            type="password"
                            value={changePasswordForm.currentPassword}
                            onChange={(e) => setChangePasswordForm({...changePasswordForm, currentPassword: e.target.value})}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label htmlFor="newPassword" className="text-sm">New Password</Label>
                          <Input
                            id="newPassword"
                            type="password"
                            value={changePasswordForm.newPassword}
                            onChange={(e) => setChangePasswordForm({...changePasswordForm, newPassword: e.target.value})}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword" className="text-sm">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={changePasswordForm.confirmPassword}
                            onChange={(e) => setChangePasswordForm({...changePasswordForm, confirmPassword: e.target.value})}
                            className="text-sm"
                          />
                        </div>
                        <Button onClick={handleChangePassword} className="w-full">
                          Update Password
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" className="w-full text-sm" onClick={handleDownloadData}>
                    Download My Data
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full text-sm">
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md mx-auto">
                      <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          This action cannot be undone. All your data will be permanently deleted.
                        </p>
                        <p className="text-sm text-red-600 font-medium">
                          Are you absolutely sure you want to delete your account?
                        </p>
                        <div className="flex gap-2">
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1">
                              Cancel
                            </Button>
                          </DialogTrigger>
                          <Button variant="destructive" className="flex-1" onClick={handleDeleteAccount}>
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && (
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    Accessibility Features
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Screen Reader Support</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      All interface elements include proper ARIA labels and semantic HTML structure for screen readers.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Keyboard Navigation</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      Full keyboard navigation support with visible focus indicators and logical tab ordering.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">High Contrast Mode</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Enhanced color contrast for better visibility
                      </p>
                      <input 
                        type="checkbox" 
                        checked={settings.highContrastMode}
                        onChange={() => handleSettingChange('highContrastMode')}
                        className="rounded" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Large Text Mode</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Increase text size throughout the application
                      </p>
                      <input 
                        type="checkbox" 
                        checked={settings.largeTextMode}
                        onChange={() => handleSettingChange('largeTextMode')}
                        className="rounded" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Reduced Motion</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-gray-600">
                        Minimize animations and transitions
                      </p>
                      <input 
                        type="checkbox" 
                        checked={settings.reducedMotion}
                        onChange={() => handleSettingChange('reducedMotion')}
                        className="rounded" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base">Emergency Accessibility Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    EmpowerU includes specialized features for emergency situations:
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-600 space-y-2 list-disc list-inside">
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
