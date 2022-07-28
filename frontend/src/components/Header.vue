<template>

<div v-if="store.state.player.status == 'offline'">
	<Signin />
  </div>
<div v-else>
  <nav class="sticky top-0 z-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded  bg-slate-900 ">
	<div class="container flex justify-between items-center mx-auto">
  <!-- logo -->
	  <a class="flex items-center"> 
		<router-link :to="{name:'Home'}">
		  <img src="../assets/pong.png" class="mr-3 h-6 sm:h-9 " alt="" />
		</router-link>
		<router-link :to="{name:'Home'}">
		  <span class="self-center text-xl font-semibold md:whitespace-nowrap text-gray-300"> <span class="logo">YDA PONG </span></span>
		</router-link>
	  </a>
  <!--  -->
  <!-- search navbar -->
	  <div class="flex md:order-1">
		<div class="hidden relative md:block w-80">
		  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
			<svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
		  </div>
		  <input type="text" onfocus="this.value=''" id="search-navbar" class=" block p-2 pl-10 w-full bg-slate-700 rounded-xl border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 border-gray-600 placeholder-gray-400 text-gray-300  focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." v-model="search">
			<div v-if="showSugg() == true"> 
			  <div v-for="user in matchingNames" :key="user" class=" z-10 bg-slate-700 rounded-md shadow-xl lg:absolute top-11  w-full absolute">
				<div v-if="user != store.state.player.username">
				  <router-link  :to="{ name:'User', params: {id: getUser(user)}}"> 
					<div class="block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100 border-b border-neutral-600">
					  {{ user }} </div>
				  </router-link>
				</div>
				<div v-else>
				  <router-link :to="{name:'profile'}">
				  <div class="block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100 border-b border-neutral-600">
					{{ user }} </div>
				</router-link>

				</div>
				
			  </div>
			</div>
		</div>        

	  </div>
	  
  <!--  -->
  <!-- home chat game user -->
	  <div class="justify-between items-center w-full flex  w-auto order-1 relative">
		<ul class="flex mt-4 flex-nowrap flex-row  mt-0 space-x-4 text-sm font-medium">
		  <li>
			<router-link :to="{name:'Home'}">
			  <a class="block py-2  pl-3 mt-1 border-0 p-0 hover:text-white text-gray-300  hover:bg-transparent border-gray-700" aria-current="page"> Home</a>
			</router-link>
		  </li>
		  <li>
			<router-link :to="{name :'Game'}">
			  <a class="block py-2  pl-3 mt-1 border-0 p-0 hover:text-white text-gray-300  hover:bg-transparent border-gray-700">Game</a>
			</router-link>
		  </li>
		  <li>
			<router-link :to="{name:'EmptyChat'}">
			  <a  class="block py-2  pl-3 mt-1 pr-4  border-0 p-0 text-gray-300 hover:text-white hover:bg-transparent border-gray-700">Chat</a>
			</router-link>
		  </li>
		  <li>
			  <button @click="show = !show" type="button" class="translate-y-1/4 bottom-2/4  flex mr-3 text-sm rounded-full md:mr-0 focus:ring-2 focus:ring-gray-300 focus:ring-gray-600"   data-dropdown-toggle="dropdown">
			  <img class="w-8 h-8 rounded-full bg-white " :src="store.methods.playerAvatar(store.state.player)" alt="">
			  <div v-if="show" class=" z-10 bg-slate-700 rounded-md shadow-xl lg:absolute top-11 right-0 w-44 absolute">
				<router-link  to="/Profile" class="block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100 border-b border-slate-800">
				  Profile </router-link> 
				<button type="button" @click="toggleModal()" class="w-44 block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100  border-b border-slate-800">Settings
				</button>
				<a  href="http://localhost:3001/auth/logout" class=" w-44 block px-4 py-2 text-sm text-indigo-100 hover:bg-slate-500 hover:text-indigo-100  ">Logout</a>
			  </div>
			</button>
		  </li>
		</ul>
	  </div>
	<!--  -->
	</div>
	<div v-if="showModal" class="fixed inset-60 z-50 ">
	  <div class=" my-6 mx-auto max-w-lg text-center ">
		<div class="border-0 rounded-lg shadow-lg w-full bg-white  ">
		  <div class=" p-5 border-b border-solid border-slate-200 rounded-t">
			<h3 class=" m-auto font-semibold text-xl">Settings </h3>
		  </div>
		  <div class=" grid gap-3 grid-cols-1  p-6  border-t border-solid border-slate-200 rounded-b">
			<button v-on:click="showChangeName = !showChangeName" class="pb-4 border-b text-gray-800 font-semibold" >Change Username</button> 
				<div v-if="showChangeName" class="border-b p-2 pb-4 space-x-4">
				  <span class="text-s "> Username :</span>
				  <input v-model="nickname" placeholder="max 10 letters" class=" border border-solid rounded" > 
				</div>
			<button v-on:click="showChangeAv = !showChangeAv" class="p-2 pb-4 border-b font-semibold text-gray-800">Change Avatar</button>
			  <div v-if="showChangeAv" class="border-b p-2 pb-4 space-x-4 w-full">
				<input type="file" accept="image/*" @change="onChange" class=" border border-solid rounded" > 
			  </div>
			  <button v-on:click="show2f = !show2f" class="pt-2 font-semibold text-gray-800">2FA Authentication</button>
			  <div v-if="store.state.player.two_fa == false">
				  <div v-if="show2f" class="border-t p-2 space-x-4">
					You have not activated 2FA. <a  class="text-xs text-teal-700" href="https://authy.com/what-is-2fa/" target="_blank"> What is 2FA Authentication ? </a>
					<button @click="generateFA" class="bg-neutral-300 rounded p-4 font-semibold  hover:bg-black hover:text-white"> Activate 2FA Authentication </button>              
				  </div>
				  <div v-if="showScan" class=" bg-gray-200 rounded"> 
					  <img v-if="qr.length >0 " :src="qr" class="p-8 mx-auto h-30 w-30 rounded" alt="">
					  <span v-else>Loading Qr...</span>
					  <label class="text-gray-600"> Type authentication code here </label>
					  <input v-model="Password2fa" type="text" maxlength="6" placeholder="123456" class=" mt-2 mb-4 pl-4 h-12 rounded ">
				  </div>
			  </div>
			  <div v-else>
					<h1 v-if="show2f == true" class="text-slate-500 border-t p-4 space-x-4 "> 2FA is already activated </h1>
			  </div>
		  </div>
		  <div class="flex items-center justify-center space-x-8  p-6 border-t border-solid border-slate-200 rounded-b">
			<button @click="closeSettings" class="text-gray-800 border border-solid white hover:bg-slate-800 hover:text-white  font-bold uppercase text-sm px-6 py-3 rounded outline-none    " type="button">
			  Close
			</button>
			<button @click="saveChanges()" class="text-gray-800 font-bold hover:border hover:rounded hover:border-solid hover:white hover:text-white hover:bg-slate-800 uppercase px-6 py-3 text-sm outline-none    " type="button">
			  Save Changes
			</button>
		  </div>
		</div>
	  </div>
	</div>
  </nav>

</div>
</template>

<script lang="ts" setup>
	import axios from 'axios';
	import { defineComponent ,  computed, ref, inject, onMounted } from 'vue';
	import Signin from '../views/Signin.vue'
	const store = inject('store')
	const nickname = ref('' as string)
	const showMenu = ref(false as boolean);
	const show = ref(false as boolean);
	const showModal = ref(false as boolean)
	const showChangeName= ref(false as boolean)
	const showChangeAv = ref(false as boolean)
	const show2f = ref(false as boolean)
	const showSearch = ref(false as boolean)
	const id = ref(0 as number)
	const search = ref('search...' as string)
	const image = ref(null as any)
	const ext = ref(''as string)
	const qr = ref('' as string)
	const showScan = ref(false)
	const Password2fa = ref('' as string) 
	function toggleNav () {showMenu.value = !showMenu.value}
	function toggleModal() {showModal.value = !showModal.value}
	function showSugg(){
	  if (search.value == '' || search.value == "search...")
		return false
	  return true
	}
	function getUser(username: string){
	  var result = store.state.users.find( x=> x.username === username)
	  return result.id
	}
	onMounted(async  () => {
		store.state.spinn = true
		await axios
			.get('http://localhost:3001/profile' ,{ withCredentials: true })
			.then(data =>{
			localStorage.clear();
			localStorage.setItem('user', data.data.cookie);
			store.state.player = data.data.profile;
			store.state.friends = data.data.friends;
			store.state.achievements = data.data.achievements;
			store.state.blockedUsers = data.data.blockedUsers
			store.state.spinn = false
		  } ) 
		  .catch(err => console.log(err.message))
		store.state.spinn = true
		await axios
			.get('http://localhost:3001/users' ,{ withCredentials: true })
			.then(data =>{ store.state.users = data.data ; store.state.spinn = false})
			.catch(err => console.log(err.message))
			

		// await axios //! to be replaced by socket solution
		// 	.get('http://localhost:3001/updateUsersStatus' ,{ withCredentials: true })
		// 	.then(() => {console.log('updated')})
		// 	.catch(err => console.log(err.message))
	})
	async function  generateFA(){
		store.state.spinn = true
		await axios
			.get('http://localhost:3001/settings/2fa/generate' ,{ withCredentials: true })
			.then(data =>{qr.value = "http://localhost:3001/"+data.data; store.state.spinn = false} ) 
			.catch(err => console.log(err.message))
		showScan.value = true
		console.log(qr.value)
	}


	async function enable2fa(){
		store.state.spinn = true
		  await axios
		  .post('http://localhost:3001/settings/2fa/enable', {Password2fa: Password2fa.value } , {withCredentials: true })
		  .then(() => {
			store.state.spinn = false
		  })
		  .catch((error) => console.log(error.response));
	}
	function saveChanges(){
	  if (nickname.value.length > 0)
		changeNickname(nickname.value)
	  if (ext.value.length > 0)
		changeAvatar()
	  if (Password2fa.value.length > 0)
		enable2fa()
	  showChangeAv.value = false;
	  show2f.value = false;
	//   showChangeName.value = false;
	  showScan.value = false;
	  nickname.value = '';
	  Password2fa.value = ''
	  qr.value = '';
	}
	async function changeNickname(newnickname: String){
		if (newnickname.length > 0 && newnickname.length <= 10){
			store.state.player.username = newnickname ;
			store.state.spinn = true
			await axios
				.patch('http://localhost:3001/settings/username' ,{username: newnickname} ,{ withCredentials: true })
				.then(data =>{ store.state.spinn = false })
				.catch(
					err => { 
						console.log(err.message);
						// if (err.response.status == 400){
							// console.log('Username already exists');  <!-- ! msg alert  -->
						// }
						return false;
					})
		}
	}
	async function changeAvatar(){
	  const formData = new FormData()
	  const imageName = store.state.player.username+'.' + ext.value
	  formData.append('avatar', image.value)
	  const headers = { 'Content-Type': 'multipart/form-data'};
	  store.state.spinn = true
	  await axios
		  .post(`http://localhost:3001/settings/avatar/${imageName}`, formData, {withCredentials: true , headers })
		  .then(() => { store.state.spinn = false })
		  .catch((error) => console.log(error.response));
	  store.state.player.avatar = imageName
	}
	function onChange(e){
	  image.value = e.target.files[0]
	  ext.value = image.value.name.split('.')[image.value.name.split.length - 1]
	}
	const matchingNames = computed(() => {
	  const a=[]
	  store.state.users.forEach(user => {
		a.push(user.username)
	  });
	  return a.filter((name) => name.startsWith(search.value))
	})

	function closeSettings(){
	  showChangeAv.value = false;
	  show2f.value = false;
	  showChangeName.value = false;
	  showScan.value = false;
	  nickname.value = '';
	  Password2fa.value = ''
	  qr.value = '';

	}
	// var avatar = "src/assets/"+ store.state.player.avatar
</script>