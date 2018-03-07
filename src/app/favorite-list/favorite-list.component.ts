import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  private favoriteList = []

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<FavoriteListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private spinnerService: Ng4LoadingSpinnerService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //when openning this component, fill data table with data from local storage
  ngOnInit() {
    this.spinnerService.show();
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      console.log(key, value);
      this.favoriteList.push(JSON.parse(value));
    }
    this.spinnerService.hide();
  }

  //remove movie from favorite list and from local storage
  removeFromFavorite(movieId) {
    for (var i = 0; i < this.favoriteList.length; i++) {
      if (this.favoriteList[i].id == movieId) {
        localStorage.removeItem(movieId);
        this.favoriteList.splice(i, 1);
        break;
      }
    }
  }

}
