import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { CategoryFilm } from "../shared/models/category-film.model";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { FilmsService } from "../shared/services/films.service";

const INITIAL_PAGE = 1;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() films: CategoryFilm[];
  @Input() media_type: string;
  @Input() period: string;
  @Input() routeType: string;
  @Input() title: string;
  currentPage = INITIAL_PAGE;
  totalPages: number;
  totalItems: number;
  isLoading = false;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private filmsService: FilmsService
  ) {}

  public labels: any = {
    previousLabel: 'Попередня',
    nextLabel: 'Наступна'
  };

  ngOnInit() {
    this.getFilms();
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  getFilms() {
    this.isLoading = true;
    this.dataStorageService.fetchFilms(this.media_type , this.currentPage, this.period)
      .subscribe(res => {
        this.films = res.results;
        this.totalPages = res.total_pages;
        if (res.total_results > 10000) {
          this.totalItems = 10000;
        } else {
          this.totalItems = res.total_results;
        }
        this.isLoading = false;
      });
  }

  onLoadFilm(id) {
    this.router.navigate([`/${this.routeType}`, id], {relativeTo: this.route});
  }

  onPageChange(event: number) {
    this.currentPage = event;
    this.getFilms();
  }

  addToFavourites(e, film) {
    e.stopPropagation();
    film.type = this.routeType;
    const favouriteFilm = { ...film, type: film.type };
    favouriteFilm.poster_path = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;

    this.filmsService.addToFavourites(favouriteFilm);

    const favouriteItem = document.querySelectorAll(".film__item-favourite");
    const favouriteItemActive = document.querySelectorAll(".film__item-favourite--active");

    favouriteItem.forEach((item, index) => {
      if (e.target === item) {
        item.classList.toggle('is-hidden');
        favouriteItemActive[index].classList.toggle('is-hidden');
      }
    });
  }

  isFilmInFavourites(film) {
    return this.filmsService.getFavouritesFilms().some(f => f.id === film.id);
  }

  onMouseOver(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '../../../assets/images/icons/favourite-icon-active.svg';
  }

  onMouseOut(event: MouseEvent) {
    const img = event.target as HTMLImageElement;
    img.src = '../../../assets/images/icons/favourite-icon.svg';
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}