<template >
    <div id="notlogged" class=" flex justify-center items-center text-center h-screen"> 
      <div class=" container w-3/5 h-2/5 bg-slate-300 rounded-lg translate-y-1/4">
        <h1 class="text-slate-800 font-bold  text-3xl pt-4 pb-4 translate-y-1/4" > Please enter 2FA code </h1>
        <p class="text-slate-600 font-semibold  text-xl pt-4 pb-4 translate-y-1/4" > Two-factor authentication (2FA) is enabled for your account. Please enter a code to log in. </p>
        <input v-model="code2fa" type="text" maxlength="6" class="p-2 bg-slate-100 mt-6 rounded ring-slate-200 ring-2" placeholder="123456">
        <button @click="verifyCode" class=" inline-flex items-center justify-center p-0.5 ml-4 mr-8 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white text-slate-900 focus:ring-2 focus:outline-none focus:ring-green-200 ">
           <a class=" px-5 py-3 transition-all ease-in duration-75  bg-slate-200 rounded-md group-hover:bg-opacity-0">
              Verify
           </a >
        </button>
      </div>
    </div>
  </template>

<script lang="ts" setup>
    import { inject, ref } from 'vue';
    import axios from 'axios';
    import { useRoute} from 'vue-router';
    const store = inject('store')

    const code2fa = ref('')
    function verifyCode(){
        axios
        .post('http://localhost:3001/twofactorauthentication', {code: code2fa.value }, {withCredentials: true })
        .then(data => {})
        .catch(err => {});
    }

</script>

<style scoped>
  #notlogged {
    background-image: url("../assets/bg1.jpg");
    width: 100vw;
    height: 100vh;
    background-size: cover;
  }
</style>