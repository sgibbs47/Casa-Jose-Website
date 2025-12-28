import { motion } from "framer-motion";
import { useState } from "react";

const CATEGORIES = ["All", "Dishes", "Interior", "Cocktails"];

const IMAGES = [
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/93/casa-jose.jpg?w=900",
    alt: "Casa Jose Seafood",
    span: "col-span-1 row-span-1",
    category: "Dishes"
  },
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0c/1b/casa-jose.jpg?w=900",
    alt: "Restaurant Interior",
    span: "col-span-1 md:col-span-2 row-span-2",
    category: "Interior"
  },
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/61/casa-jose.jpg?w=900",
    alt: "Mediterranean Specialties",
    span: "col-span-1 row-span-1",
    category: "Dishes"
  },
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/2f/b0/huevos-con-chorizo-buenisimos.jpg?w=900",
    alt: "Casa Jose Breakfast",
    span: "col-span-1 row-span-1",
    category: "Dishes"
  },
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0e/be/d7/casa-jose-cerca-del-puerto.jpg?w=900",
    alt: "Casa Jose by the Port",
    span: "col-span-1 row-span-1",
    category: "Interior"
  },
  {
    src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/93/casa-jose.jpg?w=900",
    alt: "Fresh Seafood Platter",
    span: "col-span-1 md:col-span-2 row-span-1",
    category: "Dishes"
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const filteredImages = activeCategory === "All" 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    
    setRotation({
      x: dy * 0.5,
      y: dx * 0.5
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setRotation({ x: 0, y: 0 });
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  const currentImage = filteredImages[currentIndex];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm block mb-4">Visual Journey</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into the atmosphere, the culinary art, and the moments we create.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Card Stack */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Main Card Display */}
          <motion.div
            className="w-full md:w-96 h-96 md:h-[500px]"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              transform: isDragging 
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                : 'rotateX(0deg) rotateY(0deg)',
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <div className="stack-container h-full">
              {filteredImages.map((img, index) => (
                <motion.div
                  key={index}
                  className={`${isDragging || index === currentIndex ? 'card-rotate' : 'card-rotate-disabled'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    scale: index === currentIndex ? 1 : 0.8,
                    zIndex: index === currentIndex ? 10 : 0,
                    y: (index - currentIndex) * 20
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="card">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="card-image"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex flex-col gap-4 justify-center md:h-[500px]">
            <button
              onClick={prevImage}
              className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-all"
            >
              ← Previous
            </button>
            <div className="text-center">
              <p className="text-white text-lg font-semibold">{currentImage?.alt}</p>
              <p className="text-primary font-medium mt-2">{currentIndex + 1} / {filteredImages.length}</p>
            </div>
            <button
              onClick={nextImage}
              className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/90 transition-all"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-center text-muted-foreground mt-12 text-sm">
          Drag the card to rotate it • Click Previous/Next to navigate
        </p>
      </div>
    </div>
  );
}
