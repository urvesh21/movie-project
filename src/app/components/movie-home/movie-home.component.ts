import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config, MovieDetails, MovieList } from 'src/app/interfaces/interface';
import { MovieDbService } from '../../services/movie-db.service';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-movie-home',
  templateUrl: './movie-home.component.html',
  styleUrls: ['./movie-home.component.scss'],
})
export class MovieHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  baseImgUrl: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 20;
  movieCollection: any = [];
  movies$: Observable<any> = of([]);
  @ViewChild('searchInput')
  searchInput!: ElementRef;
  errorMsg: string = '';
  loadingError$: Observable<string>;
  configSub$: Subscription = new Subscription();
  movieDetailSub$: Subscription = new Subscription();

  constructor(private movieDB: MovieDbService, public dialog: MatDialog) {
    this.loadingError$ = this.movieDB.loadingError.asObservable();
  }

  ngOnInit() {
    this.configSub$ = this.movieDB
      .getConfiguration()
      .pipe(map((config: Config) => config.images.secure_base_url))
      .subscribe((data) => (this.baseImgUrl = data));

    this.getPopularMovies(this.currentPage);
  }

  ngAfterViewInit() {
    this.observeSearchText();
  }

  observeSearchText() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((event: any) => event.target.value)
      )
      .subscribe((text) => {
        if (text) {
          this.getPopularMovies(0, text);
        } else {
          this.getPopularMovies(this.currentPage);
        }
      });
  }

  getPopularMovies(page: number, query?: string) {
    this.movies$ = this.movieDB.fetchMovies(page, query).pipe(
      tap((data: MovieList) => {
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
        this.pageSize = data.results?.length;
      }),
      map((data) => {
        return data.results?.map((movies) => {
          return {
            id: movies?.id,
            icon: `${this.baseImgUrl}w154${movies?.poster_path}`,
            title: movies?.title,
          };
        });
      })
    );
  }

  updatePage(page: any) {
    this.getPopularMovies(page.pageIndex + 1);
  }

  openDialog(movie: any) {
    this.movieDetailSub$ = this.movieDB.getMovieDetails(movie.id).subscribe((data: [MovieDetails, string]) => {
      const [movieDetails, trailer] = data;
      this.dialog.open(ModalComponent, {
        width: '50%',
        data: {movieDetails: movieDetails, image: this.baseImgUrl,video: `https://www.youtube.com/embed/${trailer}?&autoplay=1` }
      });
    });
  }

  ngOnDestroy() {
    this.configSub$.unsubscribe();
    this.movieDetailSub$.unsubscribe();
  }
}
