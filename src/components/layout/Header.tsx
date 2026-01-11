import { useState } from 'react';
import { Search, MapPin, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from '@/contexts/LocationContext';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
interface HeaderProps {
  onSearch?: (query: string) => void;
}
const Header = ({
  onSearch
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const {
    totalItems
  } = useCart();
  const {
    location,
    setLocation
  } = useLocation();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };
  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      setLocation(locationInput.trim());
      setIsLocationOpen(false);
      setLocationInput('');
    }
  };
  return <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      {/* Top bar with logo */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-display font-bold text-lg">AT</span>
          </div>
          <span className="font-display text-xl font-semibold text-foreground">ArcaTellus</span>
        </Link>

        <div className="flex items-center gap-3">
          <Dialog open={isLocationOpen} onOpenChange={setIsLocationOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-xs max-w-[80px] truncate">{location}</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Set Delivery Location</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 pt-4">
                <Input placeholder="Enter city or pincode" value={locationInput} onChange={e => setLocationInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLocationSubmit()} />
                <Button onClick={handleLocationSubmit} className="w-full">
                  Set Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>}
            </Button>
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search eco-friendly kurtas..." value={searchQuery} onChange={handleSearch} className="pl-10 bg-secondary border-0" />
        </div>
      </div>
    </header>;
};
export default Header;