import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-lg font-semibold">Privacy Policy</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="prose prose-sm max-w-none text-foreground">
          <p className="text-muted-foreground text-sm mb-6">
            Last updated: December 2024
          </p>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-sm text-muted-foreground mb-3">
              We collect information you provide directly to us, including:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Name and contact information</li>
              <li>Delivery address</li>
              <li>Payment information</li>
              <li>Purchase history</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground mb-3">
              We use the information we collect to:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about products and services</li>
              <li>Improve our platform and user experience</li>
              <li>Protect against fraud and unauthorized transactions</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">3. Data Security</h2>
            <p className="text-sm text-muted-foreground">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">4. Data Sharing</h2>
            <p className="text-sm text-muted-foreground">
              We do not sell your personal information. We may share your information with trusted service providers who assist in operating our platform, conducting our business, or serving you. These parties agree to keep your information confidential.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">5. Your Rights</h2>
            <p className="text-sm text-muted-foreground">
              You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@tellus.in" className="text-primary hover:underline">
                privacy@tellus.in
              </a>
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">6. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              For any privacy-related questions, please contact us at{' '}
              <a href="mailto:privacy@tellus.in" className="text-primary hover:underline">
                privacy@tellus.in
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
