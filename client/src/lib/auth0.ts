const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
const authorizationParams: any = { 
  redirect_uri: window.location.origin 
};
if (audience) {
  authorizationParams.audience = audience;
}

export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams,
};
