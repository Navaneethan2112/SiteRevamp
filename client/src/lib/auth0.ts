export const auth0Config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN || "login.aaraconnect.com",
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || "2TK5kVQhVkeuYdWZf0Ldor2OMC8mDCH0",
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || "",
  },
};
