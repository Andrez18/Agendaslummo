
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Clock, Settings, BarChart3, ArrowRight, Play, CheckCircle, Star } from 'lucide-react';

const Demo = () => {
  const features = [
    {
      icon: Calendar,
      title: "Gestión de Citas",
      description: "Agenda citas fácilmente con nuestro calendario intuitivo",
      demo: "Ver calendario en vivo"
    },
    {
      icon: Users,
      title: "Base de Clientes",
      description: "Mantén toda la información de tus clientes organizada",
      demo: "Explorar clientes"
    },
    {
      icon: Settings,
      title: "Configuración de Servicios",
      description: "Define precios, duración y detalles de cada servicio",
      demo: "Configurar servicios"
    },
    {
      icon: BarChart3,
      title: "Reportes y Analytics",
      description: "Analiza el rendimiento de tu negocio con reportes detallados",
      demo: "Ver estadísticas"
    }
  ];

  const benefits = [
    "Aumenta tus reservas hasta un 40%",
    "Reduce el tiempo de gestión en 3 horas diarias",
    "Elimina las citas duplicadas y errores",
    "Mejora la satisfacción del cliente",
    "Acceso 24/7 desde cualquier dispositivo",
    "Notificaciones automáticas por email y SMS"
  ];

  const steps = [
    {
      number: "01",
      title: "Regístrate",
      description: "Crea tu cuenta gratuita en menos de 2 minutos"
    },
    {
      number: "02",
      title: "Configura tu Negocio",
      description: "Añade tus servicios, horarios y información básica"
    },
    {
      number: "03",
      title: "Comparte tu Enlace",
      description: "Tus clientes pueden reservar directamente desde tu enlace personalizado"
    },
    {
      number: "04",
      title: "Gestiona y Crece",
      description: "Administra todas tus citas desde un solo lugar"
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
              <Play className="h-3 w-3 mr-1" />
              Demo Interactivo
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Descubre cómo funciona
              <span className="text-primary block">nuestra plataforma</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explora todas las funcionalidades que te ayudarán a gestionar tu negocio 
              de manera más eficiente y profesional.
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
                onClick={() => window.location.href = '/businesses'}
              >
                Ver Negocios
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Demo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Funcionalidades Principales
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubre cómo cada herramienta puede transformar tu negocio
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card hover:shadow-lg transition-all duration-200 group">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {feature.demo}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Beneficios Comprobados
            </h2>
            <p className="text-xl text-muted-foreground">
              Resultados reales de empresarios como tú
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo Empezar
            </h2>
            <p className="text-xl text-muted-foreground">
              En 4 simples pasos tendrás tu negocio funcionando
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={index} className="gradient-card text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="gradient-card">
            <CardContent className="pt-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl text-foreground mb-6">
                "Esta plataforma transformó completamente la forma en que gestiono mi salón. 
                Mis clientes están más satisfechos y yo tengo más tiempo para lo que realmente importa."
              </blockquote>
              <div>
                <p className="font-semibold text-foreground">Carmen Rodríguez</p>
                <p className="text-muted-foreground">Propietaria, Salón Carmen</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a más de 1,000 negocios que ya confían en nosotros
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
            Sin compromiso • Sin tarjeta de crédito • Soporte gratuito
          </p>
        </div>
      </section>
    </div>
  );
};

export default Demo;
