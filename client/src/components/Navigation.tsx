import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const navLinks = [
    { href: "/", label: t('home', language) },
    { href: "/menu", label: t('menu', language) },
    { href: "/reservations", label: t('reservations', language) },
    { href: "/gallery", label: t('gallery', language) },
    { href: "/contact", label: t('contact', language) },
  ];

  return (
    <nav className="pill-nav-container">
      <div className="pill-nav">
        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
          style={{ "--base": "#000", "--pill-bg": "#fff" } as React.CSSProperties}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mobile-menu-popover"
          style={{
            "--base": "#1a1a1a",
            "--pill-bg": "#fff",
            "--pill-text": "#000",
            "--hover-text": "#fff",
            opacity: 1,
            visibility: "visible"
          } as React.CSSProperties}
        >
          <ul className="mobile-menu-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className="mobile-menu-link"
                  >
                    {link.label}
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reservations">
                <div
                  onClick={() => setIsOpen(false)}
                  className="mobile-menu-link"
                >
                  {t('bookTable', language)}
                </div>
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
