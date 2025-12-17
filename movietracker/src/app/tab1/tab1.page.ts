import { Component, ViewChild, model, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonList, IonIcon, IonModal, IonButtons, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { StarColor } from '../star-color';
import { Movie } from '../movie.model';
import { Toast } from '@capacitor/toast';
import { Capacitor } from '@capacitor/core';
import { StarsComponent } from '../stars/stars.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [DatePipe],
  imports: [StarsComponent, FormsModule, IonInput, IonButtons, IonModal, IonIcon, CommonModule, IonList, IonButton, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent],
})

export class Tab1Page implements OnInit {
  constructor(private datePipe: DatePipe, public starColor: StarColor) {}

  stars = [1, 2, 3, 4, 5];

  rating = model(0);

  Movies: Movie[] = [];

  setRating(rating: number) 
  {
    this.rating.set(rating);
  }

  deleteMovie(index: number) 
  {
    this.Movies.splice(index, 1);
    this.persistMovies();
  }

  async showToast(message: string) 
  {
    if (Capacitor.isNativePlatform()) 
    {
      await Toast.show({
        text: message,
      });
    } 
    else 
    {
      //mocking toast on browser
      console.log('Toast:', message);
      
      const toastElement = document.createElement('div');
      toastElement.textContent = message;
      //centered at bottom of screen
      toastElement.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
      `;
      
      document.body.appendChild(toastElement);
      
      setTimeout(() => {
        if (document.body.contains(toastElement)) {
          document.body.removeChild(toastElement);
        }
      }, 3000);
    }
  }

  @ViewChild(IonModal) modal!: IonModal;

  movieName!: string;
  movieGenre!: string;
  movieReleaseDate!: Date;
  formatDate!: string;
  emptydate!: Date;

  cancel() {
    
    this.movieName = "";
    this.movieGenre = "";
    this.movieReleaseDate = this.emptydate;
    this.rating.set(0);


    this.modal.dismiss(null, 'cancel');
  }

  confirm() {

    if(!this.movieName || !this.movieGenre || !this.movieReleaseDate || this.rating() === 0) {
      this.showToast("Please fill in all fields before confirming.");
      return;
    }

    const dateNow = new Date();
    const releaseDate = new Date(this.movieReleaseDate);

    if(releaseDate > dateNow) {
      this.showToast("Release date cannot be in the future.");
      return;
    }

    this.modal.dismiss(this.movieName, 'confirm');

    this.formatDate = this.datePipe.transform(this.movieReleaseDate, 'dd/MM/yyyy')!;

    this.Movies.push({
      id: Date.now(),
      title: this.movieName,
      genre: this.movieGenre,
      releaseDate: this.formatDate,
      rating: this.rating(),
    });

    this.persistMovies();

    this.showToast(`${this.movieName} was added to the list!`);

    this.movieName = "";
    this.movieGenre = "";
    this.movieReleaseDate = new Date();
    this.rating.set(0);
  }

  // load movies when app starts
async ngOnInit() {
  const data = await window.api.loadMovies();
  if (Array.isArray(data)) 
    this.Movies = data;
}

  // save movie function, called after every add or delete
async persistMovies() {
  await window.api.saveMovies(this.Movies);
}
}