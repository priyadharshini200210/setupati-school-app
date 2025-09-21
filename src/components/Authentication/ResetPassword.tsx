import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Mail, EyeOff, Eye, CheckCircle, Lock } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { BACKEND_URL } from '@/lib/utils';

export const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    const verifyCode = async () => {
      if (!oobCode) {
        toast({
          variant: 'destructive',
          title: 'Invalid Link',
          description: 'The reset link is missing or invalid.',
          duration: 3000
        });
        navigate('/auth/login');
        return;
      }

      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        setFormData((prev) => ({ ...prev, email }));
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : 'Invalid or expired password reset link.',
          duration: 4000
        });
        navigate('/auth/forgot-password');
      }
    };

    verifyCode();
  }, [oobCode, navigate, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanInputChange = (field: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData?.password !== formData?.confirmPassword) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Passwords do not match.',
          duration: 3000
        });
        setIsLoading(false);
        return;
      } else {
        await confirmPasswordReset(auth, oobCode as string, formData.password);
        toast({
          title: 'Success',
          description: 'Successfully Reseted your password.',
          duration: 3000
        });
        navigate('/auth/login');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error?.message
          : 'Failed to Reset your password.';
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
        duration: 3000
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Setupati School Login
          </h1>
          <p className="text-muted-foreground">
            Empowering Education Through Technology
          </p>
        </div>
        <Card className="w-full max-w-md shadow-medium border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Reset Password
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Enter your New password
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="reset-email"
                className="text-sm font-medium text-foreground"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData?.email}
                  className="pl-10 border-border focus:ring-accent"
                  disabled="true"
                  required
                />
              </div>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={formData?.showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData?.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className="pl-10 pr-10 border-border focus:ring-accent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleBooleanInputChange(
                        'showPassword',
                        !formData?.showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {formData?.showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={formData?.showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData?.confirmPassword}
                    onChange={(e) =>
                      handleInputChange('confirmPassword', e.target.value)
                    }
                    className="pl-10 pr-10 border-border focus:ring-accent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleBooleanInputChange(
                        'showConfirmPassword',
                        !formData?.showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {formData?.showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                onClick={handleResetPassword}
                variant="login"
                size="lg"
                className="w-full"
              >
                {isLoading ? 'Reseting your Password.....' : 'Reset Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2025 School ERP System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
