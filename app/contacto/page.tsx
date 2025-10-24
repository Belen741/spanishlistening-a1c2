import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact - Spanish Listening',
  description: 'Get in touch with Spanish Listening for questions, suggestions, or collaborations.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 hover-elevate px-3 py-2 rounded-md transition-colors"
        data-testid="link-back"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-page-title">
        Contact
      </h1>

      <div className="bg-card border rounded-xl p-8 space-y-6">
        <p className="text-lg leading-relaxed" data-testid="text-contact-intro">
          Do you have any questions, suggestions, or comments about Spanish Listening? I'd love to hear from you.
        </p>

        <div className="flex items-start gap-4 p-6 bg-primary/5 border-l-4 border-l-primary rounded-md">
          <Mail className="h-6 w-6 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-2">Email</h2>
            <p className="text-muted-foreground mb-3">
              For general inquiries, suggestions, or collaborations:
            </p>
            <a 
              href="mailto:hablandoconbelen@gmail.com" 
              className="text-primary hover:underline font-medium"
              data-testid="link-email"
            >
              hablandoconbelen@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h2 className="font-semibold text-lg mb-3">About Belén</h2>
          <p className="text-muted-foreground leading-relaxed">
            I'm an online Spanish teacher and creator of Spanish Listening. My goal is to help Spanish 
            learners from around the world improve their listening comprehension through original content 
            and interactive exercises.
          </p>
        </div>
      </div>
    </div>
  );
}
