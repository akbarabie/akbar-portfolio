// src/components/blog/mdx-components.tsx
import { Link } from "@/i18n/navigation";
import type { AnchorHTMLAttributes, ComponentPropsWithoutRef } from "react";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

function MDXLink({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const className = "text-accent underline underline-offset-4 hover:no-underline";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      />
    );
  }

  return <Link href={href} className={className} {...props} />;
}

/**
 * Styling `code` di sini HANYA untuk inline code (`` `like this` ``).
 * Code block (``` fenced ```) sudah di-highlight Shiki di build time
 * (lihat velite.config.ts) dan datang dengan inline style-nya sendiri —
 * reset-nya ada di globals.css lewat selector `.mdx-content pre code`,
 * biar gak dobel-styling sama komponen `code` di bawah ini.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-10 mb-4 scroll-mt-24 text-2xl font-semibold text-foreground" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold text-foreground" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-5 leading-relaxed text-text-muted" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-5 ml-6 list-disc space-y-2 text-text-muted" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-5 ml-6 list-decimal space-y-2 text-text-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mb-5 border-l-2 border-border pl-4 italic text-text-muted" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="mb-6 overflow-x-auto rounded-lg border border-border p-4 text-sm"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-card px-1.5 py-0.5 text-sm text-foreground" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr className="my-8 border-border" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  a: MDXLink,
};
