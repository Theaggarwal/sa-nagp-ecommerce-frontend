import { Routes } from '@angular/router';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { LoginPage } from './pages/login/login.page';
import { ProductDetailPage } from './pages/product-detail/product-detail.page';
import { ProductSearchPage } from './pages/product-search/product-search.page';
import { RegisterPage } from './pages/register/register.page';

export const routes: Routes = [
	// Public routes — no auth required
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'search'
	},
	{
		path: 'search',
		component: ProductSearchPage
	},
	{
		path: 'product/:id',
		component: ProductDetailPage
	},
	// Auth routes
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
		redirectTo: 'search'
	}
];
