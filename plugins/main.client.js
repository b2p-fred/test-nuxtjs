/* eslint-disable no-console */

export default function ({ $config }) {
  window.onNuxtReady(() => {
    console.log('Nuxt.js is ready and mounted');

    console.warn(`Application: ${$config.APP_NAME}, ${$config.APP_VERSION}`);
    console.warn("Configuration:", $config);
    console.warn("Base:", process.env.BASE_URL);
    console.warn("Backend:", process.env.API_URL);
    if (process.env.apiUrl === "local") {
      console.warn("[app] The application backend is not configured. Note that it is not suitable for production :-)");
    }

    // fetch(`http://localhost:8000/api/login_check`, {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json; charset=UTF-8"},
    //   body: JSON.stringify({ username: 'fmohier@b2pweb.com', password: 'fmohier@b2pweb.com' })
    // })
    //   .then(tokens => {
    //     console.log("Tokens", tokens);
    //     if (tokens && tokens.token && tokens.refresh_token) {
    //       // store the jwt tokens in the local storage to keep user logged in between page refreshes
    //       // writeToStorage("access_token", tokens.token);
    //       // writeToStorage("refresh_token", tokens.refresh_token);
    //     }
    //   }).catch(err => {
    //     console.error("Error", err);
    //   });
  })
}
