
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  newsletter: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

const SignupForm = ({ onSwitchToLogin, onClose }: SignupFormProps) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const firstErrorRef = useRef<HTMLInputElement>(null);

  // Focus management for errors
  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      const { error } = await signUp(formData.email, formData.password, fullName);
      
      if (!error) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (submitSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto animate-fade-in bg-white border border-gray-200 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-4">Welcome! Please check your email to verify your account.</p>
            <Button
              onClick={onSwitchToLogin}
              className="w-full bg-secondary hover:bg-secondary-700"
            >
              Go to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in bg-white border border-gray-200 shadow-lg">
      <CardHeader className="text-center pb-3 md:pb-6">
        <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Join EmpowerU</CardTitle>
        <p className="text-gray-600 text-sm md:text-base">Create your account to get started</p>
      </CardHeader>
      <CardContent className="space-y-3 md:space-y-5">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 md:space-y-4" role="form">
          {/* Name Fields - Side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-1 md:space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name *
              </label>
              <input
                ref={errors.firstName ? firstErrorRef : undefined}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <div id="firstName-error" role="alert" className="mt-1 flex items-center text-xs md:text-sm text-red-600">
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className="space-y-1 md:space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name *
              </label>
              <input
                ref={!errors.firstName && errors.lastName ? firstErrorRef : undefined}
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <div id="lastName-error" role="alert" className="mt-1 flex items-center text-xs md:text-sm text-red-600">
                  <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1 md:space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              ref={!errors.firstName && !errors.lastName && errors.email ? firstErrorRef : undefined}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : 'email-help'}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isSubmitting}
            />
            {errors.email ? (
              <div id="email-error" role="alert" className="mt-1 flex items-center text-xs md:text-sm text-red-600">
                <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                {errors.email}
              </div>
            ) : (
              <div id="email-help" className="mt-1 text-xs md:text-sm text-gray-500">
                We'll use this to send you important updates
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1 md:space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <div className="relative">
              <input
                ref={!errors.firstName && !errors.lastName && !errors.email && errors.password ? firstErrorRef : undefined}
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : 'password-help'}
                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
              >
                {showPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
            </div>
            {errors.password ? (
              <div id="password-error" role="alert" className="mt-1 flex items-center text-xs md:text-sm text-red-600">
                <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                {errors.password}
              </div>
            ) : (
              <div id="password-help" className="mt-1 text-xs md:text-sm text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and numbers
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 md:space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                ref={!errors.firstName && !errors.lastName && !errors.email && !errors.password && errors.confirmPassword ? firstErrorRef : undefined}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4 md:h-5 md:w-5" /> : <Eye className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div id="confirmPassword-error" role="alert" className="mt-1 flex items-center text-xs md:text-sm text-red-600">
                <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-start">
              <input
                ref={!errors.firstName && !errors.lastName && !errors.email && !errors.password && !errors.confirmPassword && errors.agreeToTerms ? firstErrorRef : undefined}
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
                aria-invalid={!!errors.agreeToTerms}
                aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                disabled={isSubmitting}
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-xs md:text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  Privacy Policy
                </a>
                *
              </label>
            </div>
            {errors.agreeToTerms && (
              <div id="agreeToTerms-error" role="alert" className="mt-1 flex items-center text-xs md:text-sm text-red-600">
                <AlertCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                {errors.agreeToTerms}
              </div>
            )}
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-1 md:space-y-2">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                disabled={isSubmitting}
              />
              <label htmlFor="newsletter" className="ml-2 block text-xs md:text-sm text-gray-700">
                Subscribe to our newsletter for updates and special offers
              </label>
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full h-12 bg-secondary text-white hover:bg-secondary-700 text-base font-semibold focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
              className="text-primary hover:text-primary-700 p-0 h-auto font-semibold underline"
              disabled={isSubmitting}
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
