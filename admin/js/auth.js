window.addEventListener('load', async () => {
  await Clerk.load()
  console.log("SignedIn:", Clerk.isSignedIn)
  console.log("User:", Clerk.user)
  console.log("Email:", Clerk.user?.primaryEmailAddress?.emailAddress)

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
      appearance: {
        elements: {
          footerAction: {
            display: 'none'
          }
        }
      },
      afterSignInUrl: '/admin',
      afterSignUpUrl: '/admin'
    })
  }
})
/*

    <!--<script
      async
      crossorigin="anonymous"
      data-clerk-publishable-key="pk_test_c3BsZW5kaWQtd29tYmF0LTAuY2xlcmsuYWNjb3VudHMuZGV2JA"
      src="https://splendid-wombat-0.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js">
    </script>-->
*/