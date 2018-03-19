import router from '../router';

const API_URL = 'http://localhost:3001/'
const LOGIN_URL = `${API_URL}login`

export default {

  user: {
    authenticated: false,
  },

  login(context, creds) {
    context.$http.post(LOGIN_URL, creds).then( data => {
      if(data.body.success){
        localStorage.setItem('id_token', data.body.loginData.token)
        localStorage.setItem('role', data.body.loginData.role)
        localStorage.setItem('id', data.body.loginData.id)
        //Ofcourse this needs to be done with JWT or another auth.

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
    //should ofcourse get the role from token
    return localStorage.getItem('role')
  },

  getId(){
    //should ofcourse get the ID from token
    return localStorage.getItem('id')
  },

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
}
