import { Component, Input } from '@angular/core';
import { Film } from "../../shared/models/film.model";

@Component({
  selector: 'app-films-similar',
  templateUrl: './films-similar.component.html',
  styleUrls: ['./films-similar.component.scss'],
})
export class FilmsSimilarComponent {
  @Input() films: Film[];
  @Input() media_type: string;

  swiperConfig: any = {
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {clickable: false},
    navigation: true,
    breakpoints: {
      920: {
        slidesPerView: 5,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      375: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20
      }
    }
  }
}
