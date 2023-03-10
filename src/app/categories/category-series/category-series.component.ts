import { Component, OnInit } from '@angular/core';
import { CategoryFilm } from "../../shared/models/category-film.model";

@Component({
  selector: 'app-category-series',
  templateUrl: './category-series.component.html',
  styleUrls: ['./category-series.component.scss']
})
export class CategorySeriesComponent {
  series: CategoryFilm[];
  media_type: string = 'tv';
  period: string = 'first_air_date_year=2018';
  routeType: string = 'tv'
  title = 'серіали'
}
