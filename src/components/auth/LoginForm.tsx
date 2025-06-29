
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onClose: () => void;
}

const LoginForm = ({ onSwitchToSignup, onClose }: LoginFormProps) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);
    const { error } = await signIn(formData.email, formData.password);
    setIsLoading(false);
    
    if (!error) {
      onClose();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in bg-white border-2 border-neutral-200">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-neutral-900 mb-2">Welcome Back</CardTitle>
        <p className="text-neutral-600 text-base">Sign in to your EmpowerU account</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-neutral-900 font-medium">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-12"
                disabled={isLoading}
                required
                aria-describedby="email-error"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-neutral-900 font-medium">Password</Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 h-5 w-5" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="pl-12 pr-12"
                disabled={isLoading}
                required
                aria-describedby="password-error"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-neutral-500 hover:text-neutral-700"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-primary-700"
            disabled={isLoading || !formData.email || !formData.password}
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        
        <div className="text-center pt-4 border-t border-neutral-200">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Button
              variant="link"
              onClick={onSwitchToSignup}
              className="text-primary hover:text-primary-700 p-0 h-auto font-semibold"
              disabled={isLoading}
            >
              Sign up here
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
