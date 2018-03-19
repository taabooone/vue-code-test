<template>
  <div class="input-group">
    <input type="text" class="input" :value="password" v-on:change="handleChange" />
    <span class="refresh-button">
      <button type="button" v-on:click="generate">
        <font-awesome-icon icon="sync" />
      </button>
    </span>
  </div>
</template>

<script>

  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import fontawesome from '@fortawesome/fontawesome'
  import FasRefresh from '@fortawesome/fontawesome-free-solid'

  export default {
    components: {
      FontAwesomeIcon
    },

    data: function() {
      return {
        password: this.value,
        size: 16,
        characters: 'a-z,A-Z,0-9,#',
        value: ''
      }
    },
    mounted: function() {
      this.generate()
    },
    methods: {
      generate: function() {
        let charactersArray = this.characters.split(',')
        let CharacterSet = ''
        let password = ''

        if( charactersArray.indexOf('a-z') >= 0) {
          CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
        }
        if( charactersArray.indexOf('A-Z') >= 0) {
          CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }
        if( charactersArray.indexOf('0-9') >= 0) {
          CharacterSet += '0123456789'
        }
        if( charactersArray.indexOf('#') >= 0) {
          CharacterSet += '![]{}()%&*$#^<>~@|'
        }

        for(let i=0; i < this.size; i++) {
          password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length))
        }
        this.password = password;
        this.$emit('passwordGenerated', { message: this.password })
      },
      handleChange: function(e){
        this.password = e.target.value
        console.log(e.target.value)
        this.$emit('onChange', { message: this.password })
      }
    }
  }
</script>

<style scoped>

.input-group{
  position: relative;
}
.refresh-button{
  position: absolute;
  right:0;
  top:0;
  height: 100%;
}
.refresh-button button{
  height: 100%;
  background-color: #00d1b2;
  color: white;
  border:0px;
  border-radius: 0px 5px 5px 0px;
  outline: none;
  padding: 0px 10px;
  transition: 150ms ease-out background-color;
}
.refresh-button button:hover{
  cursor: pointer;
  background-color: Grey;
}
</style>
