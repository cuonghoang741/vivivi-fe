import React from 'react';
import ModalComponent from '../ui/ModalComponent';
import { Button } from '@nextui-org/react';
import InputComponent from '../ui/InputComponent';
import { Control, useForm, FieldValues } from 'react-hook-form';
import { ELoginType } from '@/utils/types';
import useAccessToken from '@/hooks/useAccessToken';
import { makeRequest } from '@/utils/apiClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Add new type for step management
type SignUpStep = 'email' | 'password' | 'username' | 'verify';

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { setAccessToken } = useAccessToken();
  const [currentStep, setCurrentStep] = React.useState<SignUpStep>('email');
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ELoginType>();


  const onSubmit = async (data: ELoginType) => {
    try {
      const response = await makeRequest({
        path: '/api/auth/login',
        method: 'POST',
        body: data
      });

      if (response?.token) {
        setAccessToken(response.token);
        toast.success('Signed in successfully');
        onClose();
        router.refresh();
      }
    } catch (error) {
      toast.error('Invalid credentials');
    }
  };

  const handleGoogleSignIn = async () => {
    // Implement Google Sign In logic here
    signIn('google');
  };

  // Add step content rendering
  const renderStepContent = () => {
    switch (currentStep) {
      case 'email':
        return (
          <>
            <InputComponent
              control={control as unknown as Control<FieldValues>}
              name="email"
              label="Email"
              type="email"
              required
              errors={errors}
            />
            
            <Button 
              onClick={() => setCurrentStep('password')}
              className="w-full bg-app-main text-white"
            >
              Continue
            </Button>

            <div className="mt-4 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                className="w-full mt-4 bg-white text-black border"
              >
                Sign in with Google
              </Button>
            </div>
          </>
        );

      case 'password':
        return (
          <>
            <InputComponent
              control={control as unknown as Control<FieldValues>}
              name="password"
              label="Password"
              type="password"
              required
              errors={errors}
            />
            <InputComponent
              control={control as unknown as Control<FieldValues>}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              required
              errors={errors}
            />
            <Button 
              onClick={() => setCurrentStep('username')}
              className="w-full bg-app-main text-white"
            >
              Continue
            </Button>
          </>
        );

      case 'username':
        return (
          <>
            <InputComponent
              control={control as unknown as Control<FieldValues>}
              name="username"
              label="Choose a username"
              required
              errors={errors}
            />
            <Button 
              onClick={() => setCurrentStep('verify')}
              className="w-full bg-app-main text-white"
            >
              Continue
            </Button>
          </>
        );

      case 'verify':
        return (
          <>
            <div className="text-center mb-4">
              <p>Please check your email for verification code</p>
            </div>
            <InputComponent
              control={control as unknown as Control<FieldValues>}
              name="verificationCode"
              label="Verification Code"
              required
              errors={errors}
            />
            <Button 
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-app-main text-white"
            >
              Complete Registration
            </Button>
          </>
        );
    }
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      handleClose={onClose}
      size="sm"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          {currentStep === 'email' ? 'Sign In' : `Step ${
            currentStep === 'password' ? '2/4' :
            currentStep === 'username' ? '3/4' : '4/4'
          }`}
        </h2>
        
        <div className="space-y-4">
          {renderStepContent()}
        </div>
      </div>
    </ModalComponent>
  );
};

export default SignInModal;