import React, { useState, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

interface SignUpFormProps {
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSwitchToLogin, onClose }) => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number required';
      } else if (!validatePhone(formData.phone)) {
        newErrors.phone = 'Invalid phone format';
      }
    } else if (step === 2) {
      if (!formData.password.trim()) {
        newErrors.password = 'Password required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Min 8 characters';
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Confirm password required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SignUpFormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleNext = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(2);
    }
  };

  const handleBack = (): void => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleSubmit = async (): Promise<void> => {
    if (!validateStep(2)) return;

    setIsLoading(true);
    
    try {
      const { error } = await signUp(
        formData.email, 
        formData.password, 
        `${formData.firstName} ${formData.lastName}`
      );

      if (!error) {
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        setCurrentStep(1);
        setShowPassword(false);
        setShowConfirmPassword(false);
        onClose();
      }
    } catch (error) {
      console.error('Sign up failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
  };

  const renderStepIndicator = (): JSX.Element => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
        </div>
        <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`}>
          2
        </div>
      </div>
    </div>
  );

  const renderStep1 = (): JSX.Element => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
        Personal Information
      </h2>
      
      {/* Name Fields Row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full h-10 pl-9 pr-3 border rounded-lg text-sm bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:bg-white ${
                errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="John"
            />
          </div>
          {errors.firstName && (
            <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full h-10 pl-9 pr-3 border rounded-lg text-sm bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:bg-white ${
                errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Doe"
            />
          </div>
          {errors.lastName && (
            <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={emailRef}
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full h-10 pl-9 pr-3 border rounded-lg text-sm bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:bg-white ${
              errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`w-full h-10 pl-9 pr-3 border rounded-lg text-sm bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:bg-white ${
              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        {errors.phone && (
          <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = (): JSX.Element => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
        Create Password
      </h2>
      
      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
          <input
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`w-full h-10 pl-9 pr-9 border rounded-lg text-sm bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:bg-white ${
              errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-600 mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`w-full h-10 pl-9 pr-9 border rounded-lg text-sm bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white hover:bg-white ${
              errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Password Requirements */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-800 font-medium mb-1">Password must contain:</p>
        <ul className="text-xs text-blue-700 space-y-0.5">
          <li className="flex items-center">
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
              formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            At least 8 characters
          </li>
          <li className="flex items-center">
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
              /[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            One uppercase letter
          </li>
          <li className="flex items-center">
            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${
              /[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            One number
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Join EmpowerU</h1>
          <p className="text-sm text-gray-600">Create your account in 2 easy steps</p>
        </div>
        
        {renderStepIndicator()}

        {currentStep === 1 ? renderStep1() : renderStep2()}

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          {currentStep === 1 ? (
            <div
              onClick={handleNext}
              onKeyDown={(e) => handleKeyDown(e, handleNext)}
              role="button"
              tabIndex={0}
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg cursor-pointer transition-all hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center justify-center text-sm"
            >
              Continue
            </div>
          ) : (
            <div className="space-y-2">
              <div
                onClick={handleSubmit}
                onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
                role="button"
                tabIndex={0}
                className={`w-full h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg cursor-pointer transition-all hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 flex items-center justify-center text-sm ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </div>
              
              <div
                onClick={handleBack}
                onKeyDown={(e) => handleKeyDown(e, handleBack)}
                role="button"
                tabIndex={0}
                className="w-full h-10 bg-gray-100 text-gray-700 font-medium rounded-lg cursor-pointer transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50 flex items-center justify-center text-sm"
              >
                Back
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded"
            onClick={onSwitchToLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;