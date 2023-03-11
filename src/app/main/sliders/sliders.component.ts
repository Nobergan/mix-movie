import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Film } from "../../shared/models/film.model";
import { DataStorageService } from "../../shared/services/data-storage.service";
import { FilmsService } from "../../shared/services/films.service";

// import Swiper core and required modules
import SwiperCore, {Pagination, Navigation} from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit, OnDestroy {
  @Input() films: Film[];
  @Input() media_type: string;
  @Input() routeType: string;
  subscription: Subscription;

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

  constructor(
    private sliderFilmService: FilmsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.dataStorageService.fetchSlidersFilms(this.media_type, this.routeType).pipe(
      map(films => films.results),
      tap(films => this.films = films)
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
