/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SignInApiResponse {
  result: {
    accessToken: string;
    expiresIn: number;
    user: User;
  };
  message: string;
  statusCode: number;
}

export interface LoginApiPermissionResponse {
  name: string;
  description: string | null;
}
