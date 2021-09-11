import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../../services/movie-db.service';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.scss']
})
export class MovieHomeComponent implements OnInit {
  constructor(private movieDB: MovieDbService) {}

  ngOnInit() {
    this.movieDB
      .getPopularMovies()
      .subscribe(data => console.log('data ', data));
  }
}
