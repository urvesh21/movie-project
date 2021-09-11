import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Config, MovieDetails, MovieList } from '../interfaces/interface';

@Injectable()
export class MovieDbService {
  constructor(private httpc: HttpClient) {
    console.log(environment.apiBase);
  }

  getPopularMovies(): Observable<MovieList[]> {
    return this.httpc.get<MovieList[]>(
      environment.apiBase +
        'movie/popular?api_key=bf6408378a4dbdfdb7478ddcfdba6924&language=en-US&page=1'
    );
  }

  getConfiguration(): Observable<Config> {
    return this.httpc.get<Config>(
      environment.apiBase +
        'movie/configuration?api_key=bf6408378a4dbdfdb7478ddcfdba6924'
    );
  }

  getMovieDetails(id: any): Observable<MovieDetails> {
    return this.httpc.get<MovieDetails>(
      environment.apiBase +
        `movie/${id}?api_key=bf6408378a4dbdfdb7478ddcfdba6924&language=en-US`
    );
  }
}
