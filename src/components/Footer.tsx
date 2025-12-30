import { Building2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-6 sm:py-8 mt-12 sm:mt-16">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-display font-semibold text-base sm:text-lg">Masjid Kampus 2</span>
          </div>
          <p className="text-primary-foreground/80 text-xs sm:text-sm max-w-md">
            UIN Sunan Gunung Djati Bandung
          </p>
          <p className="text-primary-foreground/60 text-xs">
            © 2026 - Jadwal Khatib Jum'at
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
