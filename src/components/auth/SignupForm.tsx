
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const SignupForm = ({ onSwitchToLogin, onClose }: SignupFormProps) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    setIsLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.name);
    setIsLoading(false);
    
    if (!error) {
      onSwitchToLogin();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in bg-white border border-gray-200 shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Join EmpowerU</CardTitle>
        <p className="text-gray-600 text-base">Create your account to get started</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 font-medium">Full Name</Label>
            <div className="flex items-center gap-3 p-3 border-2 border-gray-500 rounded-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white">
              <User className="text-gray-500 h-5 w-5 flex-shrink-0" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="border-0 p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 font-medium">Email Address</Label>
            <div className="flex items-center gap-3 p-3 border-2 border-gray-500 rounded-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white">
              <Mail className="text-gray-500 h-5 w-5 flex-shrink-0" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="border-0 p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 font-medium">Password</Label>
            <div className="flex items-center gap-3 p-3 border-2 border-gray-500 rounded-md focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-500/20 bg-white">
              <Lock className="text-gray-500 h-5 w-5 flex-shrink-0" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="border-0 p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-auto p-0 text-gray-500 hover:text-gray-700 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">Confirm Password</Label>
            <div className={`flex items-center gap-3 p-3 border-2 rounded-md focus-within:ring-2 focus-within:ring-blue-500/20 bg-white ${passwordMismatch ? 'border-red-500 focus-within:border-red-500' : 'border-gray-500 focus-within:border-blue-600'}`}>
              <Lock className="text-gray-500 h-5 w-5 flex-shrink-0" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                  setPasswordMismatch(false);
                }}
                className="border-0 p-0 h-auto bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-auto w-auto p-0 text-gray-500 hover:text-gray-700 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {passwordMismatch && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 bg-secondary text-white hover:bg-secondary-700 text-base font-semibold"
            disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
        
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Button
              variant="link"
              onClick={onSwitchToLogin}
              className="text-primary hover:text-primary-700 p-0 h-auto font-semibold"
              disabled={isLoading}
            >
              Sign in here
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
