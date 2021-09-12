import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieInterceptor } from './interceptor/movie-interceptor';
import { MovieDbService } from './services/movie-db.service';
import { MovieHomeComponent } from './components/movie-home/movie-home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatToolbarModule,
    MatPaginatorModule,
  ],
  declarations: [AppComponent, MovieHomeComponent, ModalComponent],
  bootstrap: [AppComponent],
  providers: [MovieDbService, { provide: HTTP_INTERCEPTORS, useClass: MovieInterceptor, multi: true }],
})
export class AppModule {}
