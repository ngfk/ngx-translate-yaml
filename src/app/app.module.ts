import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';

declare const process: any;

export function HttpLoaderFactory(http: Http) {
    let base = process.env.NODE_ENV === 'production'
        ? 'https://ngfk.github.io/ngx-translate-yaml/assets/i18n/'
        : './assets/i18n/';

    return new TranslateHttpLoader(http, base, '.json');
}

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    declarations: [
        AppComponent,
    ]
})
export class AppModule { }
