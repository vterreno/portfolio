import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguage = 'es';
  private translations: any;

  constructor(private http: HttpClient) {}

  setLanguage(lang: string): void {
    this.currentLanguage = lang;
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  loadTranslations(): Observable<any> {
    const translationFile = `assets/i18n/${this.currentLanguage}.json`;

    return this.http.get(translationFile).pipe(
      map((response: any) => {
        this.translations = response;
      })
    );
  }

  getTranslation(key: string): string {
    return this.translations[key] || key;
  }
}
