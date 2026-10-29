
export const metadata = {
  title: "Privacy Policy",
  description: "Learn how FreeTools Hub handles visitor information and privacy.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16 text-slate-900">
      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <a href="/" className="font-semibold text-violet-700 hover:underline">
          ← Back to FreeTools Hub
        </a>

        <h1 className="mt-8 text-4xl font-extrabold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: October 28, 2026
        </p>

        <p className="mt-6 leading-8 text-slate-600">
          FreeTools Hub respects your privacy. This policy explains how
          information may be handled when you visit our website and use
          our free online tools.
        </p>

        <h2 className="mt-8 text-2xl font-bold">1. Information You Enter</h2>
        <p className="mt-3 leading-8 text-slate-600">
          Our word counter, percentage calculator, age calculator, and
          JSON formatter process the information you enter in your
          browser. These tools are designed to work without sending that
          input to our own server. Avoid entering passwords, confidential
          business information, or other sensitive data into any online
          tool.
        </p>

        <h2 className="mt-8 text-2xl font-bold">2. Information and Cookies</h2>
        <p className="mt-3 leading-8 text-slate-600">
          Our hosting provider and other services used by the website may
          process technical information such as IP addresses, browser
          details, security logs, and usage information. Cookies or
          similar technologies may be used by services operating on the
          website, depending on their configuration.
        </p>

        <h2 className="mt-8 text-2xl font-bold">3. Advertising</h2>
        <p className="mt-3 leading-8 text-slate-600">
          We may display advertisements through third-party advertising
          providers, such as Adsterra. These providers may use cookies,
          device information, IP addresses, or similar technologies to
          deliver ads, prevent fraud, measure performance, or personalize
          advertising where permitted. Their data practices are governed
          by their own policies.
        </p>

        <h2 className="mt-8 text-2xl font-bold">4. Third-Party Services</h2>
        <p className="mt-3 leading-8 text-slate-600">
          Our website may rely on third-party hosting, analytics, security,
          or advertising services. Those services may process information
          as described in their own privacy policies.
        </p>

        <h2 className="mt-8 text-2xl font-bold">5. Your Choices</h2>
        <p className="mt-3 leading-8 text-slate-600">
          You can manage cookies through your browser settings. Where
          required by applicable law, we will provide appropriate choices
          or consent mechanisms for non-essential cookies and advertising
          technologies.
        </p>

        <h2 className="mt-8 text-2xl font-bold">6. Children's Privacy</h2>
        <p className="mt-3 leading-8 text-slate-600">
          Our tools are intended for general use. We do not knowingly
          collect personal information directly from children through
          these tools.
        </p>

        <h2 className="mt-8 text-2xl font-bold">7. Policy Updates</h2>
        <p className="mt-3 leading-8 text-slate-600">
          We may update this policy when our website, services, or legal
          obligations change. Updates will be published on this page.
        </p>

        <h2 className="mt-8 text-2xl font-bold">8. Contact Us</h2>
        <p className="mt-3 leading-8 text-slate-600">
          If you have questions about this policy, please contact us
          through our <a href="/contact" className="text-violet-700 underline">Contact page</a>.
        </p>
      </article>
    </main>
  );
}
