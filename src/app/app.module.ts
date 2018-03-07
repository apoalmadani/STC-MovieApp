import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxDatatableModule  } from '@swimlane/ngx-datatable';
import { MatDialogModule } from '@angular/material';
import { SimilarMoviesComponent } from './similar-movies/similar-movies.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


@NgModule({
  declarations: [
    AppComponent,
    SimilarMoviesComponent,
    MovieDetailsComponent,
    FavoriteListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{path:'', component: AppComponent}]),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  entryComponents: [
    SimilarMoviesComponent,
    MovieDetailsComponent,
    FavoriteListComponent
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
