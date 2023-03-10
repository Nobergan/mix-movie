import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class DataStorageService {
  tmdbApiKey = environment.tmdbAPIKey

  constructor(
    private http: HttpClient
  ) {}

  fetchSlidersFilms(type: string, routeType: string):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${routeType}/${type}?api_key=${this.tmdbApiKey}&language=uk`)
  }

  fetchFilm(id, type: string):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.tmdbApiKey}&language=uk`);
  }

  fetchFilmTrailer(id, type: string):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${this.tmdbApiKey}&language=en-US`);
  }

  fetchSimilarFilms(id: number, type: string):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${this.tmdbApiKey}&language=uk`)
  }

  fetchFilmReviews(id, type: string):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${this.tmdbApiKey}&language=en-US`);
  }

  fetchFilms(media_type, number, period):Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/discover/${media_type}/?api_key=${this.tmdbApiKey}&page=${number}&${period}&language=uk`);
  }
  searchFilms(query: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/multi?api_key=${this.tmdbApiKey}&query=${query}&language=uk`);
  }

}
