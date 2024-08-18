import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (isNaN(id)) {
      console.error('ID inválido');
      return;
    }

    // Usar o método para buscar os detalhes do filme
    this.movieService.getMovieDetails(id).subscribe(
      (response) => {
        this.movie = response;
      },
      (error) => {
        console.error('Erro ao carregar detalhes do filme:', error);
      }
    );
  }
}
