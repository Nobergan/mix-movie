import {Component, HostListener, OnDestroy, OnInit} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  menuOpen = false;
  private userSub: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  toLogIn() {
    this.router.navigate([`/login`], {relativeTo: this.route});
  }

  toSignUp() {
    this.router.navigate([`/signup`], {relativeTo: this.route});
  }

  onLogout() {
    this.authService.logOut();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.menuOpen && !target.closest('.header__nav') && !target.closest('.header-mob__button')) {
      this.closeMenu();
    }
  }

}

