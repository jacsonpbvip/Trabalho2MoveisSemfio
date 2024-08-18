import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie';
  private apiKey = '31be3525e6a37be76b80f93dfec696f7';
  private bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMWJlMzUyNWU2YTM3YmU3NmI4MGY5M2RmZWM2OTZmNyIsIm5iZiI6MTcyMzk0MTAzNi4yOTkzNTYsInN1YiI6IjY2YzEzZjhkNWQzMjQ5MjQ2YWEyNWZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.swkmcpkNwoFzcVGvRKMgYuZeM9OdY3emGPwwTp_jjtU';

  constructor(private http: HttpClient) {}

  // Método usando a API Key para buscar detalhes de um filme
  getMovieDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}?api_key=${this.apiKey}`);
  }

  // Método usando o Bearer Token para buscar detalhes de um filme
  getMovieDetailsUsingBearerToken(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.bearerToken}`,
    });

    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para buscar filmes
  getMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/popular?api_key=${this.apiKey}`);
  }

  
}
