import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'

@Component({
  selector: 'app-similar-movies',
  templateUrl: './similar-movies.component.html',
  styleUrls: ['./similar-movies.component.css']
})
export class SimilarMoviesComponent implements OnInit {

  private similarMovies = [];
  private movieId;
  private noSimilar = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<SimilarMoviesComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinnerService: Ng4LoadingSpinnerService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.http.get('https://api.themoviedb.org/3/movie/' + this.data.movieIdtoShow + '/similar?api_key=e57623b67059db63ee8c80e289df2339&language=en-US&page=1').subscribe((res: any[]) => {
      console.log(res["results"]);
      this.similarMovies = res["results"];
      this.spinnerService.hide();
      if(this.similarMovies.length == 0) {
        this.noSimilar = true;
      }
    })
    console.log("similar in change: " + this.movieId);
  }

}