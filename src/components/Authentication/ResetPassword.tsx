import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { useToast } from '@/hooks/use-toast';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FormDataType } from './AuthLayout';

interface ResetPasswordProps {
  toggleCurrentView: (view: 'login' | 'forgot' | 'reset') => void;
  formData: FormDataType;
  displayFormData: (data: Partial<FormDataType>) => void;
  handleInputChange: (field: string, value: string) => void;
  handleBooleanInputChange: (field: string, value: boolean) => void;
}

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  toggleCurrentView,
  formData,
  displayFormData,
  handleInputChange,
  handleBooleanInputChange
}) => {
  const [searchParams] = useSearchParams();
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
        toggleCurrentView('forgot');
        return;
      }

      try {
        const email = await verifyPasswordResetCode(auth, oobCode);
        displayFormData({ email: email });
      } catch (error) {
        let errorMessage = '';
        if ((error as { code: string }).code === 'auth/expired-action-code') {
          errorMessage = 'Password Reset Link Expired.';
        } else {
          errorMessage =
            error instanceof Error
              ? error.response?.data?.error || error?.message
              : 'Invalid or expired password reset link.';
        }
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage,
          duration: 4000
        });
        toggleCurrentView('forgot');
      }
    };

    verifyCode();
  }, [oobCode, toast]);

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
        toggleCurrentView('login');
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
              disabled={formData?.email ? true : false}
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
                onChange={(e) => handleInputChange('password', e.target.value)}
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
  );
};
