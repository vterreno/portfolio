import { Component, OnInit } from '@angular/core';

const apiKey = 'fa37dc30bfb45562f0a9c3f240e43152';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: [
    {
      description: string;
    }
  ];
}

const weatherDescriptions: { [key: string]: string } = {
  'clear sky': 'Despejado',
  'scattered clouds': 'Nublado',
  'rain': 'Lluvia',
  'few clouds': 'Algunas nubes',
  'thunderstorm': 'Tormenta',
  'snow': 'Nieve',
  'shower rain': 'Llovizna',
  'broken clouds': 'Tormentoso',
  'mist': 'Niebla'
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  temperature: number = 0
  description: string = ''
  horaActual: string = ''
  intervalId: any;

  constructor() { }
  
  ngOnInit(): void {
    // Función para cambiar el tema
    function toggleTheme() {
      const body = document.body;
      body.classList.toggle('theme-dark');

      // Cambiar el ícono de sol/luna
      const themeIcon = document.getElementById('theme-icon') as HTMLImageElement;
      if (body.classList.contains('theme-dark')) {
        themeIcon.src = '../../assets/moon.webp';
        themeIcon.classList.toggle('moon')
        themeIcon.classList.remove('sun')
      } else {
        themeIcon.src = '../../assets/sun.webp';
        themeIcon.classList.toggle('sun')
        themeIcon.classList.remove('moon')
      }
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn?.addEventListener('click', () => {
      toggleTheme();
      const themeIcon = document.getElementById('theme-icon');
      themeIcon?.classList.add('rotate-animation');
      setTimeout(() => {
        themeIcon?.classList.remove('rotate-animation');
      }, 300); // Espera 300ms (tiempo de la animación) y luego elimina la clase para permitir otra transición
    });

    this.loadWeatherData();
    this.intervalId = setInterval(() => {
      this.actualizarHora();
    }, 1000); // Actualizar la hora cada segundo
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Clima
  async getWeatherData(): Promise<WeatherData> {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Cordoba,AR&units=metric&appid=${apiKey}`);

      if (!response.ok) {
        throw new Error('No se pudo obtener los datos del clima.');
      }

      const data = await response.json() as WeatherData;
      return data;
    } catch (error) {
      console.error('Error al obtener datos del clima:', error);
      throw error;
    }
  }

  // Función para mostrar los datos en la interfaz
  displayWeatherData(data: WeatherData): void {
    this.temperature = Math.round(data.main.temp);
    this.description = weatherDescriptions[data.weather[0].description] || data.weather[0].description;
  }

  // Función principal para cargar los datos del clima en la interfaz
  async loadWeatherData(): Promise<void> {
    try {
      const weatherData = await this.getWeatherData();
      this.displayWeatherData(weatherData);
    } catch (error) {
      // Manejar el error aquí o notificar al usuario que ocurrió un problema.
      console.error('Error al cargar los datos del clima:', error);
    }
  }

  // hora
  actualizarHora() {
    const fecha = new Date();
    const img = document.getElementById('tiempo') as HTMLImageElement
    const div = document.getElementById('weather-info')

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };

    this.horaActual = fecha.toLocaleTimeString('es-AR', options);
    
    if(this.horaActual > '21:00') {
      img.src = '../../assets/noche.webp'
      if (div && div.style) {
        div.style.backgroundColor = '#b15afcd4';
      }
    
    } else {
      img.src = '../../assets/dia.webp'
    }
    
  }
  

}
