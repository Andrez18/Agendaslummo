
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, Star, ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Gestión de Citas",
      description: "Sistema completo para agendar y gestionar citas de manera eficiente."
    },
    {
      icon: Users,
      title: "Gestión de Clientes",
      description: "Mantén un registro detallado de todos tus clientes y su historial."
    },
    {
      icon: Clock,
      title: "Horarios Flexibles",
      description: "Configura horarios de trabajo personalizados para tu negocio."
    },
    {
      icon: Star,
      title: "Servicios Personalizados",
      description: "Define tus servicios con precios y duraciones específicas."
    },
    {
      icon: Zap,
      title: "Reservas Instantáneas",
      description: "Tus clientes pueden reservar directamente desde tu enlace público."
    },
    {
      icon: Shield,
      title: "Datos Seguros",
      description: "Toda tu información está protegida con la mejor seguridad."
    }
  ];

  const testimonials = [
    {
      name: "María García",
      business: "Salón de Belleza Luna",
      quote: "Desde que uso esta plataforma, he aumentado mis reservas un 40%. Es muy fácil de usar."
    },
    {
      name: "Carlos Ruiz",
      business: "Consultorio Dental",
      quote: "Mis pacientes pueden reservar citas 24/7. Ha mejorado mucho la experiencia del cliente."
    },
    {
      name: "Ana López",
      business: "Centro de Masajes",
      quote: "La gestión de horarios es perfecta. Nunca más se superponen las citas."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              ✨ Nuevo: Reservas públicas disponibles
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Gestiona tu negocio con
              <span className="text-primary block">inteligencia</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              La plataforma todo-en-uno para gestionar citas, clientes y servicios. 
              Simple, potente y diseñada para hacer crecer tu negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-hover text-lg px-8 py-6"
                onClick={() => window.location.href = '/auth'}
              >
                Comenzar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-hover text-lg px-8 py-6"
                onClick={() => window.location.href = '/demo'}
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-hover text-lg px-8 py-6"
                onClick={() => window.location.href = '/businesses'}
              >
                Explorar Negocios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Todo lo que necesitas para tu negocio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas profesionales diseñadas para simplificar tu día a día
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card hover:shadow-lg transition-all duration-200 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-muted-foreground">
              Miles de negocios confían en nosotros
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="gradient-card">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.business}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a miles de empresarios que ya están creciendo con nuestra plataforma
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-hover text-lg px-8 py-6"
              onClick={() => window.location.href = '/auth'}
            >
              Comenzar Gratis Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-hover text-lg px-8 py-6"
              onClick={() => window.location.href = '/businesses'}
            >
              Explorar Negocios
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Sin tarjeta de crédito • Configuración en 5 minutos • Soporte 24/7
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-muted-foreground">
              © 2024 Sistema de Reservas. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
