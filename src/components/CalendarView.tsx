import { useMemo } from 'react';
import { KhatibSchedule, MONTHS } from '@/lib/schedule-data';
import { Calendar, MapPin, User, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CalendarViewProps {
  schedules: KhatibSchedule[];
}

const CalendarView = ({ schedules }: CalendarViewProps) => {
  const schedulesByMonth = useMemo(() => {
    const grouped = new Map<string, KhatibSchedule[]>();
    
    schedules.forEach(schedule => {
      const month = schedule.month;
      const existing = grouped.get(month) || [];
      grouped.set(month, [...existing, schedule]);
    });
    
    return grouped;
  }, [schedules]);

  const filledCount = schedules.filter(s => s.khatib).length;
  const totalCount = schedules.length;

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-5 sm:py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Kalender Jadwal Khatib
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {filledCount} dari {totalCount} jadwal telah terisi
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8">
          {MONTHS.map((month) => {
            const monthSchedules = schedulesByMonth.get(month);
            if (!monthSchedules || monthSchedules.length === 0) return null;

            return (
              <Card key={month} className="overflow-hidden">
                <div className="bg-primary/5 px-4 sm:px-6 py-3 sm:py-4 border-b">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                    {month} 2026
                  </h3>
                </div>
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {monthSchedules.map((schedule) => (
                      <div
                        key={schedule.dateString}
                        className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                          schedule.khatib
                            ? 'bg-success-bg/10 border-success'
                            : 'bg-muted/30 border-muted'
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-xs sm:text-sm text-foreground leading-tight">
                              {schedule.formattedDate.split(',')[0]}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {schedule.formattedDate.split(',')[1]}
                            </p>
                          </div>
                          {schedule.khatib && (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success shrink-0" />
                          )}
                        </div>

                        {schedule.khatib ? (
                          <div className="space-y-2 mt-3 pt-3 border-t">
                            <div className="flex items-start gap-2">
                              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
                              <p className="text-xs sm:text-sm font-medium text-foreground line-clamp-2">
                                {schedule.khatib.namaLengkap}
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground shrink-0 mt-0.5" />
                              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
                                {schedule.khatib.tempatTugas}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground italic text-center">
                              Belum terisi
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
