import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { B2cAuthService } from '../../auth/b2c-auth.service';

@Component({
  selector: 'app-forgot-password-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.scss'
})
export class ForgotPasswordPage {
  email = '';

  constructor(private readonly authService: B2cAuthService) {}

  resetPassword(): void {
    this.authService.forgotPassword(this.email.trim() || undefined);
  }
}
