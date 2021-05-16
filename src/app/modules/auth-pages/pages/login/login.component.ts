import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

import { Constants } from 'src/app/core/configs/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl('', Validators.minLength(3)),
    password: new FormControl(''),
  });

  isLoggedIn = false;
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, private constants: Constants) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const username = this.form.get('username').value;
    const password = this.form.get('password').value;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoggedIn = true;
        
        this.router.navigate([`app/${this.constants.DEFAULT_BASE_NAME}`]);
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;        
      }
    );
  }

  goSignup(): void {
    this.router.navigate(['auth/signup']);
  }

  reloadPage(): void {
    window.location.reload();
  }

}
