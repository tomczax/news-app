import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule, MatIconModule, MatMenuModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule, MatProgressBarModule,
    MatSnackBarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgnewsModule } from 'angular-news-api';
import { NewsApiKeyConfig } from 'angular-news-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';

const newsApiConfig: NewsApiKeyConfig = {
    // key: 'f147c4c717d34dfd822ed53665d1ba09'
    key: 'e67018ffe6df4eaa9098b3e0916f8a7c'
  };

@NgModule({
    declarations: [
        AppComponent,
        NewsDetailComponent,
        NewsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatSnackBarModule,
        NgnewsModule.forRoot(newsApiConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
