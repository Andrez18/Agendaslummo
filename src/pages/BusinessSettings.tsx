
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Settings, Save, Clock } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  description: string | null;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  business_hours: any;
}

interface BusinessFormData {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  business_hours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
}

const BusinessSettings = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<BusinessFormData>();

  const days = [
    { key: 'monday', label: 'Lunes' },
    { key: 'tuesday', label: 'Martes' },
    { key: 'wednesday', label: 'Miércoles' },
    { key: 'thursday', label: 'Jueves' },
    { key: 'friday', label: 'Viernes' },
    { key: 'saturday', label: 'Sábado' },
    { key: 'sunday', label: 'Domingo' },
  ];

  useEffect(() => {
    if (!user || !id) {
      navigate('/dashboard');
      return;
    }

    fetchBusinessDetails();
  }, [user, id, navigate]);

  const fetchBusinessDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching business details:', error);
        navigate('/dashboard');
      } else {
        setBusiness(data);
        
        // Configurar valores por defecto del formulario
        form.reset({
          name: data.name,
          description: data.description || '',
          email: data.email,
          phone: data.phone,
          address: data.address,
          timezone: data.timezone,
          business_hours: data.business_hours || getDefaultBusinessHours(),
        });
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultBusinessHours = () => {
    const defaultHours = {
      open: '09:00',
      close: '18:00',
      closed: false,
    };
    
    return {
      monday: defaultHours,
      tuesday: defaultHours,
      wednesday: defaultHours,
      thursday: defaultHours,
      friday: defaultHours,
      saturday: { ...defaultHours, close: '14:00' },
      sunday: { ...defaultHours, close: '14:00', closed: true },
    };
  };

  const onSubmit = async (data: BusinessFormData) => {
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('businesses')
        .update({
          name: data.name,
          description: data.description || null,
          email: data.email,
          phone: data.phone,
          address: data.address,
          timezone: data.timezone,
          business_hours: data.business_hours,
        })
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error updating business:', error);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el negocio. Inténtalo de nuevo.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Éxito',
          description: 'El negocio se ha actualizado correctamente.',
        });
        
        // Actualizar el estado local
        setBusiness(prev => prev ? { ...prev, ...data } : null);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando configuración...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Negocio no encontrado</h2>
          <p className="text-gray-600 mb-4">El negocio que buscas no existe o no tienes permisos para editarlo</p>
          <Button onClick={() => navigate('/dashboard')}>
            Volver al Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/business/${business.id}`)}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <Settings className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Configurar {business.name}</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Información básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>
                  Configura los datos principales de tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: 'El nombre es obligatorio' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del negocio</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nombre de tu negocio" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe tu negocio y los servicios que ofreces"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: 'El email es obligatorio',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="email@ejemplo.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    rules={{ required: 'El teléfono es obligatorio' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+34 123 456 789" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: 'La dirección es obligatoria' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Calle, número, ciudad, código postal" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zona horaria</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="UTC" />
                      </FormControl>
                      <FormDescription>
                        Ejemplo: Europe/Madrid, America/Mexico_City
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Horarios de atención */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Horarios de Atención
                </CardTitle>
                <CardDescription>
                  Configura los horarios de funcionamiento de tu negocio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {days.map((day) => (
                    <div key={day.key} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-20">
                        <span className="font-medium">{day.label}</span>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name={`business_hours.${day.key}.closed`}
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Switch
                                checked={!field.value}
                                onCheckedChange={(checked) => field.onChange(!checked)}
                              />
                            </FormControl>
                            <FormLabel className="text-sm">
                              {field.value ? 'Cerrado' : 'Abierto'}
                            </FormLabel>
                          </FormItem>
                        )}
                      />

                      {!form.watch(`business_hours.${day.key}.closed`) && (
                        <>
                          <FormField
                            control={form.control}
                            name={`business_hours.${day.key}.open`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} type="time" className="w-32" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <span className="text-gray-500">hasta</span>
                          
                          <FormField
                            control={form.control}
                            name={`business_hours.${day.key}.close`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} type="time" className="w-32" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Botones de acción */}
            <div className="flex gap-4">
              <Button type="submit" disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
              
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate(`/business/${business.id}`)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default BusinessSettings;
