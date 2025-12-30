import { Building2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative hero-gradient islamic-pattern overflow-hidden">
      <div className="hero-overlay absolute inset-0" />
      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-primary-foreground" />
          </div>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2 sm:mb-4 animate-fade-in leading-tight">
          Jadwal Khatib Jum'at 2026
        </h1>
        <p className="text-primary-foreground/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-up px-2">
          Masjid Kampus 2 UIN Sunan Gunung Djati Bandung
        </p>
        <p className="text-primary-foreground/70 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 max-w-xl mx-auto animate-slide-up px-2">
          Klik pada tanggal yang tersedia untuk mendaftarkan diri sebagai Khatib Jum'at
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
