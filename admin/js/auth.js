window.addEventListener('load', async () => {
  await Clerk.load()

  const appDiv = document.getElementById('app')

  if (Clerk.isSignedIn) {
    appDiv.innerHTML = `
      <div id="user-button"></div>
      <h2>Dashboard de Puntos</h2>
      <div id="dashboard"></div>
    `

    Clerk.mountUserButton(document.getElementById('user-button'))

    initDashboard() // viene de dashboard.js
  } else {
    appDiv.innerHTML = `<div id="sign-in"></div>`

    Clerk.mountSignIn(document.getElementById('sign-in'), {
      afterSignInUrl: '/admin',
      afterSignUpUrl: '/admin'
    })
  }
})
