export default function({ $auth }) {
  // extend the plugin as you want
  if ($auth.loggedIn) {
    // eslint-disable-next-line
    console.log(`Hi ${$auth.user.firstName} ${$auth.user.lastName}, you are still here?`)
    // this.$root.$emit("user_signed_in");
  }

  // Use this function for all authentication error specific code
  // $auth.onError((error, name, endpoint) => {
  //   console.error('Authentication error...', error, name, endpoint);
  // })

  // Use this function to catch the login/logout redirections
  // $auth.onRedirect((to, from) => {
  //   console.log('Redirecting...', to);
  // })
}
