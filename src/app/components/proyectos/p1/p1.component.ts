import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.css']
})
export class P1Component implements OnInit {
  @Output() close = new EventEmitter<void>();
  translations: any;
  currentLanguage: string = 'es';
  translationsLoaded = false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('selectedLanguage') || 'es';
    this.loadTranslations();
  }

  closePopup() {
    this.close.emit();
    const body = document.getElementById('proyectos')
  }

  loadTranslations(): void {
    const translationFile = `assets/${this.currentLanguage}.json`;

    this.http.get(translationFile).subscribe((data: any) => {
      this.translations = data;
      this.translationsLoaded = true;
    });
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }

}
