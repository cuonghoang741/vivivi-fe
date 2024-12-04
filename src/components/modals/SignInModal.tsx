import React from 'react';
import ModalComponent from '../ui/ModalComponent';
import { Button } from '@nextui-org/react';
import InputComponent from '../ui/InputComponent';
import { Control, useForm } from 'react-hook-form';
import { ELoginType } from '@/utils/types';
import useAccessToken from '@/hooks/useAccessToken';
import { makeRequest } from '@/utils/apiClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { setAccessToken } = useAccessToken();
  const { control, handleSubmit, formState: { errors } } = useForm<ELoginType>();

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
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      handleClose={onClose}
      size="sm"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputComponent
            control={control}
            name="email"
            label="Email"
            type="email"
            required
            errors={errors}
          />
          
          <InputComponent
            control={control}
            name="password"
            label="Password"
            type="password"
            required
            errors={errors}
          />
          
          <Button 
            type="submit"
            className="w-full bg-app-main text-white"
          >
            Sign In
          </Button>
        </form>

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
      </div>
    </ModalComponent>
  );
};

export default SignInModal; 