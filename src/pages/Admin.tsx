import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Trash2, Calendar, Phone, MapPin, FileText, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useKhatibSchedules } from '@/hooks/useKhatibSchedules';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { groupByMonth, MONTHS } from '@/lib/schedule-data';



const Admin = () => {
  const navigate = useNavigate();
  const { schedules, deleteKhatib, isDeleting } = useKhatibSchedules();
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    const loginTime = localStorage.getItem('admin_login_time');
    
    if (auth === 'true' && loginTime) {
      const now = Date.now();
      const elapsed = now - parseInt(loginTime);
      const oneDay = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik
      
      if (elapsed < oneDay) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem('admin_auth');
        localStorage.removeItem('admin_login_time');
      }
    }
    setHasCheckedAuth(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_login_time', Date.now().toString());
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
      toast({
        title: 'Login berhasil',
        description: 'Selamat datang di halaman admin.',
      });
    } else {
      toast({
        title: 'Login gagal',
        description: 'Username atau password salah.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_login_time');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    navigate('/', { replace: true });
  };

  const filledSchedules = schedules.filter(s => s.khatib);
  const groupedSchedules = groupByMonth(filledSchedules);
  
  const displaySchedules = selectedMonth === 'all' 
    ? filledSchedules 
    : groupedSchedules.get(selectedMonth) || [];

  const handleDelete = async (scheduleDate: string, khatibName: string) => {
    if (!window.confirm(`Hapus jadwal khutbah ${khatibName}? Aksi ini tidak bisa dibatalkan.`)) {
      return;
    }

    try {
      await deleteKhatib(scheduleDate);
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



  // Show loading spinner while checking auth
  if (!hasCheckedAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Login - Jadwal Khatib Jum'at 2026</title>
        </Helmet>
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Lock className="w-12 h-12 text-primary" />
              </div>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>
                Masukkan username dan password untuk mengakses halaman admin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Masukkan username"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Masukkan password"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Kembali ke Halaman Utama
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin - Jadwal Khatib Jum'at 2026</title>
      </Helmet>

      <main className="min-h-screen bg-background p-3 sm:p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Halaman Utama
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Logout
              </Button>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
                Dashboard Admin
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Kelola jadwal khutbah Jumat 2026
              </p>
            </div>
          </div>

          {filledSchedules.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <p className="text-center text-muted-foreground">
                  Belum ada data jadwal khutbah yang diisi
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                <Button
                  variant={selectedMonth === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMonth('all')}
                >
                  Semua ({filledSchedules.length})
                </Button>
                {MONTHS.map((month) => {
                  const count = groupedSchedules.get(month)?.length || 0;
                  if (count === 0) return null;
                  return (
                    <Button
                      key={month}
                      variant={selectedMonth === month ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month} ({count})
                    </Button>
                  );
                })}
              </div>

              <div className="grid gap-3 sm:gap-4">
                {displaySchedules.map((schedule, index) => (
                  <Card key={`${schedule.dateString}-${index}`} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span className="truncate">Tanggal</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">
                            {schedule.formattedDate}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="truncate">Tempat Tugas</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                            {schedule.khatib?.tempatTugas}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <Phone className="w-4 h-4 shrink-0" />
                            <span className="truncate">Kontak</span>
                          </div>
                          <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                            {schedule.khatib?.noHP}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-t pt-3 sm:pt-4">
                        <div>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-1">Nama Lengkap</p>
                          <p className="font-medium text-foreground text-sm sm:text-base break-words">
                            {schedule.khatib?.namaLengkap}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground text-xs sm:text-sm mb-1">NIP</p>
                          <p className="font-medium text-foreground text-sm sm:text-base truncate">
                            {schedule.khatib?.nip}
                          </p>
                        </div>
                      </div>

                      {schedule.khatib?.saran && (
                        <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-t pt-3 sm:pt-4">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm mb-1">
                            <FileText className="w-4 h-4 shrink-0" />
                            Saran
                          </div>
                          <p className="text-foreground text-xs sm:text-sm italic break-words">
                            "{schedule.khatib.saran}"
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Data tersimpan
                        </p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(schedule.dateString, schedule.khatib?.namaLengkap || '')}
                          disabled={isDeleting}
                          className="flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
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
