import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieInterceptor } from './interceptor/movie-interceptor';
import { MovieDbService } from './services/movie-db.service';
import { MovieHomeComponent } from './components/movie-home/movie-home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  declarations: [AppComponent, MovieHomeComponent],
  bootstrap: [AppComponent],
  providers: [
    MovieDbService,
    { provide: HTTP_INTERCEPTORS, useClass: MovieInterceptor, multi: true }
  ]
})
export class AppModule {}
