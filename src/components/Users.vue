<template>
  <div class="users">
    <form v-on:submit.prevent="addUser">

      <label>E-mail:</label>
      <input v-validate="'required|email'" data-vv-delay="1000" v-model="email" type="text" name="email" :class="{'input': true, 'danger': errors.has('email') }" />
      <span v-show="errors.has('email')" class="input-error danger">{{ errors.first('email') }}</span>

      <label>Password:</label>
      <password-generator @passwordGenerated="setPassword" @onChange="setPassword"></password-generator>
      <input type="submit" value="add user"/>

    </form>

    <p>
      User list
    </p>
    <ul>
      <li v-for="user in users"><p>{{user.email}}</p><img class="avatar" v-if="user.imageUrl" :src="user.imageUrl"></li>
    </ul>

  </div>
</template>

<script>
import PasswordGenerator from '@/components/PasswordGenerator.vue';

import auth from '../auth'
import users from '../users'
import router from '../router'

export default {
  name: 'Users',
  components: { PasswordGenerator },
  data () {
    return {
      users: [],
      password:'',
      email: ''
    }
  },
  methods: {
    setPassword: function(e){
      this.password = e.message;
    },
    addUser: async function(){
      const isValid = await this.$validator.validateAll()
      if (isValid) {
        const {email, password} = this

        try {
          const createdUser = await users.createUser(this, {email, password})
          this.users.push(createdUser.body.user)
        } catch (ex) {
          console.error(ex)
        }
      }
    }
  },
  mounted: async function(){
    const res = await users.getUsers(this)
    this.users = res.body.users
  }
}
</script>

<style scoped>
  .users{
    max-width: 300px;
    margin: auto;
  }

  .users ul{
    list-style: none;
    padding:0px;
  }

  .users li{
    width:100%;
    height:50px;
    line-height: 50px;
    padding-left: 10px;
    position: relative;
  }

  .users li p{
    margin:0px;
  }

  .users li .avatar{
    height:100%;
    width:auto;
    top:0;
    right:0;
    position:absolute;
  }

  .users li:nth-child(odd){
    background-color: #eee;
  }
</style>
