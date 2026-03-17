export interface B2cConfig {
  tenantName: string;
  tenantDomain: string;
  clientId: string;
  redirectUri: string;
  scopes: string[];
  policies: {
    signInSignUp: string;
    signUp: string;
    resetPassword: string;
    facebook: string;
    twitter: string;
  };
}

export const environment = {
  production: false,
  // ─── API endpoints ─────────────────────────────────────────────────────────
  // Replace with your actual URLs. All values are read once at bootstrap time.
  apis: {
    // ElasticSearch _search endpoint (product catalogue queries)
    elasticSearch: 'https://your-elasticsearch-host/products/_search',
    // Azure Container Apps – product detail & inventory
    productDetail: 'https://your-azure-container-app.azurecontainerapps.io/api/products',
    // Azure Container Apps – shopping cart operations
    cart: 'https://your-azure-container-app.azurecontainerapps.io/api/cart',
    // Azure Container Apps – wishlist / favourites
    wishlist: 'https://your-azure-container-app.azurecontainerapps.io/api/wishlist'
  },
  b2c: {
    tenantName: 'your-tenant-name',
    tenantDomain: 'your-tenant-name.b2clogin.com',
    clientId: 'your-client-id',
    redirectUri: 'http://localhost:4200/login',
    scopes: ['openid', 'profile'],
    policies: {
      signInSignUp: 'B2C_1_signupsignin',
      signUp: 'B2C_1_signup',
      resetPassword: 'B2C_1_passwordreset',
      facebook: 'B2C_1_facebook_signin',
      twitter: 'B2C_1_twitter_signin'
    }
  } satisfies B2cConfig
};
