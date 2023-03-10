import { Component } from '@angular/core';
import { CategoryFilm } from "../../shared/models/category-film.model";

@Component({
  selector: 'app-category-films',
  templateUrl: './category-films.component.html',
  styleUrls: ['./category-films.component.scss']
})
export class CategoryFilmsComponent {
  films: CategoryFilm[];
  media_type = 'movie';
  period = 'primary_release_date.gte=2010-01-01&primary_release_year=2010';
  routeType = 'movie'
  title = 'фільми'
}

