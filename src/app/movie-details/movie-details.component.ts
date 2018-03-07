import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  private details:any;
  private dataRecieved:boolean;
  private showMoreDetails:boolean;
  private movieGeners = [];
  private castList = [];
  private description = "";
  private posterPath = "";
  private posterPathCheck = false;
  private NoCasts = false;


  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<MovieDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinnerService: Ng4LoadingSpinnerService) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.dataRecieved = false;
    this.showMoreDetails = false;
  }

  ngOnInit() {
    this.spinnerService.show();
    this.dataRecieved = false;
    this.http.get("https://api.themoviedb.org/3/movie/ "+ this.data.movieIdtoShow +"?api_key=e57623b67059db63ee8c80e289df2339&language=en-US").subscribe((res: any[]) => {
      console.log(res);
      
      this.details = res;
      this.movieGeners = this.details["genres"];
      if(this.details["poster_path"]) {
        this.posterPathCheck = true;
        this.posterPath = "https://image.tmdb.org/t/p/w500" + this.details["poster_path"];
        console.log("image path", this.posterPath);
      } else {
        this.posterPath = "This movie does not have a poster";
        this.posterPathCheck = false;
      }

      console.log("geners " + this.movieGeners);
      this.dataRecieved = true;
      if(this.details["overview"] ===  "") {
        console.log("I am description" +  this.description);
        this.description += "There is no description";
      } else {
        this.description = this.details["overview"];
      }
      this.spinnerService.hide();
    })
  }

  showMore() {
    this.spinnerService.show();
    this.showMoreDetails = true;
    this.http.get("https://api.themoviedb.org/3/movie/" +  this.data.movieIdtoShow + "/credits?api_key=e57623b67059db63ee8c80e289df2339").subscribe((res: any[]) => {
      console.log(res);
      this.castList = res["cast"];
      if(this.castList.length == 0) {
        this.NoCasts = true;
      }
      this.spinnerService.hide();
    })

  }

  showLess() {
    this.showMoreDetails = false;
  }

}