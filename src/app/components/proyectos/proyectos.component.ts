import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  translations: any;
  currentLanguage: string = 'es';

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
    this.loadTranslations();
  }

  isPopupVisible = false;

  togglePopup() {
    const body = document.getElementById('proyectos');

    body?.classList.toggle('blur');
    this.isPopupVisible = !this.isPopupVisible;
  }

  loadTranslations(): void {
    const translationFile = `assets/${this.currentLanguage}.json`;

    this.http.get(translationFile).subscribe((data: any) => {
      this.translations = data;
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}
