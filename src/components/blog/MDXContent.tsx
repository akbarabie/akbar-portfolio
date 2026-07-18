// src/components/blog/MDXContent.tsx
import { run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  /** Compiled MDX function-body string, hasil `s.mdx()` di Velite. */
  code: string;
}

/**
 * Async Server Component: `run()` meng-eval compiled MDX code jadi module
 * dengan default export berupa komponen React. Ini jalan sepenuhnya di
 * server (Node runtime) — tidak butuh client JS buat render artikel,
 * konsisten dengan prinsip "Server Component by default" project ini.
 */
export async function MDXContent({ code }: MDXContentProps) {
  const { default: Content } = await run(code, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return (
    <div className="mdx-content">
      <Content components={mdxComponents} />
    </div>
  );
}
