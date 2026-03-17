import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { B2cAuthService } from '../../auth/b2c-auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private readonly authService: B2cAuthService) {}

  signInWithCredentials(): void {
    this.authService.signInWithCredentials(this.email.trim() || undefined);
  }

  signInWithFacebook(): void {
    this.authService.signInWithFacebook();
  }

  signInWithTwitter(): void {
    this.authService.signInWithTwitter();
  }
}
