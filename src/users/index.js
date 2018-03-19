const API_URL = 'http://localhost:3001/'
const USERS_URL = `${API_URL}users`


export default {

  getUsers: async context => {
    return context.$http.get(USERS_URL)
  },

  createUser: async (context, data) => {
    return context.$http.post(USERS_URL, data)
  },

  updateUser: async (context, {id, data}) => {
    return context.$http.put(`${USERS_URL}/${id}`, data)
  },

  getUser: async (context, id) => {
    return context.$http.get(`${USERS_URL}/${id}`)
  }

}
