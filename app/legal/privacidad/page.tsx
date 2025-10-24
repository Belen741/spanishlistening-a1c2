import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Spanish Listening',
  description: 'Privacy policy and data protection for Spanish Listening',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1>Privacy Policy</h1>
        
        <p className="text-muted-foreground">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h2>1. General Information</h2>
        <p>
          At Spanish Listening, we respect your privacy and are committed to protecting your 
          personal data. This privacy policy describes how we collect, use, and protect your 
          information.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          Our website uses browser local storage (localStorage) to save:
        </p>
        <ul>
          <li>Completed quiz results</li>
          <li>Theme preferences (light/dark mode)</li>
          <li>Learning progress</li>
        </ul>
        <p>
          This information is stored only on your device and is not sent to any server.
        </p>

        <h2>3. Use of Google AdSense (future)</h2>
        <p>
          Currently, this site does not display ads, but in the future it may use Google AdSense 
          to show advertising. Google may use cookies and similar technologies to:
        </p>
        <ul>
          <li>Show personalized ads based on your interests</li>
          <li>Measure ad effectiveness</li>
          <li>Prevent advertising fraud</li>
        </ul>
        <p>
          You can manage your ad preferences by visiting Google's Ad Settings page:{' '}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            https://adssettings.google.com
          </a>
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use essential cookies for the site's functionality. Third-party cookies 
          (Google AdSense) are used for advertising. You can configure your browser to reject 
          cookies, although this may affect the site's functionality.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Delete your data (by clearing your browser's localStorage)</li>
          <li>Opt out of personalized advertising</li>
        </ul>

        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this privacy policy occasionally. We will notify you of significant 
          changes by posting the new policy on this page.
        </p>

        <h2>7. Contact</h2>
        <p>
          If you have questions about this privacy policy, contact us through the channels 
          provided on the website.
        </p>
      </article>
    </div>
  );
}
