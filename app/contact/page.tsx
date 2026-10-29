
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <a
          href="/"
          className="font-semibold text-violet-700 hover:underline"
        >
          ← Back to FreeTools Hub
        </a>

        <h1 className="mt-8 text-4xl font-extrabold">Contact Us</h1>

        <p className="mt-6 leading-8 text-slate-600">
          Have a question, found a problem, or want to suggest a new tool?
          We welcome your feedback.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Get in Touch</h2>

        <p className="mt-3 leading-8 text-slate-600">
          Email us with your questions, suggestions, or reports about
          problems with our tools.
        </p>

        <p className="mt-4">
          <span className="font-semibold">Email: </span>
          <a
            href="mailto:YOUR_EMAIL@example.com"
            className="text-violet-700 underline"
          >
            YOUR_EMAIL@example.com
          </a>
        </p>

        <p className="mt-8 text-sm leading-6 text-slate-500">
          Please replace the example email address with an email address
          where visitors can actually contact you.
        </p>
      </div>
    </main>
  );
}
