import { useState } from "react";
import { useMenu } from "@/hooks/use-restaurant";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function Menu() {
  const { language } = useLanguage();
  const { data: menuItems, isLoading, isError } = useMenu();
  const [activeCategory, setActiveCategory] = useState("Starters");
  
  const CATEGORIES_MAP = [
    { key: "Starters", label: t('starters', language) },
    { key: "Mains", label: t('mains', language) },
    { key: "Desserts", label: t('desserts', language) },
    { key: "Drinks", label: t('drinks', language) }
  ];

  const filteredItems = menuItems?.filter(item => item.category === activeCategory) || [];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm block mb-4">{t('gastronomy', language)}</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">{t('ourMenu', language)}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('menuDescription', language)}
          </p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4 border-b border-white/10 pb-8">
          {CATEGORIES_MAP.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-lg md:text-xl font-display px-6 py-2 transition-all duration-300 relative ${
                activeCategory === cat.key ? "text-primary" : "text-white/60 hover:text-white"
              }`}
            >
              {cat.label}
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-[-33px] left-0 right-0 h-[1px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-4 max-w-6xl">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : isError ? (
          <div className="text-center text-red-400 py-10">
            Failed to load menu. Please try again later.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const priceInDinars = (item.price / 100).toFixed(2);
                return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group flex gap-6 items-start"
                >
                  {/* Image Thumbnail */}
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-sm bg-zinc-900">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-2 border-dashed border-spacing-4">
                      <h3 className="text-xl font-display font-semibold text-white group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-primary font-mono text-lg ml-4">
                        ${(item.price / 100).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredItems.length === 0 && !isLoading && (
          <div className="text-center py-20 text-muted-foreground">
            No items found in this category.
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 mt-20 text-center">
        <p className="text-sm text-muted-foreground mb-8">
          Please inform your server of any food allergies or dietary restrictions. 
          <br/>Prices are inclusive of service charge and tax.
        </p>
        <Button 
          className="bg-white text-black hover:bg-white/90 rounded-none px-8 py-6 font-semibold"
          onClick={() => window.location.href = '/reservations'}
        >
          Make a Reservation
        </Button>
      </div>
    </div>
  );
}
