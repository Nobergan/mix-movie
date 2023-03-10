import { Component } from '@angular/core';

import { Film } from "../shared/models/film.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  films: Film[];
  media_type_popular: string = 'popular';
  media_type_top: string = 'top_rated';
  media_type_now_playing: string = 'now_playing';
  media_type_upcoming: string = 'upcoming';
  routeType: string = 'movie';

  constructor() {}
}
