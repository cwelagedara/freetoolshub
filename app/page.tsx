
'use client';

import { useState } from 'react';

type Tool = {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  link?: string;
};

const tools: Tool[] = [
  {
    id: 'word',
    name: 'Word Counter',
    description: 'Count words, characters, and sentences.',
    icon: '📝',
    category: 'Text Tools',
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages quickly and easily.',
    icon: '🧮',
    category: 'Calculators',
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate your age from your date of birth.',
    icon: '🎂',
    category: 'Calculators',
  },
  {
    id: 'json',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data.',
    icon: '{ }',
    category: 'Developer Tools',
  },
  {
    id: 'image-resizer',
    name: 'Profile Picture Resizer',
    description:
      'Resize photos for profile pictures and download them for free.',
    icon: '🖼️',
    category: 'Image Tools',
    link: '/profile-picture-resizer',
  },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState('');
  const [text, setText] = useState('');
  const [number, setNumber] = useState('100');
  const [percent, setPercent] = useState('20');
  const [dob, setDob] = useState('');
  const [json, setJson] = useState(
    '{"name":"FreeTools Hub","free":true}'
  );
  const [jsonResult, setJsonResult] = useState('');
  const [jsonError, setJsonError] = useState('');

  const words = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const characters = text.length;

  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter((s) => s.trim()).length
    : 0;

  function calculateAge() {
    if (!dob) return 'Please select your birth date.';

    const birth = new Date(`${dob}T00:00:00`);
    const today = new Date();

    if (birth > today) {
      return 'Birth date cannot be in the future.';
    }

    let age = today.getFullYear() - birth.getFullYear();

    const beforeBirthday =
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate());

    if (beforeBirthday) age--;

    return `You are ${age} years old.`;
  }

  function formatJson() {
    try {
      const parsed = JSON.parse(json);
      setJsonResult(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch {
      setJsonResult('');
      setJsonError(
        'Invalid JSON. Please check your brackets, quotes, and commas.'
      );
    }
  }

  function selectTool(id: string) {
    setActiveTool(id);
    setJsonResult('');
    setJsonError('');
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
          <a href="/" className="text-xl font-extrabold tracking-tight">
            <span className="text-violet-600">FreeTools</span> Hub
          </a>

          <a
            href="#tools"
            className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            Explore Tools
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-100 via-white to-indigo-100 px-5 py-20 text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-violet-700">
          Simple tools. Zero cost.
        </p>

        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          Free online tools to make life easier
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Calculate, write, format, and resize images with simple
          online tools. No installation required.
        </p>

        <a
          href="#tools"
          className="mt-8 inline-block rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg hover:bg-violet-700"
        >
          Get Started →
        </a>
      </section>

      {/* Tools */}
      <section
        id="tools"
        className="mx-auto max-w-6xl px-5 py-16"
      >
        <div className="mb-9">
          <h2 className="text-3xl font-bold">
            Explore Our Free Tools
          </h2>

          <p className="mt-2 text-slate-600">
            Choose a tool and start using it instantly.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const cardContent = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-xl font-bold text-violet-700">
                  {tool.icon}
                </span>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-violet-600">
                  {tool.category}
                </p>

                <h3 className="mt-2 text-lg font-bold">
                  {tool.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tool.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-violet-700">
                  Open tool →
                </span>
              </>
            );

            const cardClass =
              'block rounded-2xl border border-slate-200 bg-white p-6 text-left transition hover:-translate-y-1 hover:border-violet-400 hover:shadow-lg';

            // The image resizer opens its own dedicated page.
            if (tool.link) {
              return (
                <a
                  key={tool.id}
                  href={tool.link}
                  className={cardClass}
                >
                  {cardContent}
                </a>
              );
            }

            // Existing tools open their interactive panels.
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => selectTool(tool.id)}
                className={`${cardClass} w-full ${
                  activeTool === tool.id
                    ? 'border-violet-500 ring-2 ring-violet-100'
                    : ''
                }`}
              >
                {cardContent}
              </button>
            );
          })}
        </div>

        {/* Active tool panel */}
        {activeTool && (
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-bold">
                {tools.find((tool) => tool.id === activeTool)?.name}
              </h2>

              <button
                type="button"
                onClick={() => setActiveTool('')}
                className="text-sm font-semibold text-slate-500 hover:text-violet-700"
              >
                Close ✕
              </button>
            </div>

            {/* Word Counter */}
            {activeTool === 'word' && (
              <div>
                <label
                  htmlFor="word-text"
                  className="mb-2 block text-sm font-semibold"
                >
                  Enter or paste your text
                </label>

                <textarea
                  id="word-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  className="min-h-48 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-violet-50 p-4 text-center">
                    <p className="text-2xl font-bold text-violet-700">
                      {words}
                    </p>
                    <p className="text-sm text-slate-600">Words</p>
                  </div>

                  <div className="rounded-xl bg-violet-50 p-4 text-center">
                    <p className="text-2xl font-bold text-violet-700">
                      {characters}
                    </p>
                    <p className="text-sm text-slate-600">
                      Characters
                    </p>
                  </div>

                  <div className="rounded-xl bg-violet-50 p-4 text-center">
                    <p className="text-2xl font-bold text-violet-700">
                      {sentences}
                    </p>
                    <p className="text-sm text-slate-600">
                      Sentences
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Percentage Calculator */}
            {activeTool === 'percentage' && (
              <div className="max-w-xl space-y-4">
                <label
                  htmlFor="number"
                  className="block text-sm font-semibold"
                >
                  Enter a number
                </label>

                <input
                  id="number"
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-violet-500"
                />

                <label
                  htmlFor="percent"
                  className="block text-sm font-semibold"
                >
                  Percentage (%)
                </label>

                <input
                  id="percent"
                  type="number"
                  value={percent}
                  onChange={(e) => setPercent(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-violet-500"
                />

                <div className="rounded-xl bg-violet-50 p-5">
                  <p className="text-sm text-slate-600">
                    {percent || '0'}% of {number || '0'} is
                  </p>

                  <p className="mt-1 text-3xl font-extrabold text-violet-700">
                    {(
                      ((Number(number) || 0) *
                        (Number(percent) || 0)) /
                      100
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Age Calculator */}
            {activeTool === 'age' && (
              <div className="max-w-xl">
                <label
                  htmlFor="dob"
                  className="mb-2 block text-sm font-semibold"
                >
                  Select your date of birth
                </label>

                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-violet-500"
                />

                <div className="mt-5 rounded-xl bg-violet-50 p-5">
                  <p className="text-lg font-bold text-violet-700">
                    {calculateAge()}
                  </p>
                </div>
              </div>
            )}

            {/* JSON Formatter */}
            {activeTool === 'json' && (
              <div>
                <label
                  htmlFor="json-input"
                  className="mb-2 block text-sm font-semibold"
                >
                  Paste your JSON data
                </label>

                <textarea
                  id="json-input"
                  value={json}
                  onChange={(e) => setJson(e.target.value)}
                  className="min-h-40 w-full rounded-xl border border-slate-300 p-4 font-mono text-sm outline-none focus:border-violet-500"
                />

                <button
                  type="button"
                  onClick={formatJson}
                  className="mt-4 rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700"
                >
                  Format JSON
                </button>

                {jsonError && (
                  <p className="mt-4 text-sm text-red-600">
                    {jsonError}
                  </p>
                )}

                {jsonResult && (
                  <div className="mt-5">
                    <p className="mb-2 font-semibold">
                      Formatted result
                    </p>

                    <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-green-300">
                      {jsonResult}
                    </pre>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(jsonResult)
                          .catch(() => {
                            setJsonError(
                              'Unable to copy automatically. Please select and copy the result.'
                            );
                          });
                      }}
                      className="mt-3 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                      Copy result
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Why use FreeTools Hub? */}
      <section className="border-y border-slate-200 bg-white px-5 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold">
            Why use FreeTools Hub?
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-3xl">🆓</p>
              <h3 className="mt-3 font-bold">Always Free</h3>
              <p className="mt-2 text-sm text-slate-600">
                Use our tools without paying.
              </p>
            </div>

            <div>
              <p className="text-3xl">⚡</p>
              <h3 className="mt-3 font-bold">Quick and Simple</h3>
              <p className="mt-2 text-sm text-slate-600">
                Get results in just a few clicks.
              </p>
            </div>

            <div>
              <p className="text-3xl">📱</p>
              <h3 className="mt-3 font-bold">Mobile Friendly</h3>
              <p className="mt-2 text-sm text-slate-600">
                Works on phones and computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
        <p>
          © 2026 FreeTools Hub. Built to make everyday tasks easier.
        </p>

        <nav className="mt-4 flex flex-wrap justify-center gap-5">
          <a href="/about" className="hover:text-violet-700">
            About Us
          </a>

          <a href="/contact" className="hover:text-violet-700">
            Contact Us
          </a>

          <a href="/privacy" className="hover:text-violet-700">
            Privacy Policy
          </a>

          <a href="/terms" className="hover:text-violet-700">
            Terms of Use
          </a>
        </nav>
      </footer>
    </main>
  );
}
