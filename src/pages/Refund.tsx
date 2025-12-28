import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Refund = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-lg font-semibold">Refund & Return Policy</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        <div className="prose prose-sm max-w-none text-foreground">
          <p className="text-muted-foreground text-sm mb-6">
            Last updated: December 2024
          </p>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">1. Return Period</h2>
            <p className="text-sm text-muted-foreground">
              We offer a 7-day return policy from the date of delivery. To be eligible for a return, items must be unworn, unwashed, and in their original condition with all tags attached.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">2. How to Initiate a Return</h2>
            <p className="text-sm text-muted-foreground mb-3">
              To initiate a return, please follow these steps:
            </p>
            <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
              <li>Contact our customer support within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Schedule a pickup or drop off at the nearest courier point</li>
            </ol>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">3. Non-Returnable Items</h2>
            <p className="text-sm text-muted-foreground mb-3">
              The following items cannot be returned:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Items marked as "Final Sale"</li>
              <li>Customized or personalized products</li>
              <li>Items that have been altered or washed</li>
              <li>Items without original tags</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">4. Refund Process</h2>
            <p className="text-sm text-muted-foreground">
              Once we receive and inspect your return, we will notify you of the approval or rejection. Approved refunds will be processed within 5-7 business days to your original payment method. Please note that it may take additional time for your bank to process the refund.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">5. Exchange Policy</h2>
            <p className="text-sm text-muted-foreground">
              We offer exchanges for size issues. To exchange an item, please initiate a return and place a new order for the desired size. The original item will be refunded once received.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">6. Damaged or Defective Items</h2>
            <p className="text-sm text-muted-foreground">
              If you receive a damaged or defective item, please contact us immediately with photos. We will arrange for a free return and replacement or full refund.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="font-display text-lg font-semibold mb-3">7. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              For return or refund queries, please contact us at{' '}
              <a href="mailto:returns@tellus.in" className="text-primary hover:underline">
                returns@tellus.in
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Refund;
