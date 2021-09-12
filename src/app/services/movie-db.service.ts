import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Config, MovieDetails, MovieList, MovieTrailer } from '../interfaces/interface';

@Injectable()
export class MovieDbService {
  loadingError = new BehaviorSubject<string>('');
  constructor(private httpc: HttpClient) {
  }

  fetchMovies(page: number, query?: string): Observable<MovieList> {
    if (query) {
      return this.searchMovie(query);
    } else {
      return this.getPopularMovies(page);
    }
  }

  getPopularMovies(page: number, query?: string): Observable<MovieList> {
    return this.httpc.get<MovieList>(
      `${environment.apiBase}movie/popular?page=${page}`
    ).pipe(
      catchError(err => {
        this.loadingError.next(err.message);
        return of([] as any);
      })
    );
  }

  getConfiguration(): Observable<Config> {
    return this.httpc.get<Config>(environment.apiBase + 'configuration').pipe(
      catchError(err => {
        this.loadingError.next(err.message);
        return of([] as any);
      })
    );
  }

  getMovieDetails(id: any): Observable<any> {
    const movieDetailsAPI = this.httpc.get<MovieDetails>(environment.apiBase + `movie/${id}`);
    const videoIdAPI = this.httpc.get<MovieTrailer>(environment.apiBase + `movie/${id}/videos`);
    return forkJoin([movieDetailsAPI, videoIdAPI]).pipe(
      map(data => {
        const filteredVideo = data[1].results.find(items => items.official)?.key;
        return [data[0], filteredVideo];
      }),
      catchError(err => {
        this.loadingError.next(err.message);
        return of([] as any);
      })
    );
  }

  searchMovie(query: string) {
    return this.httpc.get<MovieList>(
      environment.apiBase + `search/movie?query=${query}`
    ).pipe(
      catchError(err => {
        this.loadingError.next(err.message);
        return of([] as any);
      })
    );;
  }
}
