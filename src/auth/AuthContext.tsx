'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import useProfile from '@/hooks/useProfile';
import SignInModal from '@/components/modals/SignInModal';

interface AuthContextType {
  isAuthenticated: boolean;
  openSignInModal: () => void;
  profile: any;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  openSignInModal: () => {},
  profile: null,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { profile, logout } = useProfile();

  const openSignInModal = () => {
    setIsSignInOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!profile,
        openSignInModal,
        profile,
        logout,
      }}
    >
      {children}
      <SignInModal 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 