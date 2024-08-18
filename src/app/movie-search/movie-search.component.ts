import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Certifique-se de importar Router
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  query: string = '';
  searchResults: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private movieService: MovieService, private router: Router) { } // Certifique-se de adicionar Router

  ngOnInit(): void { }

  onQueryChange(event: any): void {
    this.query = event.value;
  }

  findMovieByTitle(): void {
    if (this.query.trim() === '') {
      this.errorMessage = 'Please enter a valid movie title.';
      return;
    }
    
    this.isLoading = true;
    this.movieService.searchMoviesByTitle(this.query).subscribe(
      (data) => {
        this.searchResults = data.results;
        this.errorMessage = this.searchResults.length === 0 ? 'No movies found!' : '';
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching movies. Please try again.';
      }
    );
  }
  
   onMovieTap(movie: any): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
