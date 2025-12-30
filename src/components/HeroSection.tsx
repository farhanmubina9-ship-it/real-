import { Building2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative hero-gradient islamic-pattern overflow-hidden">
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 py-10 sm:py-12 md:py-16 lg:py-24 text-center">
        <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="font-display text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground mb-2 sm:mb-3 md:mb-4 animate-fade-in leading-tight px-2">
          Jadwal Khatib Jum'at 2026
        </h1>
        <p className="text-primary-foreground/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-up px-3">
          Masjid Kampus 2 UIN Sunan Gunung Djati Bandung
        </p>
        <p className="text-primary-foreground/70 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 md:mt-4 max-w-xl mx-auto animate-slide-up px-3">
          Klik pada tanggal yang tersedia untuk mendaftarkan diri sebagai Khatib Jum'at
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
