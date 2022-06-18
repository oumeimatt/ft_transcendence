<template>
		<div class="col-span-4 h-screen ">
				<div v-if="usersInfo(name)" class="relative h-small bg-slate-800 space-x-12">
						<img :src="usersInfo(name).pdp" class="  absolute rounded-full left-4 h-12 w-12 bottom-2/4 translate-y-2/4 " alt="">
						<h1  class="absolute font-bold text-2xl left-6 text-gray-400 bottom-2/4 translate-y-2/4"> {{ usersInfo(name).name }} </h1>
				</div>
				<div class=" max-h-4/5 h-full scrollbar scrollbar-track-zinc-900 scrollbar-thumb-zinc-600 ">
						<div>
						 <div class="w-full">

								<div class="relative w-full p-6 overflow-y-auto">

									<ul class="space-y-2">
										<li class="flex justify-start items-center space-x-4">
												<img v-if="usersInfo(name)" :src="usersInfo(name).pdp" class="h-10 w-10 rounded-full  " alt="">
												<div class="relative max-w-xl px-4 py-2 bg-slate-600 text-gray-300 rounded-full shadow">
														<span class="block">Hidsdsdsdksmdksmkdlmsdkls</span>
												 </div>
										</li>
										<li class="flex justify-end">
											<div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-200 rounded-full shadow">
												<span class="block">allalalaljsjjsjd</span>
											</div>
										</li>
									</ul>

								</div>

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
	const store = inject('store')
    const props = defineProps({
            name: String
    })
    function usersInfo(name: string){
        for (var user of store.state.users) {
            if (user.name == name){
                return user
            }
        }
        return null
    }
</script>