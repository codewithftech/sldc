import Link from "next/link";

const footerLinks = {
  product: [
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ],
  resources: [
    { href: "https://nextjs.org/docs", label: "Next.js Docs" },
    { href: "https://tailwindcss.com/docs", label: "Tailwind Docs" },
    { href: "https://react.dev", label: "React Docs" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold text-primary-600 dark:text-primary-400"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-xs text-white dark:bg-primary-500">
                N
              </span>
              NextSample
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A sample Next.js project with separate Header and Footer components,
              styled with Tailwind CSS.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 transition-colors hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-600 transition-colors hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-8 sm:flex-row dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            &copy; {currentYear} NextSample. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-300"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
