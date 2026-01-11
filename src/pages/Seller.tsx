import { useState } from 'react';
import { ArrowLeft, Store, Leaf, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
const Seller = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    productType: '',
    sustainabilityNotes: ''
  });
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.businessName || !formData.email || !formData.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    toast({
      title: 'Application Submitted!',
      description: 'Our team will contact you within 3-5 business days.'
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  if (isSubmitted) {
    return <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
        <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-display text-lg font-semibold">Become a Seller</h1>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-2">
            Thank You!
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Your application has been submitted successfully. Our team will review it and contact you within 3-5 business days.
          </p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </main>
      </div>;
  }
  return <div className="min-h-screen bg-background flex flex-col max-w-lg mx-auto">
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <Link to="/account">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-display text-lg font-semibold">Become a Seller</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Join the ArcaTellus Marketplace</h2>
          <p className="text-sm text-muted-foreground">
            Partner with us to reach eco-conscious buyers across India
          </p>
        </div>

        {/* Benefits */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Leaf className="w-5 h-5 text-eco" />
              <span className="font-medium text-sm">Why sell on ArcaTellus?</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Access to sustainability-focused customers</li>
              <li>• Zero listing fees for eco-certified products</li>
              <li>• Marketing support for sustainable brands</li>
              <li>• Integrated logistics and payments</li>
            </ul>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display text-lg">Seller Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input id="businessName" name="businessName" placeholder="Your brand or business name" value={formData.businessName} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person</Label>
                <Input id="contactName" name="contactName" placeholder="Full name" value={formData.contactName} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productType">Product Type</Label>
                <Input id="productType" name="productType" placeholder="e.g., Women's Kurtas, Organic Fabrics" value={formData.productType} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sustainabilityNotes">
                  Sustainability Practices (Optional)
                </Label>
                <Textarea id="sustainabilityNotes" name="sustainabilityNotes" placeholder="Tell us about your eco-friendly practices, certifications, or sustainable materials used..." value={formData.sustainabilityNotes} onChange={handleChange} rows={4} />
              </div>

              <Button type="submit" className="w-full h-12 text-base font-semibold">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>;
};
export default Seller;