import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import ScheduleList from '@/components/ScheduleList';
import KhatibFormDialog from '@/components/KhatibFormDialog';
import Footer from '@/components/Footer';
import { KhatibSchedule, KhatibData } from '@/lib/schedule-data';
import { useKhatibSchedules } from '@/hooks/useKhatibSchedules';

const Index = () => {
  const { schedules, isLoading, registerKhatib } = useKhatibSchedules();
  const [selectedSchedule, setSelectedSchedule] = useState<KhatibSchedule | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectSchedule = (schedule: KhatibSchedule) => {
    if (schedule.khatib) return;
    setSelectedSchedule(schedule);
    setDialogOpen(true);
  };

  const handleSubmitKhatib = async (schedule: KhatibSchedule, data: KhatibData) => {
    await registerKhatib({ schedule, data });
  };

  return (
    <>
      <Helmet>
        <title>Jadwal Khatib Jum'at 2026 - Masjid Kampus 2 UIN SGD Bandung</title>
        <meta 
          name="description" 
          content="Sistem penjadwalan Khatib Jum'at untuk tahun 2026 di Masjid Kampus 2 UIN Sunan Gunung Djati Bandung. Daftar sebagai Khatib sekarang." 
        />
      </Helmet>

      <main className="min-h-screen flex flex-col bg-background relative animate-fade-in">
        <button 
          onClick={() => window.location.href = '/admin'}
          className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm hover:bg-primary/90 transition-colors animate-fade-in"
          style={{ animationDelay: '500ms' }}
        >
          Admin
        </button>
        <HeroSection />
        <ScheduleList 
          schedules={schedules} 
          onSelectSchedule={handleSelectSchedule}
          isLoading={isLoading}
        />
        <KhatibFormDialog
          schedule={selectedSchedule}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleSubmitKhatib}
        />
        <Footer />
      </main>
    </>
  );
};

export default Index;
