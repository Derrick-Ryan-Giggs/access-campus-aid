
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/auth/AuthModal';

const Auth = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleClose = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
      <AuthModal 
        isOpen={isOpen} 
        onClose={handleClose} 
        initialMode="login"
      />
    </div>
  );
};

export default Auth;
