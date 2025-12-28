import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function LanguageNav() {
  const { language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/95 to-black/80 backdrop-blur-sm border-b border-white/10 h-14 transition-transform duration-300",
      !isVisible ? "-translate-y-full" : "translate-y-0"
    )}>
      <div className="container mx-auto px-4 h-full flex justify-center items-center">
        <div className="flex gap-2">
          {(['en', 'fr', 'es'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 uppercase tracking-wide",
                language === lang
                  ? "bg-primary text-black shadow-lg shadow-primary/50"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
              data-testid={`button-language-${lang}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
