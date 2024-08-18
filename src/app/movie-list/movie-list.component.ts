import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data) => {
      console.log('Dados recebidos:', data);
      if (data && data.results) {
        this.movies = data.results;
        console.log('Filmes:', this.movies);
      } else {
        console.error('Dados inesperados recebidos da API:', data);
      }
    });
  }

  getImageUrl(posterPath: string): string {
    return posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : 'path/to/placeholder-image.png';
  }

  onMovieTap(movie: any): void {
    this.router.navigate(['/movie', movie.id]);
  }
}
