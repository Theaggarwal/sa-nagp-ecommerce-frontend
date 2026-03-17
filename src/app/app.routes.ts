import { Routes } from '@angular/router';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: 'login',
		component: LoginPage
	},
	{
		path: 'register',
		component: RegisterPage
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordPage
	},
	{
		path: '**',
		redirectTo: 'login'
	}
];
