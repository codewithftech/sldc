import Link from "next/link";

const features = [
  {
    title: "App Router",
    description:
      "Built with the latest Next.js App Router for modern server and client components.",
    icon: "⚡",
  },
  {
    title: "Tailwind CSS",
    description:
      "Fully configured with Tailwind CSS v4, custom theme colors, and utility classes.",
    icon: "🎨",
  },
  {
    title: "TypeScript",
    description:
      "Type-safe development with full TypeScript support out of the box.",
    icon: "📘",
  },
  {
    title: "Component Structure",
    description:
      "Clean separation with reusable Header and Footer components.",
    icon: "🧩",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300">
              Next.js 16 + Tailwind CSS v4
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
              Welcome to{" "}
              <span className="text-primary-600 dark:text-primary-400">
                NextSample
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              A modern sample project with separate Header and Footer components,
              a beautiful home page, and full Tailwind CSS configuration.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#features"
                className="rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                Explore Features
              </Link>
              <Link
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-title">Features</h2>
            <p className="section-subtitle">
              Everything you need to start building modern web applications.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <span className="text-3xl" role="img" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="border-t border-zinc-200 bg-zinc-50 py-20 sm:py-28 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="section-title">About This Project</h2>
            <p className="section-subtitle">
              This sample demonstrates a standard Next.js project structure with
              modular components. The layout wraps every page with a shared Header
              and Footer, while the home page contains the main content.
            </p>
            <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 text-left font-mono text-sm dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-zinc-500 dark:text-zinc-500">Project structure:</p>
              <pre className="mt-2 overflow-x-auto text-zinc-700 dark:text-zinc-300">
{`src/
├── app/
│   ├── layout.tsx    # Root layout (Header + Footer)
│   ├── page.tsx      # Home page
│   └── globals.css   # Tailwind + custom CSS
├── components/
│   ├── Header.tsx    # Site header
│   └── Footer.tsx    # Site footer
└── tailwind.config.ts # Tailwind configuration`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-subtitle">
              Ready to start building? Run the development server and open your
              browser.
            </p>
            <div className="mt-8 rounded-xl bg-zinc-900 p-6 text-left dark:bg-zinc-800">
              <code className="font-mono text-sm text-green-400">
                npm run dev
              </code>
              <p className="mt-2 font-mono text-xs text-zinc-400">
                Then open http://localhost:3000
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
