import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/translations";

export default function Contact() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-widest uppercase text-sm block mb-4">{t('getInTouch', language)}</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">{t('contact', language)}</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">{t('information', language)}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-zinc-900 p-3 rounded-full group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{t('location', language)}</h4>
                    <p className="text-muted-foreground">{t('casablancaAddress', language)}<br />{t('addressCity', language)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-zinc-900 p-3 rounded-full group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{t('phone', language)}</h4>
                    <p className="text-muted-foreground">{t('phoneNumber', language)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-zinc-900 p-3 rounded-full group-hover:bg-primary group-hover:text-black transition-colors text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{t('email', language)}</h4>
                    <p className="text-muted-foreground">{t('emailAddress', language)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-6">{t('openingHours', language)}</h3>
              <div className="bg-zinc-900/50 border border-white/5 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">{t('everyDay', language)}</span>
                    <span className="text-muted-foreground">{t('hoursTime', language)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground pt-2 border-t border-white/5 mt-4">
                    {t('openForService', language)}<br/>
                    {t('acceptsCards', language)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-full min-h-[500px] w-full relative"
          >
            <div className="absolute inset-0 border border-white/10 grayscale invert-[0.9] contrast-[1.1]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.5932447836284!2d-7.615408!3d33.597874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7c8e5d8e5d8e5d%3A0x0!2sCasa%20Jose%20Port%20Casa!5e0!3m2!1sen!2s!4v1234567890" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
