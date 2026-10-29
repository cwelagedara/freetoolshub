
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <a
          href="/"
          className="font-semibold text-violet-700 hover:underline"
        >
          ← Back to FreeTools Hub
        </a>

        <h1 className="mt-8 text-4xl font-extrabold">About Us</h1>

        <p className="mt-6 leading-8 text-slate-600">
          Welcome to FreeTools Hub, a collection of simple online tools
          designed to make everyday tasks easier.
        </p>

        <h2 className="mt-8 text-2xl font-bold">Our Mission</h2>
        <p className="mt-3 leading-8 text-slate-600">
          Our goal is to provide accessible and easy-to-use tools for
          students, developers, professionals, and everyone who needs
          quick online solutions.
        </p>

        <h2 className="mt-8 text-2xl font-bold">What We Offer</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-slate-600">
          <li>Word and character counting</li>
          <li>Percentage calculations</li>
          <li>Age calculations</li>
          <li>JSON formatting and validation</li>
        </ul>

        <h2 className="mt-8 text-2xl font-bold">Contact</h2>
        <p className="mt-3 leading-8 text-slate-600">
          If you have questions, feedback, or suggestions, please visit
          our Contact page.
        </p>
      </div>
    </main>
  );
}
