import { ChevronRight, User, Store, FileText, Shield, RotateCcw, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  {
    icon: Store,
    label: 'Become a Seller',
    description: 'Start selling on Tellus',
    path: '/seller',
    highlight: true,
  },
  {
    icon: FileText,
    label: 'Terms & Conditions',
    path: '/terms',
  },
  {
    icon: Shield,
    label: 'Privacy Policy',
    path: '/privacy',
  },
  {
    icon: RotateCcw,
    label: 'Refund & Return Policy',
    path: '/refund',
  },
];

const Account = () => {
  return (
    <Layout>
      <div className="px-4 py-6">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Guest User
            </h1>
            <p className="text-sm text-muted-foreground">
              Login for a personalized experience
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <Link key={item.path} to={item.path}>
                <div
                  className={`flex items-center justify-between p-4 hover:bg-muted/50 transition-colors ${
                    item.highlight ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                {index < menuItems.length - 1 && <Separator />}
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Tellus.in v1.0.0 • Made with 💚 for the planet
        </p>
      </div>
    </Layout>
  );
};

export default Account;
