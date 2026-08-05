import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Mock successful login
        set({
          user: {
            id: 'user-1',
            name: 'Nguyễn Văn A',
            email,
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
