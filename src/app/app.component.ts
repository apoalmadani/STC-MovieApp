import { Component, OnInit, Inject } from '@angular/core'
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SimilarMoviesComponent } from './similar-movies/similar-movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'app';
  private myAPIKey = 'e57623b67059db63ee8c80e289df2339';
  private searchString = "";
  private listOfMovies = [];
  private favoriteList = [];
  private SearchMessage = "Latest Movies";


  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private spinnerService: Ng4LoadingSpinnerService
  ){}

  ngOnInit() {
    this.showLatest();
  }

  searchMovie() {
    this.spinnerService.show();
    console.log(this.searchString);
    this.listOfMovies = [];
    if(this.searchString != "") {
      this.http.get('https://api.themoviedb.org/3/search/movie?api_key=e57623b67059db63ee8c80e289df2339&language=en-US&query=' + this.searchString + '&page=1&include_adult=false')
      .subscribe((res: any[]) => {
        console.log(res);
        console.log(res["results"]);
        this.listOfMovies = res["results"];
        this.spinnerService.hide();
      });
      this.SearchMessage = "Search Results of " + this.searchString;
    } else {
      this.SearchMessage = "Latest Movies";
      this.showLatest();
      this.spinnerService.hide();
    }
  }

  showLatest(){
    this.http.get('https://api.themoviedb.org/3/discover/movie?api_key=e57623b67059db63ee8c80e289df2339&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=100&primary_release_year=2017').subscribe((res: any[]) => {
      console.log(res["results"]);
      this.listOfMovies = res["results"];
    })
  }

  openSimilarDialog(movieId) : void {
    let dialogRef = this.dialog.open(SimilarMoviesComponent, {
      width: '250px',
      data: { movieIdtoShow: movieId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDetailsDialog(movieId) {
    let dialogRef = this.dialog.open(MovieDetailsComponent, {
      width: '500px',
      data: { movieIdtoShow: movieId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addToFavorite(movieId) {
    if(localStorage.getItem(movieId)) {
      alert("this movie is already added to favorite list");
    } else {
      this.favoriteList.push(this.listOfMovies.find(movie => movie.id === movieId));
      localStorage.setItem(movieId,JSON.stringify(this.listOfMovies.find(movie => movie.id === movieId)));
    }
    console.log(this.favoriteList);
  }

  openFavoriteList(favList) {
    let dialogRef = this.dialog.open(FavoriteListComponent, {
      width: '500px',
      data: { listToShow: favList }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


