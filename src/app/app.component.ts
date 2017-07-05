import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app',
    template: `
        <h2>{{'HELLO' | translate}}</h2>
        <button *ngFor="let lang of languages" (click)="setLang(lang)">
            {{lang}}
        </button>
    `,
    styles: [`
        button {
            margin: 2px;
        }
    `]
})
export class AppComponent {

    public languages = ['de', 'en', 'es', 'fr', 'it', 'nl']

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    public setLang(language: string) {
        this.translate.use(language);
    }
}
