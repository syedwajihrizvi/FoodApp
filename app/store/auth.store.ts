import { getCurrentUser } from '@/lib/appwrite';
import { User } from '@/type';
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean,
    user: User | null,
    isLoading: boolean,
    setIsAuthenticated: (isAuthenticated: boolean) => void,
    setUser: (user: User | null) => void,
    setIsLoading: (isLoading: boolean) => void,
    fetchAuthenticatedUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  setIsAuthenticated: (isAuthenticated:boolean) => set({isAuthenticated }),
  setUser: (user:User|null) => set({user }),
  setIsLoading: (isLoading:boolean) => set({isLoading }),
  fetchAuthenticatedUser: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      if (user) set({ user: user as User, isAuthenticated: true });
      else set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Error fetching authenticated user:', error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  }
}))

export default useAuthStore;
