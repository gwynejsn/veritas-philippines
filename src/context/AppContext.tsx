import { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AppContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const login = (email: string) => {
    // Mock login
    setUser({
      name: email.split('@')[0],
      email,
      role: 'Subscriber',
    });
  };

  const logout = () => setUser(null);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        searchQuery,
        setSearchQuery,
        isSidebarOpen,
        toggleSidebar,
        isSearchOpen,
        toggleSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
