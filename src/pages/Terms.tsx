import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-lg font-semibold">Terms & Conditions</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="prose prose-sm max-w-none text-foreground">
          <p className="text-muted-foreground text-sm mb-6">
            Last updated: December 2024
          </p>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By accessing and using Tellus.in, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">2. Use of Service</h2>
            <p className="text-sm text-muted-foreground">
              Tellus.in provides an online marketplace for eco-friendly products. Users may browse, purchase, and sell sustainable fashion items through our platform. All transactions are subject to our policies and applicable laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">3. User Accounts</h2>
            <p className="text-sm text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">4. Product Information</h2>
            <p className="text-sm text-muted-foreground">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. Eco-friendly certifications are verified with sellers.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">5. Payment Terms</h2>
            <p className="text-sm text-muted-foreground">
              All prices are listed in Indian Rupees (INR). Payment must be made at the time of purchase through our approved payment methods. We use secure payment gateways to process transactions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">6. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              For any questions regarding these terms, please contact us at{' '}
              <a href="mailto:legal@tellus.in" className="text-primary hover:underline">
                legal@tellus.in
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Terms;
