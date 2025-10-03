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
import { Mail, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { BACKEND_URL } from '@/lib/utils';

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onBackToLogin
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/validateEmail`, {
        email: email
      });

      await sendPasswordResetEmail(auth, email);

      setIsSubmitted(true);

      toast({
        title: 'Success',
        description: 'Email validated and reset link sent to your email.',
        duration: 3000
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.response?.data?.error || error.message
          : 'No User Found in this email ID or Failed to send reset email.';

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

  return (
    <Card className="w-full max-w-md shadow-medium border-0">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-accent-foreground" />
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Reset Password
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Enter your email address and we'll send you a reset link
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-border focus:ring-accent"
                disabled={isSubmitted}
                required
              />
            </div>
          </div>
          <Button
            onClick={handleEmailSubmit}
            variant="login"
            size="lg"
            disabled={isSubmitted || isLoading}
            className="w-full"
          >
            {isSubmitted
              ? 'Link Sent! Check Your Email'
              : isLoading
                ? 'Validating......'
                : 'Confirm Your Email Address'}
          </Button>
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
