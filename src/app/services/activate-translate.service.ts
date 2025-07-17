/**

 */

import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivateTranslateService {

  languageEmit: any;
  @Output() activateLanguageChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  async activateTranslate(language) {
    this.languageEmit = language;
    await localStorage.setItem('language', this.languageEmit.data);
    this.activateLanguageChange.emit(this.languageEmit.data);
  }
}
