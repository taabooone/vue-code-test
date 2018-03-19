<template>
  <div class="single-user">
    <form v-show="!formFilled" v-on:submit.prevent="nextStep">
      <div v-show="stepIndex == 0">

        <label> First name </label>
        <input type="text" name="firstName" class="input" v-validate="'required'" v-model="user.firstName" :class="{'danger': errors.has('firstName') }" />
        <span v-show="errors.has('firstName')" class="input-error danger">{{ errors.first('firstName') }}</span>

        <label> Last name </label>
        <input type="text" name="lastName" class="input" v-validate="'required'" v-model="user.lastName" :class="{'danger': errors.has('lastName') }"  />
        <span v-show="errors.has('lastName')" class="input-error danger">{{ errors.first('lastName') }}</span>

      </div>
      <div v-show="stepIndex == 1">

        <label> Phone number </label>
        <input type="text" name="phoneNumber" class="input" v-validate="{ required: true, regex: /^((00|\+)[0-9]{2,3}){0,1}[0-9]{4,14}$/ }" v-model="user.phoneNumber" :class="{'danger': errors.has('phoneNumber') }"/>
        <span v-show="errors.has('phoneNumber')" class="input-error danger">{{ errors.first('phoneNumber') }}</span>

      </div>
      <div v-show="stepIndex == 2">

        <label> Avatar url </label>
        <div class="centered">
          <img :src=" user.imageUrl ? user.imageUrl : defaultImageUrl " class="avatar">
        </div>
        <input type="text" name="imageUrl" class="input" v-validate="{ required: true, regex: /^(http|https):\/\/.*\.(jpg|png)$/ }" v-model="user.imageUrl" :class="{'danger': errors.has('imageUrl') }"/>
        <span v-show="errors.has('imageUrl')" class="input-error danger">{{ errors.first('imageUrl') }}</span>

      </div>
      <input type="submit" value="submit" />
    </form>
    <div v-show="formFilled" class="user-data">
      <img :src=" user.imageUrl ? user.imageUrl : defaultImageUrl " class="avatar">
      <p> Name: <span>{{user.firstName}} {{ user.lastName}}</span> </p>
      <p> Number: <span>{{user.phoneNumber}}</span></p>
      <p> E-mail: <span>{{user.email}}</span></p>
    </div>
  </div>
</template>

<script>
import auth from '../auth'
import users from '../users'
import router from '../router'

export default {
  name: 'SingleUser',

  data () {
    return {
      user:{
        id: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        imageUrl: '',
        email: '',
      },
      defaultImageUrl: "https://www.hostelhops.com/img/profile/user/facebook-default.png",
      stepIndex: 0,
      formFilled: false,
      validations: {
            imageUrl: [
                { name: 'required' },
                { name: 'regex', params: [] }
            ],
            phoneNumber: [
              { name: 'required' },
              { name: 'regex', params: [/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/] }
            ]

        }
    }
  },
  methods: {
    updateUser: async function(){
      const { id, ...data } = this.user
      try{
        await users.updateUser( this, { id, data } )
      } catch (ex){
        console.error(ex)
      }
    },
    nextStep: async function(){
      // validation needed for current step.
      try{
        const isValid = await this.validateStep(this.stepIndex)
        if(isValid){
          await this.updateUser()
          this.stepIndex ++
          if(this.stepIndex > 2) this.formFilled = true
        }
      } catch(ex){
        console.error(ex)
      }
    },
    getUser: async function(){
      const user = await users.getUser(this, this.user.id)
      this.user.firstName = user.body.firstName
      this.user.lastName = user.body.lastName
      this.user.phoneNumber = user.body.phoneNumber
      this.user.imageUrl = user.body.imageUrl
      this.user.email = user.body.email
      if(!!this.user.imageUrl) this.formFilled = true
    },
    validateStep: async function(step){
      let isValid
      switch(step){
        case 0:
          isValid = await this.$validator.validate('firstName','lastName')
          break
        case 1:
          isValid = await this.$validator.validate('phoneNumber')
          break
        case 2:
          isValid = await this.$validator.validate('imageUrl')
          break
        default:
          isValid = await this.$validator.validateAll()
          break
      }
      return isValid
    }
  },
  mounted: async function(){
    this.user.id = auth.getId()
    await this.getUser()
  }
}
</script>

<style scoped>
  .single-user{
    max-width: 300px;
    margin: auto;
  }

  .single-user .centered{
    text-align: center;
  }

  .single-user img{
    max-width:100%;
    max-height: 300px;
    display: inline-block;
    margin-bottom: 10px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    overflow: hidden;
  }
  .single-user p span{
    float: right;
  }
</style>
