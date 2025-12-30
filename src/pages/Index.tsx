import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import ScheduleList from '@/components/ScheduleList';
import CalendarView from '@/components/CalendarView';
import KhatibFormDialog from '@/components/KhatibFormDialog';
import Footer from '@/components/Footer';
import { KhatibSchedule, KhatibData } from '@/lib/schedule-data';
import { useKhatibSchedules } from '@/hooks/useKhatibSchedules';
import { Button } from '@/components/ui/button';
import { Calendar, List } from 'lucide-react';

const Index = () => {
  const { schedules, isLoading, registerKhatib } = useKhatibSchedules();
  const [selectedSchedule, setSelectedSchedule] = useState<KhatibSchedule | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

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
        <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-20 flex gap-2">
          <div className="flex bg-card border rounded-md shadow-lg overflow-hidden">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none px-2.5 sm:px-3"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline ml-1.5">List</span>
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="rounded-none px-2.5 sm:px-3"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline ml-1.5">Kalender</span>
            </Button>
          </div>
          <Button
            onClick={() => window.location.href = '/admin'}
            size="sm"
            className="shadow-lg px-2.5 sm:px-3"
          >
            Admin
          </Button>
        </div>
        <HeroSection />
        {viewMode === 'list' ? (
          <ScheduleList 
            schedules={schedules} 
            onSelectSchedule={handleSelectSchedule}
            isLoading={isLoading}
          />
        ) : (
          <CalendarView schedules={schedules} />
        )}
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
