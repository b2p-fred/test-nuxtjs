export default function ({$axios, $config, redirect}) {
  // Update request headers
  $axios.setHeader('Content-Type', 'application/json');

  // Specific extension formatted as a user agent (see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
  if ($config.APP_COMMENTS && $config.APP_COMMENTS !== '') {
    $axios.setHeader('X-User-Agent', `${$config.APP_NAME}/${$config.APP_VERSION} (${$config.APP_COMMENTS})`);
  } else {
    $axios.setHeader('X-User-Agent', `${$config.APP_NAME}/${$config.APP_VERSION}`);
  }

  // // Use this function for requests specific code
  // $axios.onRequest(request => {
  //   console.log(`[axios] requesting ${request.method} ${request.url}...`)
  // })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 500) {
      // eslint-disable-next-line
      console.error(`[axios] HTTP error code: ${code}. The remote server encountered a problem :(`)
      redirect('/login')
    }
  })
}
