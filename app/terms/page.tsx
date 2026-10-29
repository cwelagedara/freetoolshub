
export const metadata = {
  title: "Terms of Use",
  description: "Read the terms for using FreeTools Hub online tools.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16 text-slate-900">
      <article className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <a href="/" className="font-semibold text-violet-700 hover:underline">
          ← Back to FreeTools Hub
        </a>

        <h1 className="mt-8 text-4xl font-extrabold">Terms of Use</h1>
        <p className="mt-3 text-sm text-slate-500">
          Last updated: October 28, 2026
        </p>

        <p className="mt-6 leading-8 text-slate-600">
          Welcome to FreeTools Hub. By accessing or using this website,
          you agree to these terms. If you do not agree, please stop
          using the website.
        </p>

        <h2 className="mt-8 text-2xl font-bold">1. Use of Our Tools</h2>
        <p className="mt-3 leading-8 text-slate-600">
          Our tools are provided for general informational and
          productivity purposes. You may use them for lawful personal
          or professional activities. You are responsible for how you
          use the results.
        </p>

        <h2 className="mt-8 text-2xl font-bold">2. Accuracy and Reliability</h2>
        <p className="mt-3 leading-8 text-slate-600">
          We aim to make our tools useful and accurate, but we do not
          guarantee that every result will be complete, correct, or
          suitable for every purpose. Please independently verify
          important calculations and outputs.
        </p>

        <h2 className="mt-8 text-2xl font-bold">3. Acceptable Use</h2>
        <p className="mt-3 leading-8 text-slate-600">
          You must not misuse the website, attempt to disrupt its
          operation, bypass security measures, or use our services for
          unlawful activities. Do not attempt to interfere with other
          visitors' access to the website.
        </p>

        <h2 className="mt-8 text-2xl font-bold">4. Intellectual Property</h2>
        <p className="mt-3 leading-8 text-slate-600">
          The website's original design, branding, and content are
          protected by applicable intellectual property laws. You may
          use the tools as intended, but you may not copy or redistribute
          substantial parts of the website without permission, unless
          permitted by law.
        </p>

        <h2 className="mt-8 text-2xl font-bold">5. Third-Party Services and Ads</h2>
        <p className="mt-3 leading-8 text-slate-600">
          The website may contain advertisements or links to third-party
          websites. We do not control or guarantee the content, policies,
          availability, or services of those third parties. Interact with
          external services at your own discretion.
        </p>

        <h2 className="mt-8 text-2xl font-bold">6. Availability</h2>
        <p className="mt-3 leading-8 text-slate-600">
          We may change, suspend, or discontinue any tool or part of the
          website at any time. We do not guarantee uninterrupted access.
        </p>

        <h2 className="mt-8 text-2xl font-bold">7. Limitation of Liability</h2>
        <p className="mt-3 leading-8 text-slate-600">
          To the extent permitted by applicable law, FreeTools Hub is not
          liable for losses arising from your use of, or inability to
          use, the website or reliance on its results. Nothing in these
          terms excludes liability that cannot legally be excluded.
        </p>

        <h2 className="mt-8 text-2xl font-bold">8. Changes to These Terms</h2>
        <p className="mt-3 leading-8 text-slate-600">
          We may revise these terms as the website develops. Updated
          terms will be posted on this page.
        </p>

        <h2 className="mt-8 text-2xl font-bold">9. Contact Us</h2>
        <p className="mt-3 leading-8 text-slate-600">
          If you have questions about these terms, please use our
          <a href="/contact" className="ml-1 text-violet-700 underline">Contact page</a>.
        </p>
      </article>
    </main>
  );
}
