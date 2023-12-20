import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogModule } from '@angular/material/legacy-dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MovieDbService } from 'src/app/services/movie-db.service';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: true,
    imports: [NgIf, MatLegacyDialogModule, NgFor, AsyncPipe]
})
export class ModalComponent implements OnInit {
  playVideo: boolean = false;
  loadingError$: Observable<string>;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public sanitizer: DomSanitizer, private movieDb: MovieDbService) {
      this.loadingError$ = this.movieDb.loadingError.asObservable();
    }

  ngOnInit(): void {
    this.data.video = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
  }

  showTrailer() {
    this.playVideo = true;
  }

}
