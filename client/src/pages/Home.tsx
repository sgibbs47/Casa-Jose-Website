import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";
import LightRays from "@/components/LightRays";

export default function Home() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Restaurant interior - moody lighting */}
          <img 
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/93/casa-jose.jpg?w=1200" 
            alt="Casa Jose Restaurant" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
          
          {/* Light Rays Effect */}
          <LightRays
            raysOrigin="top-center"
            raysColor="#D4AF37"
            raysSpeed={1.2}
            lightSpread={0.8}
            rayLength={1.5}
            pulsating={true}
            fadeDistance={0.8}
            saturation={0.9}
            followMouse={true}
            mouseInfluence={0.08}
            noiseAmount={0.05}
            distortion={0.02}
            className="absolute inset-0 z-20"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 text-center container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm md:text-base mb-8 block">
              {t('experience', language)}
            </span>
            
            {/* Decorative Line Above */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-12 md:w-20 h-1 bg-primary" />
              <div className="text-lg md:text-2xl text-primary font-medium tracking-widest uppercase">Casa</div>
              <div className="w-12 md:w-20 h-1 bg-primary" />
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-primary mb-8 leading-none uppercase" style={{ fontFamily: "'Times New Roman', serif", letterSpacing: '0.05em' }}>
              Jose<span className="text-primary">.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              {t('heroSubtitle', language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservations">
                <Button size="lg" className="bg-primary text-black hover:bg-primary/90 rounded-none px-8 py-6 text-base font-semibold transition-all hover:translate-y-[-2px]">
                  {t('bookTable', language)}
                </Button>
              </Link>
              <Link href="/menu">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none px-8 py-6 text-base font-semibold backdrop-blur-sm transition-all hover:translate-y-[-2px]">
                  {t('viewMenu', language)}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-primary font-medium tracking-widest uppercase text-sm">{t('ourStory', language)}</span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
                  {t('traditionMeetsQuality', language)}
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('aboutText1', language)}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('aboutText2', language)}
              </p>
              <div className="pt-4 text-primary font-display italic">
                {t('rating', language)}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 border-2 border-primary/20 p-4">
                {/* Restaurant seafood dish */}
                <img 
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/61/casa-jose.jpg" 
                  alt="Casa Jose Seafood" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full z-0 blur-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full z-0 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Preview */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium tracking-widest uppercase text-sm">{t('specialties', language)}</span>
            <h2 className="text-4xl font-display font-bold text-white mt-4 mb-6">{t('signatureDishes', language)}</h2>
            <p className="text-muted-foreground">{t('curatedSelections', language)}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('freshSeafoodPlatter', language),
                desc: t('freshSeafoodDesc', language),
                img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/2f/b0/huevos-con-chorizo-buenisimos.jpg"
              },
              {
                title: t('grilledFish', language),
                desc: t('grilledFishDesc', language),
                img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/6e/0f/61/casa-jose.jpg"
              },
              {
                title: t('mediterraneanSpecialties', language),
                desc: t('mediterraneanDesc', language),
                img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/0e/be/d7/casa-jose-cerca-del-puerto.jpg"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden mb-6 relative aspect-[4/5]">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/menu">
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button variant="link" className="text-primary hover:text-primary/80 text-lg p-0 h-auto">
                {t('exploreMenu', language)} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Info / Map Section */}
      <section className="py-24 bg-black relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
            <div className="p-12 md:p-16 flex flex-col justify-center space-y-8 bg-zinc-900/50 backdrop-blur-sm">
              <h2 className="text-3xl font-display font-bold text-white">Visit Us</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                    <p className="text-muted-foreground">26 Bis Bd Felix Houphouet Boigny<br />Casablanca 12000, Morocco</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Hours</h4>
                    <p className="text-muted-foreground">Every Day: 12:00 PM - 11:00 PM</p>
                  </div>
                </div>
              </div>

              <Link href="/contact">
                <Button variant="outline" className="w-fit border-white/20 text-white hover:border-primary hover:text-primary rounded-none mt-4">
                  Get Directions
                </Button>
              </Link>
            </div>
            
            <div className="h-[400px] lg:h-auto w-full grayscale invert-[0.9] contrast-[1.1]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00301588481974!3d40.7240536793306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259885442a8b9%3A0xc47b973e659c07e!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
