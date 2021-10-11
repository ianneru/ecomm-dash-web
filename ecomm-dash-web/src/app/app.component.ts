import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Auth } from './services/auth/auth.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecomm-dash-web';
  currentViewer: Auth;
  loading = false;
  error = '';
  
  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
    
    this.error = '';
    this.loading = true;

    this.authenticationService.login("Ecommerce", "Ecommerce")
    .pipe(first())
    .subscribe(
      error => {
        this.error = error;
        this.loading = false;
      });
  }
}

