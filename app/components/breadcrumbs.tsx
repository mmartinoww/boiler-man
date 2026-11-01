import Link from "next/link";
import { withTrailingSlash } from "../lib/site";

export type BreadcrumbItem = { name: string; path: string };

/** Visible breadcrumb trail. Must mirror the BreadcrumbList JSON-LD of the same page. */
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Навигационна пътека">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={withTrailingSlash(item.path)}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
