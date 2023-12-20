import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MovieInterceptor } from './app/interceptor/movie-interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { MovieDbService } from './app/services/movie-db.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, ReactiveFormsModule, MatIconModule, MatDialogModule, MatToolbarModule, MatPaginatorModule),
        MovieDbService, { provide: HTTP_INTERCEPTORS, useClass: MovieInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
    ]
})
  .catch(err => console.error(err));
