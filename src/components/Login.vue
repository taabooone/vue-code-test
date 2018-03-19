<template>
  <div class="login-form">
    <form v-on:submit.prevent="handleLogin">

      <label>E-mail:</label>
      <input v-validate="'required|email'" data-vv-delay="1000" v-model="email" type="text" name="email" :class="{'input': true, 'danger': errors.has('email') }" />
      <span v-show="errors.has('email')" class="input-error danger">{{ errors.first('email') }}</span>

      <label>Password:</label>
      <input v-validate="'required'" v-model="password" type="password" name="password" :class="{'input': true, 'danger': errors.has('password') }" />
      <span v-show="errors.has('password')" class="input-error danger">Password required</span>

      <input type="submit" value="login"/>

    </form>
  </div>
</template>

<script>
import auth from '../auth'
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin: async function () {
      try{
        const result = await this.$validator.validateAll()
        if (result) {
          const { email, password } = this
          auth.login(this, { email, password });
        }
      } catch (ex){
        console.error(ex)
      }
    }
  }
}
</script>

<style>

  .login-form{
    max-width: 300px;
    margin:auto;
  }

  .input{
    display: block;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid lightgrey;
    padding:5px;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    transition: 400ms border ease-out;
    background-color: white;
  }

  .input:focus{
    border: 1px solid #00d1b2;
  }

  .input-error{
    display: block;
    font-size:10px;
    height: 14px;
    margin-top: -14px;
  }

  label{
    margin-bottom: 5px;
    display: block;
  }

  input[type="submit"],
  .btn{
    background-color: #00d1b2;
    padding:10px;
    border-radius: 5px;
    color: white;
    outline:none;
    border: none;
    font-weight: 700;
    transition: 150ms background-color ease-out;
  }

  input[type="submit"]:hover,
  .btn:hover{
    background-color: #00d1b2;
    cursor: pointer;
  }

  .danger{
    color: red;
  }

  .danger.input{
    border: 1px solid red!important;
  }



  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
</style>
