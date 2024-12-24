import { create } from "zustand";


type User = {
  id: string;
  username: string;
  email: string;
}

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
}));

export default useUserStore;
