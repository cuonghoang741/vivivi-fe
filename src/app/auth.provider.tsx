import { ROUTE_PATH } from '@/constants/route';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

export const AuthContext = React.createContext<
  { session: Session | undefined } | undefined
>(undefined);

const AUTH_DEFAULT_VALUE = {
  session: undefined,
  user: null,
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <AuthContext.Provider value={{ session: (session ?? AUTH_DEFAULT_VALUE) as Session }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
