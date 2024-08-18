import { Component, OnInit } from '@angular/core';
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

  constructor(private movieService: MovieService) { }

  ngOnInit(): void { }

  onQueryChange(event: any): void {
    this.query = event.value;
  }

  findMovieByTitle(): void {
    if (this.query.trim() === '') {
      this.errorMessage = 'Por favor, insira um nome de filme válido.';
      return;
    }
    
    this.isLoading = true;
    this.movieService.searchMoviesByTitle(this.query).subscribe(
      (data) => {
        if (data && data.results) {
          this.searchResults = data.results;
          this.errorMessage = this.searchResults.length === 0 ? 'Nenhum filme encontrado!' : '';
        } else {
          this.errorMessage = 'Nenhum resultado encontrado.';
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao buscar filmes:', error);
        this.isLoading = false;
        this.errorMessage = 'Erro ao buscar filmes. Tente novamente.';
      }
    );
  }
}
