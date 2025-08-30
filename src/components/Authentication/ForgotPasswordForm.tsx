import React, { useState } from 'react';
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
import { Mail, EyeOff, Eye, ArrowLeft, CheckCircle, Lock } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { BACKEND_URL } from '@/lib/utils';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin
}) => {
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBooleanInputChange = (field: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/validateEmail`, {
        email: formData.email
      });
      setIsSubmitted(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'No User Found in this email ID';

      setIsSubmitted(false);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
        duration: 3000
      });
    }
    setIsLoading(false);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Passwords do not match.',
          duration: 3000
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/v1/auth/reset-password`, {
          email: formData.email,
          password: formData.password
        });
        toast({
          title: 'Success',
          description: 'Successfully Reseted your password.',
          duration: 3000
        });
        onBackToLogin();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
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
          {isSubmitted ? (
            <CheckCircle className="w-8 h-8 text-accent-foreground" />
          ) : (
            <Mail className="w-8 h-8 text-accent-foreground" />
          )}
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Reset Password
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            {isSubmitted
              ? 'Enter your New password'
              : "Enter your email address and we'll send you a reset link"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleEmailSubmit} className="space-y-4">
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
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 border-border focus:ring-accent"
                disabled={isSubmitted}
                required
              />
            </div>
          </div>

          {isSubmitted ? (
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
                    type={formData.showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
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
                        !formData.showPassword
                      )
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {formData.showPassword ? (
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
                    type={formData.showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.confirmPassword}
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
                        !formData.showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {formData.showConfirmPassword ? (
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
          ) : (
            <Button
              onClick={handleEmailSubmit}
              variant="login"
              size="lg"
              className="w-full"
            >
              {isLoading ? 'Validating......' : 'Confirm Your Email Address'}
            </Button>
          )}
        </form>

        <Button
          onClick={onBackToLogin}
          variant="ghost"
          size="lg"
          className="w-full"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>
      </CardContent>
    </Card>
  );
};
