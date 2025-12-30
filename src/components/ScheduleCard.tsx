import { Calendar, CheckCircle2, User } from 'lucide-react';
import { KhatibSchedule } from '@/lib/schedule-data';
import { cn } from '@/lib/utils';

interface ScheduleCardProps {
  schedule: KhatibSchedule;
  onClick: () => void;
}

const ScheduleCard = ({ schedule, onClick }: ScheduleCardProps) => {
  const isBooked = !!schedule.khatib;

  return (
    <button
      onClick={onClick}
      disabled={isBooked}
      className={cn(
        "w-full bg-card rounded-lg border p-3 sm:p-4 md:p-5 text-left transition-all duration-300",
        "flex flex-col gap-3 sm:gap-4",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "active:scale-[0.98] hover:shadow-lg sm:hover:scale-[1.02]",
        isBooked
          ? "opacity-75 cursor-default"
          : "cursor-pointer hover:border-primary/50 hover:bg-accent/50"
      )}
    >
      <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4 w-full">
        <div className={cn(
          "w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center shrink-0",
          isBooked ? "bg-muted" : "bg-accent"
        )}>
          <Calendar className={cn(
            "w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6",
            isBooked ? "text-muted-foreground" : "text-accent-foreground"
          )} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-card-foreground text-sm sm:text-base md:text-lg leading-snug">
            {schedule.formattedDate}
          </h3>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-1">
            {isBooked ? (
              <span className="flex items-center gap-1 truncate">
                <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span className="truncate">{schedule.khatib?.namaLengkap}</span>
              </span>
            ) : (
              'Klik untuk mengisi jadwal khutbah'
            )}
          </p>
        </div>
      </div>
      <div className={cn(
        "px-3 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium self-start flex items-center gap-1.5 whitespace-nowrap",
        isBooked
          ? "bg-muted text-muted-foreground"
          : "bg-success-bg text-success-foreground"
      )}>
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
        {isBooked ? 'Terisi' : 'Tersedia'}
      </div>
    </button>
  );
};

export default ScheduleCard;
