import { useMemo } from 'react';
import { KhatibSchedule, groupByMonth, MONTHS } from '@/lib/schedule-data';
import ScheduleCard from './ScheduleCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ScheduleListProps {
  schedules: KhatibSchedule[];
  onSelectSchedule: (schedule: KhatibSchedule) => void;
  isLoading?: boolean;
}

const ScheduleList = ({ schedules, onSelectSchedule, isLoading }: ScheduleListProps) => {
  const groupedSchedules = useMemo(() => groupByMonth(schedules), [schedules]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
          {Array.from({ length: 3 }).map((_, monthIdx) => (
            <section key={monthIdx} className="animate-fade-in" style={{ animationDelay: `${monthIdx * 200}ms` }}>
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="space-y-2.5 sm:space-y-3">
                {Array.from({ length: 4 }).map((_, cardIdx) => (
                  <Skeleton key={cardIdx} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-8 lg:py-10">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-7 md:space-y-8">
        {MONTHS.map((month, idx) => {
          const monthSchedules = groupedSchedules.get(month);
          if (!monthSchedules || monthSchedules.length === 0) return null;

          return (
            <section key={month} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-3 sm:mb-4 md:mb-5 px-1">
                {month}
              </h2>
              <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                {monthSchedules.map((schedule, cardIdx) => (
                  <div
                    key={schedule.dateString}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(idx * 50) + (cardIdx * 100)}ms` }}
                  >
                    <ScheduleCard
                      schedule={schedule}
                      onClick={() => onSelectSchedule(schedule)}
                    />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleList;
