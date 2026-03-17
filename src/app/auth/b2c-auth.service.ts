import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class B2cAuthService {
  private readonly b2c = environment.b2c;

  signInWithCredentials(loginHint?: string): void {
    this.startAuth(this.b2c.policies.signInSignUp, loginHint);
  }

  signInWithFacebook(): void {
    this.startAuth(this.b2c.policies.facebook);
  }

  signInWithTwitter(): void {
    this.startAuth(this.b2c.policies.twitter);
  }

  register(): void {
    this.startAuth(this.b2c.policies.signUp);
  }

  forgotPassword(loginHint?: string): void {
    this.startAuth(this.b2c.policies.resetPassword, loginHint);
  }

  private startAuth(policy: string, loginHint?: string): void {
    const authorizeUrl = this.buildAuthorizeUrl(policy, loginHint);
    window.location.href = authorizeUrl;
  }

  private buildAuthorizeUrl(policy: string, loginHint?: string): string {
    const params = new URLSearchParams({
      client_id: this.b2c.clientId,
      redirect_uri: this.b2c.redirectUri,
      response_type: 'code',
      response_mode: 'query',
      scope: this.b2c.scopes.join(' '),
      state: crypto.randomUUID(),
      nonce: crypto.randomUUID()
    });

    if (loginHint) {
      params.set('login_hint', loginHint);
    }

    return `https://${this.b2c.tenantDomain}/${this.b2c.tenantName}.onmicrosoft.com/${policy}/oauth2/v2.0/authorize?${params.toString()}`;
  }
}
