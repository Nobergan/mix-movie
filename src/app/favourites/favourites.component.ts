import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { CategoryFilm } from "../shared/models/category-film.model";
import { FilmsService } from "../shared/services/films.service";

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit{
  favouritesFilms: CategoryFilm[];
  isAuthenticated = false;

  constructor(
    private filmsService: FilmsService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.favouritesFilms = this.filmsService.getFavouritesFilms();
  }

  removeFavourite(id: number) {
    this.filmsService.removeFromFavourites(id);
    this.favouritesFilms = this.filmsService.getFavouritesFilms();
  }

  onLoadFilm(id, film) {
    this.router.navigate([`/${film.type}`, id], {relativeTo: this.route});
  }

  onMouseOver(film) {
    const trashIcon = this.el.nativeElement.querySelector(`.category__item-trash[data-id="${film.id}"]`);
    this.renderer.setAttribute(trashIcon, 'src', './assets/images/icons/icon-trash-red.svg');
  }

  onMouseOut(film) {
    const trashIcon = this.el.nativeElement.querySelector(`.category__item-trash[data-id="${film.id}"]`);
    this.renderer.setAttribute(trashIcon, 'src', './assets/images/icons/icon-trash.svg');
  }
}
