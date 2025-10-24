import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Spanish Listening',
  description: 'Terms and conditions of use for Spanish Listening',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>Terms and Conditions</h1>
        
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Spanish Listening, you agree to be bound by these terms and 
          conditions. If you do not agree with any part of these terms, you should not use 
          our service.
        </p>

        <h2>2. Use of Service</h2>
        <p>
          Spanish Listening provides free educational materials for Spanish listening 
          comprehension practice. We grant you a limited, non-exclusive, and non-transferable 
          license to access and use the service for personal and educational purposes.
        </p>

        <h2>3. Educational Content</h2>
        <p>
          All content provided (audio, transcripts, vocabulary, quizzes) is for educational 
          purposes. We strive to maintain content accuracy, but we do not guarantee it is 
          error-free.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, design, code, and materials on this site are protected by copyright 
          and other intellectual property laws. You may not reproduce, distribute, or create 
          derivative works without express permission.
        </p>

        <h2>5. Local Storage</h2>
        <p>
          The service uses your browser's local storage to save your progress and preferences. 
          You are responsible for maintaining the security of your device. We may delete or 
          modify this data as necessary.
        </p>

        <h2>6. Advertising (future)</h2>
        <p>
          Currently, this site does not display ads, but in the future it may use Google AdSense 
          or other advertising platforms. We do not control the content of such ads and are not 
          responsible for advertisers' privacy practices.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          Spanish Listening is provided "as is" without warranties of any kind. We will not be 
          liable for any direct, indirect, incidental, or consequential damages arising from 
          the use or inability to use the service.
        </p>

        <h2>8. External Links</h2>
        <p>
          Our service may contain links to third-party websites. We are not responsible for 
          the content or privacy practices of these external sites.
        </p>

        <h2>9. Service Modifications</h2>
        <p>
          We reserve the right to modify or discontinue the service (or any part thereof) at 
          any time without prior notice.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We may update these terms occasionally. Continued use of the service after changes 
          constitutes your acceptance of the new terms.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These terms shall be governed and interpreted in accordance with applicable laws, 
          without regard to its conflict of law provisions.
        </p>

        <h2>12. Contact</h2>
        <p>
          If you have questions about these terms and conditions, contact us through the 
          channels provided on the website.
        </p>
      </article>
    </div>
  );
}
