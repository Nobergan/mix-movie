import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.isSignInSuccessful.subscribe(success => {
      if (success) {
        this.error = null;
      }
    });
  }

  toSignUp() {
    this.router.navigate([`/signup`], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.logIn(email, password).subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/main'])
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }
}
