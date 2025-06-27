
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Search, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Business {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  business_hours: any;
  services: Service[];
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  is_active: boolean;
}

const BusinessDirectory = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          services(*)
        `)
        .order('name');

      if (error) {
        console.error('Error fetching businesses:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los negocios",
          variant: "destructive",
        });
      } else {
        setBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchBusinesses();
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          services(*)
        `)
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('name');

      if (error) {
        console.error('Error searching businesses:', error);
        toast({
          title: "Error",
          description: "Error en la búsqueda",
          variant: "destructive",
        });
      } else {
        setBusinesses(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes}min`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Cargando negocios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">Directorio de Negocios</h1>
            </div>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="btn-hover"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-center">Encuentra el negocio perfecto</CardTitle>
              <CardDescription className="text-center">
                Busca por nombre del negocio o tipo de servicio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Buscar negocios o servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="focus-ring"
                />
                <Button 
                  onClick={handleSearch}
                  className="btn-hover"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {businesses.length === 0 ? (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay negocios disponibles</h3>
            <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {businesses.map((business) => (
              <Card key={business.id} className="gradient-card hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-primary">{business.name}</CardTitle>
                  <CardDescription>
                    {business.description || 'Sin descripción disponible'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    {business.address && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {business.address}
                      </div>
                    )}
                    {business.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        {business.phone}
                      </div>
                    )}
                    {business.email && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 mr-2" />
                        {business.email}
                      </div>
                    )}
                  </div>

                  {/* Services */}
                  {business.services && business.services.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Servicios:</h4>
                      <div className="space-y-2">
                        {business.services.slice(0, 3).map((service) => (
                          <div key={service.id} className="flex justify-between items-center p-2 bg-muted rounded">
                            <div>
                              <p className="font-medium text-sm">{service.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatDuration(service.duration)}
                              </p>
                            </div>
                            <Badge variant="secondary">€{service.price}</Badge>
                          </div>
                        ))}
                        {business.services.length > 3 && (
                          <p className="text-xs text-muted-foreground">
                            y {business.services.length - 3} servicios más...
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <Button 
                      size="sm" 
                      className="flex-1 btn-hover"
                      onClick={() => window.location.href = `/booking/${business.id}`}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Reservar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BusinessDirectory;
