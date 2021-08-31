/**
 * This is the application global store (not a module...).
 *
 * Something special about it since we are using the nuxt-auth module
 * with a configuration to allow authenticating "locally" on the application API.
 * or with a global user authentication server.
 *
 */
export const state = () => ({
  // The default is to user the 'local' authentication strategy
  oAuthEnabled: false,
  oAuthStrategy: 'local',

  // oidcConfigurationUri: "/master/oidc/.well-known/oauth-authorization-server",
  oidcConfigurationUri: "/release/oidc/.well-known/oauth-authorization-server",
})

export const mutations = {
  enableOAuth(_state, strategy = null) {
    _state.oAuthEnabled = true;

    // Default is to use the 'b2p' configured strategy if none is requested
    _state.oAuthStrategy = strategy || 'b2p';
  },
  disabledOAuth(_state) {
    _state.oAuthEnabled = false;
    _state.oAuthStrategy = 'local';
  },
}
