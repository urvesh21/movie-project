import { Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Dialog, DialogRef, DIALOG_DATA, DialogModule } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';
import { MovieDbService } from 'src/app/services/movie-db.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [NgIf, DialogModule, NgFor, AsyncPipe],
})
export class ModalComponent implements OnInit {
  playVideo: boolean = false;
  loadingError$: Observable<string>;

  constructor(
    public dialogRef: DialogRef<ModalComponent>,
    @Inject(DIALOG_DATA) public data: any,
    public sanitizer: DomSanitizer,
    private movieDb: MovieDbService
  ) {
    this.loadingError$ = this.movieDb.loadingError.asObservable();
  }

  ngOnInit(): void {
    this.data.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
  }

  showTrailer() {
    this.playVideo = true;
  }

  closeModal() {
    this.dialogRef.close();
  }
}
