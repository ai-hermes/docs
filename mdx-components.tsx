import type { MDXComponents } from 'mdx/types';
import React from 'react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u4e00-\u9fff-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const tag = `h${level}`;

  function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text = typeof children === 'string'
      ? children
      : React.Children.toArray(children)
          .map((child) => (typeof child === 'string' ? child : ''))
          .join('');
    const id = slugify(text);

    return React.createElement(tag, { id, ...props }, children);
  }

  Heading.displayName = `Heading${level}`;
  return Heading;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    ...components,
  };
}
