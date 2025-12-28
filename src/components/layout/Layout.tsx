import { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
  showHeader?: boolean;
}

const Layout = ({ children, onSearch, showHeader = true }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      {showHeader && <Header onSearch={onSearch} />}
      <main className="flex-1 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
