<template>
    <div>
    <Header />
    <div v-if="message !== ''">
        <div class="mt-24 text-center text-gray-200 text-2xl font-bold mb-2">
            <h1>{{ message }}</h1>
        </div>
        <div class="grid grid-rows-2 content-center gap-y-2 text-center "> 
            <router-link class="mt-4 cursor-pointer mx-auto bg-slate-400 w-4/12 pt-2 h-12 rounded text-xl font-bold hover:bg-slate-700 hover:ring-white ring-2  hover:text-gray-100" :to="{name: 'WatchGames'}">
            Back to List of Streams
            </router-link>
        </div>
    </div>
    <div v-else id="div-canvas">
        <canvas id="responsive-canvas" ref="game"></canvas>
        <p style="color:aquamarine; text-align: center;">{{ winnerDisplay }}</p>
    </div>
    <Footer />
    </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, ref } from 'vue';
const store = inject('store')
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { io, Socket } from 'socket.io-client';
import { PlaygroundInterface } from '../interfaces';
import Draw from '../utils/Draw';

const props = defineProps({
    difficulty: String,
    roomname: String
})

let socket = ref(null as unknown);
let context = ref({} as CanvasRenderingContext2D);
let game = ref({} as HTMLCanvasElement);
let playground = ref(null as PlaygroundInterface);
let message = ref('' as String);
let winnerDisplay = ref('' as String);

onMounted(() => {
    if (!props.difficulty || !props.roomname)
    {
        window.location.href = '/watchgames';
    }
    else {
        socket.value = io('http://' + /* window.loca tion.hostname */ 'localhost' + ':3001/' + props.difficulty, {
        query: {
                'role': 'spectator',
                'roomname': props.roomname
            },
        });

        context.value = game.value.getContext("2d");

        // drawing game for second player if the other left
        DrawGameInterrupted();

        // Draw playground/ ball/ paddles / score in every update
        DrawGameEachUpdate();

        // Display Winner at end of Game
        DisplayWinner();


        // render
        window.addEventListener('resize', () => {
        game.value.width = game.value.offsetWidth;
        game.value.height = game.value.width * 0.6;
        Draw.updatePlayground(
            playground.value,
            context.value,
            game.value.width,
            game.value.height,
            playground.value.player1,
            playground.value.player2,
        );
        });
        // Print Message if The Room Wasn't Found
        RoomNotFound();
    }
});

onUnmounted(() => {
   if (socket != null) {
    (socket.value as Socket).disconnect();
   }
});

function DrawGameInterrupted() {
    (socket.value as Socket).on("gameInterrupted", (data) => {
    playground.value = data.playground;
    if (playground.value != null) {
            game.value.width = game.value.offsetWidth;
            game.value.height = game.value.width * 0.6;
            Draw.updatePlayground(
                playground.value,
                context.value,
                game.value.width,
                game.value.height,
                playground.value.player1,
                playground.value.player2,
            );
        }
    });
}

function DrawGameEachUpdate() {
    (socket.value as Socket).on("updatePlayground", (data) => {
    playground.value = data.playground;
    if (playground.value != null) {
            game.value.width = game.value.offsetWidth;
            game.value.height = game.value.width * 0.6;
            Draw.updatePlayground(
                playground.value,
                context.value,
                game.value.width,
                game.value.height,
                playground.value.player1,
                playground.value.player2,
            );
        }
    });
}

function RoomNotFound() {
    (socket.value as Socket).on("roomnotfound", (data) => {
        console.log('RoomNotFound');
        if (data.message) {
            message.value = data.message;
        }
    });
}

function DisplayWinner() {
    (socket.value as Socket).on("DisplayWinner", (data) => {
    const { winner, loser } = data;
    if (winner && loser) {
            winnerDisplay.value = winner + ' wins against ' + loser;
        }
    });
}

</script>
<style scoped>
#div-canvas{
  width: auto;
  max-width: 1200px;
  height: auto;
  max-height: 1200px;
  margin: 0 auto;
}

canvas#responsive-canvas {
  width: 100%;
  position: relative;
}
</style>