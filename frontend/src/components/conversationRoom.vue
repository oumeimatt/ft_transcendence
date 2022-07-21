<template>
    <div id="folio" class="invisible md:visible lg:visible col-span-1 lg:col-span-4 md:col-span-4 h-screen ">
        <div class="relative h-small bg-myblue rounded-lg">
            <h1 class="absolute font-bold text-2xl left-6 text-gray-400 bottom-2/4 translate-y-2/4"> {{ name }} </h1>
            <button  class="bg-slate-900 rounded h-10 w-36 font-bold absolute text-red-700 right-6 bottom-2/4 translate-y-2/4 hover:bg-red-800 hover:text-slate-900" > Leave room </button>
            <!-- <button @click="joinRoom = !joinRoom" class="bg-slate-300 rounded h-10 w-36 font-bold absolute text-gray-800 right-6 bottom-2/4 translate-y-2/4 hover:bg-slate-400" > Join Room </button> -->
        </div>
        <div v-if="joinRoom" class="fixed inset-60 z-50 ">
          <div class=" my-6 mx-auto max-w-sm text-center ">
                <!--content-->
            <div class="border-0 rounded-lg shadow-lg w-full bg-white  ">
                  <!--header-->
              <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 class=" m-auto font-semibold text-xl"> {{name}} </h3>
              </div>
								<form class=" grid gap-3 grid-cols-1  p-6 border-t border-solid border-slate-200 rounded-b">
									 <input type="password" placeholder="Password" class="bg-neutral-200 border-b rounded h-8 pl-4">
								</form>
              <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
                <button @click="joinRoom = !joinRoom" class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button" v-on:click="toggleModal()">
                  Cancel
                </button>
                <button @click="enterPassowrd" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    " type="button" v-on:click="toggleModal()">
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class=" max-h-4/5 h-full scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 ">
            <div>
             <div class="w-full">

                <!-- <div class="relative w-full p-6 overflow-y-auto">

                  <ul class="space-y-2">
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/framdani.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Hidsdsdsdksmdksmkdlmsdkls</span>
                         </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200  rounded-full shadow">
                        <span class="block">Hiiii</span>
                      </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">how are you?</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/mlachheb.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Loremnsectetur adipisicing elit. </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">hdjnfjjfdnf?</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dconsectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">hrem nsectetur adipisicingrem nsectetur adipisicingu?</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem iponsectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">ffjgjgnfgjfgu</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem nsectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">hddddddm nsectetur adipisicingyou?</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">hoddmkdfmfdkfnndf</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>

                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/iidzim.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur . </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200  rounded-full shadow">
                        <span class="block">Hccccv</span>
                      </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">hobbbbbyo kjgjmg </span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorensectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/mlachheb.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elit. </span>
                        </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200  rounded-full shadow">
                        <span class="block">Hiiii</span>
                      </div>
                    </li>
                    <li class="flex justify-end">
                      <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
                        <span class="block">how are you?</span>
                      </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/oel-yous.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Lorem ipsum dolor sit, amet consectetur adipisicing elitdfpkdfmkfdkkfkdfkkdf. </span>
                        </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/mlachheb.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">Loremonsectetur adipisicing elit. </span>
                        </div>
                    </li>
                    <li class="flex justify-start items-center space-x-4">
                        <img src="../assets/mlachheb.jpeg" class="h-10 w-10 rounded-full  " alt="">
                        <div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
                            <span class="block">idsjkndjkjdjsnkddjtetur adipisicing elit. </span>
                        </div>
                    </li>
                  </ul>

                </div> -->

            
          <!-- </div> -->
        <!-- </div> -->
      </div>
    </div>
        </div>
        <div class=" h-small rounded relative mt-12">
            <div class="flex items-center justify-between  w-full p-3 border-t border-gray-800 ">
              <input type="text" placeholder="Message"
                class="block h-3/6 w-full bottom-2/4 translate-y-2/4 py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message" required />
              <button type="submit">
                <svg class="w-6 h-6 text-gray-500 bottom-2/4 translate-y-3/4 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {inject, ref} from 'vue';
    const joinRoom = ref(false)
    
    // const enterPassowrd = () => (joinRoom.value = !joinRoom.value)
    const store = inject('store')
    const props = defineProps({
        name: String
    })

</script>