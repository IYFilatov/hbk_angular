import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.minLength(3)),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  isLoggedIn = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const username = this.form.get('username').value;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.authService.register(username, email, password).subscribe(
      data => {
        this.router.navigate(['auth/signin']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    
  }
}
