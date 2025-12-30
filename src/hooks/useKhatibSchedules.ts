import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateFridays2026, KhatibSchedule, KhatibData } from '@/lib/schedule-data';
import { format } from 'date-fns';

interface LocalKhatibSchedule {
  schedule_date: string;
  nama_lengkap: string;
  nip: string;
  no_hp: string;
  tempat_tugas: string;
  saran?: string;
}

const STORAGE_KEY = 'khatib_schedules';

export function useKhatibSchedules() {
  const queryClient = useQueryClient();
  const fridays = generateFridays2026();

  const { data: localSchedules, isLoading, error } = useQuery({
    queryKey: ['khatib-schedules'],
    queryFn: async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    },
  });

  // Merge local fridays with local storage data
  const schedules: KhatibSchedule[] = fridays.map(friday => {
    const localEntry = localSchedules?.find(
      (ls: LocalKhatibSchedule) => ls.schedule_date === format(friday.date, 'yyyy-MM-dd')
    );
    
    if (localEntry) {
      return {
        ...friday,
        khatib: {
          namaLengkap: localEntry.nama_lengkap,
          nip: localEntry.nip,
          noHP: localEntry.no_hp,
          tempatTugas: localEntry.tempat_tugas,
          saran: localEntry.saran,
        },
      };
    }
    
    return friday;
  });

  const registerMutation = useMutation({
    mutationFn: async ({ schedule, data }: { schedule: KhatibSchedule; data: KhatibData }) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const schedules = stored ? JSON.parse(stored) : [];
      
      const newEntry: LocalKhatibSchedule = {
        schedule_date: format(schedule.date, 'yyyy-MM-dd'),
        nama_lengkap: data.namaLengkap,
        nip: data.nip,
        no_hp: data.noHP,
        tempat_tugas: data.tempatTugas,
        saran: data.saran,
      };
      
      schedules.push(newEntry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khatib-schedules'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (scheduleDate: string) => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      
      const schedules = JSON.parse(stored);
      const filtered = schedules.filter((s: LocalKhatibSchedule) => s.schedule_date !== scheduleDate);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['khatib-schedules'] });
    },
  });

  const getAllSchedules = async () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  return {
    schedules,
    isLoading,
    error,
    registerKhatib: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    deleteKhatib: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    getAllSchedules,
  };
}
