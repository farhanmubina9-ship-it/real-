import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trash2, Calendar, Phone, MapPin, FileText } from 'lucide-react';
import { useKhatibSchedules } from '@/hooks/useKhatibSchedules';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

interface ScheduleData {
  id: string;
  schedule_date: string;
  nama_lengkap: string;
  nip: string;
  no_hp: string;
  tempat_tugas: string;
  saran: string | null;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { deleteKhatib, isDeleting, getAllSchedules } = useKhatibSchedules();
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadSchedules = async () => {
    try {
      setIsLoading(true);
      const data = await getAllSchedules();
      setSchedules(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal memuat data jadwal',
        variant: 'destructive',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const handleDelete = async (scheduleDate: string, khatibName: string) => {
    if (!window.confirm(`Hapus jadwal khutbah ${khatibName}? Aksi ini tidak bisa dibatalkan.`)) {
      return;
    }

    try {
      await deleteKhatib(scheduleDate);
      setSchedules(schedules.filter(s => s.schedule_date !== scheduleDate));
      toast({
        title: 'Berhasil',
        description: `Jadwal khutbah ${khatibName} telah dihapus`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal menghapus jadwal khutbah',
        variant: 'destructive',
      });
      console.error(error);
    }
  };

  const formatDateDisplay = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return format(date, "EEEE, d MMMM yyyy", { locale: id });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin - Jadwal Khatib Jum'at 2026</title>
      </Helmet>

      <main className="min-h-screen bg-background p-3 sm:p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
              Dashboard Admin
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Kelola jadwal khutbah Jumat 2026
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-muted-foreground">Memuat data...</p>
            </div>
          ) : schedules.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <p className="text-center text-muted-foreground">
                  Belum ada data jadwal khutbah yang diisi
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                Total jadwal terisi: {schedules.length}
              </div>

              <div className="grid gap-3 sm:gap-4">
                {schedules.map((schedule) => (
                  <Card key={schedule.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span className="truncate">Tanggal</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">
                            {formatDateDisplay(schedule.schedule_date)}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="truncate">Tempat Tugas</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                            {schedule.tempat_tugas}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span className="truncate">Kontak</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                            {schedule.no_hp}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-t pt-3 sm:pt-4">
                        <div>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-1">Nama Lengkap</p>
                          <p className="font-medium text-foreground text-sm sm:text-base break-words">
                            {schedule.nama_lengkap}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-1">NIP</p>
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">
                            {schedule.nip}
                          </p>
                        </div>
                      </div>

                      {schedule.saran && (
                        <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-t pt-3 sm:pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <FileText className="w-4 h-4 shrink-0" />
                            Saran
                          </div>
                          <p className="text-foreground text-xs sm:text-sm italic break-words">
                            "{schedule.saran}"
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Diisi pada: {format(parseISO(schedule.created_at), 'dd/MM/yyyy HH:mm', { locale: id })}
                        </p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(schedule.schedule_date, schedule.nama_lengkap)}
                          disabled={isDeleting}
                          className="flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Hapus</span>
                          <span className="sm:hidden">Hapus</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Admin;
