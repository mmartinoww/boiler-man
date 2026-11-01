"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { IconPhone } from "./icons";
import { withTrailingSlash } from "./lib/site";

type SiteHeaderProps = {
  brandName: string;
  phoneHref: string;
  phoneLabel: string;
};

const nav = [
  { href: withTrailingSlash("/uslugi/"), label: "Услуги" },
  { href: withTrailingSlash("/marki/"), label: "Марки" },
  { href: withTrailingSlash("/remont-na-boileri-sofia/"), label: "София" },
  { href: withTrailingSlash("/remont-na-boileri-pazardzhik/"), label: "Пазарджик" },
  { href: withTrailingSlash("/blog/"), label: "Блог" },
  { href: withTrailingSlash("/za-nas/"), label: "За нас" },
  { href: withTrailingSlash("/kontakti/"), label: "Контакти" }
];

function IconMenu() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader({ brandName, phoneHref, phoneLabel }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const homeHref = withTrailingSlash("/");

  const handleBrandClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      closeMenu();
      const onHomePage = pathname === "/" || pathname === "";
      if (!onHomePage) return;

      event.preventDefault();

      if (window.location.hash) {
        window.location.href = homeHref;
        return;
      }

      window.history.replaceState(window.history.state, "", homeHref);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [closeMenu, homeHref, pathname]
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const root = document.documentElement;
    if (!menuOpen) {
      document.body.classList.remove("site-menu-open");
      root.classList.remove("site-menu-open");
      return;
    }
    document.body.classList.add("site-menu-open");
    root.classList.add("site-menu-open");
    return () => {
      document.body.classList.remove("site-menu-open");
      root.classList.remove("site-menu-open");
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1025px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let threshold = 16;

    const updateThreshold = () => {
      const intro = header.closest(".hero-intro") as HTMLElement | null;
      threshold = intro ? Math.max(intro.offsetTop + 12, 12) : 64;
    };

    const onScroll = () => setPinned(window.scrollY > threshold);
    const onResize = () => {
      updateThreshold();
      onScroll();
    };

    updateThreshold();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className={`site-header__backdrop${menuOpen ? " site-header__backdrop--open" : ""}`}
        aria-label="Затвори менюто"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
      <header ref={headerRef} className={`site-header${pinned ? " site-header--pinned" : ""}`}>
        <div className="site-header__cluster">
          <div className="site-header__sheen" aria-hidden="true" />
          <div className="site-header__shell">
            <Link href={homeHref} className="site-header__brand" aria-label={brandName} onClick={handleBrandClick}>
              <img
                className="site-header__logoMark"
                src="/identity/BOILER-MAN-LOGO-IMG.svg"
                alt=""
                width="48"
                height="44"
              />
              <img
                className="site-header__logoText"
                src="/identity/BOILER-MAN-LOGO-TEXT.svg"
                alt=""
                width="156"
                height="30"
              />
            </Link>

            <nav className="site-header__nav site-header__nav--desktop" aria-label="Основна навигация">
              <ul className="site-header__navList">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-header__navLink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="site-header__menuToggle"
              aria-expanded={menuOpen}
              aria-controls={panelId}
              aria-label={menuOpen ? "Затвори менюто" : "Отвори менюто"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>

            <a href={phoneHref} className="site-header__cta" aria-label={`Обадете се на ${phoneLabel}`}>
              <IconPhone size={18} />
              {phoneLabel}
            </a>
          </div>

          <div
            id={panelId}
            className={`site-header__mobilePanel${menuOpen ? " site-header__mobilePanel--open" : ""}`}
            role="region"
            aria-label="Мобилна навигация"
            aria-hidden={!menuOpen}
          >
            <nav aria-label="Основна навигация">
              <ul className="site-header__mobileNavList">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="site-header__mobileNavLink" onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a href={phoneHref} className="site-header__mobileCta" onClick={closeMenu} aria-label={`Обадете се на ${phoneLabel}`}>
              <IconPhone size={18} />
              {phoneLabel}
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
