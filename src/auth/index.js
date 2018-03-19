import router from '../router';

// URL and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'login'
const SIGNUP_URL = API_URL + 'users/'

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false,
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds) {
    context.$http.post(LOGIN_URL, creds).then( data => {
      if(data.body.success){
        localStorage.setItem('id_token', data.body.loginData.token)
        localStorage.setItem('role', data.body.loginData.role)
        localStorage.setItem('id', data.body.loginData.id)
        //Need to take role out of the jwt so it can't be set manualy

        this.user.authenticated = true

        if(data.body.loginData.role == 'employee') {
          router.replace('/user')
        }
        if(data.body.loginData.role == 'team-lead') {
          router.replace('/users')
        }
      }
    }, data => {
      context.error = data
    })
  },

  getRole(){
    //Parse token for role.
    return localStorage.getItem('role')
  },

  getId(){
    //Get the ID from token
    return localStorage.getItem('id')
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('role')
    localStorage.removeItem('id')
    this.user.authenticated = false
    router.replace('/login')
  },


  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
