
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { CalendarDays, Building2, Users, Settings, Plus, LogOut } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  description: string | null;
  email: string;
  phone: string;
  address: string;
  created_at: string;
}

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAdmin = profile?.is_admin === true;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    fetchBusinesses();
  }, [user, navigate]);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching businesses:', error);
      } else {
        setBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    console.log('Dashboard: Initiating sign out');
    await signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <CalendarDays className="h-8 w-8 text-blue-500 mr-3" />
              <h1 className="text-2xl font-bold text-white">Reservas Online</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Hola, {profile?.full_name || user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Panel de Control</h2>
          <p className="text-gray-400">
            Gestiona tus negocios, servicios y reservas desde un solo lugar
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Mis Negocios
              </CardTitle>
              <Building2 className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{businesses.length}</div>
              <p className="text-xs text-gray-400">
                Total de negocios registrados
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Reservas Hoy
              </CardTitle>
              <CalendarDays className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">
                Reservas para hoy
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                Clientes
              </CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">0</div>
              <p className="text-xs text-gray-400">
                Total de clientes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <div className="mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Panel de Administrador
                </CardTitle>
                <Users className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-3">
                  Puedes registrar nuevos usuarios desde aquí.
                </p>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/admin/register')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Registrar Usuario
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Businesses Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Mis Negocios</h3>
            <Button onClick={() => navigate('/business/new')} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Negocio
            </Button>
          </div>

          {businesses.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">
                  No tienes negocios registrados
                </h4>
                <p className="text-gray-400 mb-4">
                  Crea tu primer negocio para comenzar a recibir reservas
                </p>
                <Button onClick={() => navigate('/business/new')} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Mi Primer Negocio
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map((business) => (
                <Card key={business.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{business.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {business.description || 'Sin descripción'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>📧 {business.email}</p>
                      <p>📞 {business.phone}</p>
                      <p>📍 {business.address}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/business/${business.id}`)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        Ver Detalles
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => navigate(`/business/${business.id}/settings`)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => navigate('/bookings')}
          >
            <CalendarDays className="h-6 w-6 mb-2" />
            Ver Reservas
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => navigate('/customers')}
          >
            <Users className="h-6 w-6 mb-2" />
            Gestionar Clientes
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => navigate('/services')}
          >
            <Settings className="h-6 w-6 mb-2" />
            Mis Servicios
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => navigate('/profile')}
          >
            <Settings className="h-6 w-6 mb-2" />
            Mi Perfil
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
