import { SignInApiResponse } from '@/types/api/auth';
import { makeRequest } from '@/utils/apiClient';

const SERVICE_PATH = '/auth';

export const signIn = async ({
  email,
  password,
  authType,
}: {
  email: string;
  password: string;
  authType: 'EMAIL' | 'GOOGLE';
}) => {
  const res = await makeRequest<SignInApiResponse>({
    method: 'POST',
    path: `${SERVICE_PATH}/login`,
    body: {
      email,
      password,
      authType,
    },
  });

  return res;
};

export const signInWithGoogle = async ({
  email,
  googleId,
  name,
  avatar,
}: {
  email?: string | null;
  googleId?: string | null;
  name?: string | null;
  avatar?: string | null;
}) => {
  const res = await makeRequest<SignInApiResponse>({
    method: 'POST',
    path: `${SERVICE_PATH}/login-google`,
    body: {
      email,
      googleId,
      name,
      avatar,
    },
  });

  return res;
};

export const refreshToken = async () => {
  const res = await makeRequest<SignInApiResponse>({
    method: 'GET',
    path: `${SERVICE_PATH}/refresh-token`,
  });

  return res;
};

export const forgotPassword = async ({ email }: { email: string }) => {
  const res = await makeRequest({
    method: 'POST',
    path: `${SERVICE_PATH}/forgot-password`,
    body: { email },
  });

  return res;
};

export const resetPassword = async ({ token, password }: { password: string; token: string }) => {
  const res = await makeRequest({
    method: 'POST',
    path: `${SERVICE_PATH}/reset-password?token=${token}`,
    body: { password },
  });

  return res;
};
