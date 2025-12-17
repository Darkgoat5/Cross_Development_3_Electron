export class Movie {
  
    id: number;
    title: string;
    releaseDate: string;
    genre: string;
    rating: number;

  constructor() {
    this.id = Date.now() + Math.random(); // Generate unique ID
    this.title = '';
    this.releaseDate = '';
    this.genre = '';
    this.rating = 0;
  }
}