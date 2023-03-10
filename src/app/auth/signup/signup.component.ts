import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isSignUpSuccessful.subscribe(success => {
      if (success) {
        this.error = null;
      }
    });
  }

  toLogIn() {
    this.router.navigate([`/login`], {relativeTo: this.route});
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.signUp(email, password, name).subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/main'])
    }, errorMessage => {
      this.error = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

}
