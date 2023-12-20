import { Component, VERSION } from '@angular/core';
import { MovieHomeComponent } from './components/movie-home/movie-home.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [MovieHomeComponent]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
}
