import { Mail, MessageCircle, Phone, ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What makes your products eco-friendly?',
    answer: 'All our products are made from sustainable materials like organic cotton, linen, hemp, and recycled fabrics. We partner with certified eco-friendly manufacturers who follow ethical production practices.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day easy return policy for all products. Items must be unworn, unwashed, and in original condition with tags attached.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 5-7 business days across India. Express delivery options are available in select cities.',
  },
  {
    question: 'Are your products certified organic?',
    answer: 'Many of our products carry organic certifications like GOTS (Global Organic Textile Standard). Look for the certification badge on individual product pages.',
  },
  {
    question: 'How can I become a seller on Tellus?',
    answer: 'Visit our "Become a Seller" page from your Account section. Fill out the application form with your business details, and our team will review your application within 3-5 business days.',
  },
];

const Help = () => {
  return (
    <Layout>
      <div className="px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Help Center
        </h1>
        <p className="text-muted-foreground mb-6">
          How can we assist you today?
        </p>

        {/* Contact Options */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-medium">Email</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-medium">Call</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs font-medium">Chat</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-lg border-0 shadow-sm px-4"
            >
              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Email */}
        <Card className="border-0 shadow-sm mt-8">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Still need help? Reach out to us at
            </p>
            <a
              href="mailto:support@tellus.in"
              className="text-primary font-medium hover:underline"
            >
              support@tellus.in
            </a>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Help;
