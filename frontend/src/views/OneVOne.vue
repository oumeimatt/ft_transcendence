<template>
  <div>
    <Header />
    <div id="div-canvas">
        <canvas id="responsive-canvas" ref="game"></canvas>
        <p style="color:aquamarine; text-align: center;">{{ message }}</p>
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
    opponent: String,
})

let message = ref('' as String);
let socket = ref(null as unknown);
let context = ref({} as CanvasRenderingContext2D);
let game = ref({} as HTMLCanvasElement);
let playground = ref(null as PlaygroundInterface)

onMounted(() => {
    if (store.state.player.status === 'playing' || !props.difficulty || !props.opponent) {
        window.location.href = '/chat';
    }
    else {
        socket.value = io('http://' + /* window.loca tion.hostname */ 'localhost' + ':3001/' + props.difficulty, {
        query: {
                'role': 'player',
                'accessToken': localStorage.getItem('user'),
                'opponent': props.opponent
            },
        });
        if (game && game.value) {
            context.value = game.value.getContext("2d");

            // drawing game for player whos waiting
            DrawPlayerWaiting();

            // drawing game for second player if the other left
            DrawGameInterrupted();

            // Draw playground/ ball/ paddles / score in every update
            DrawGameEachUpdate();

            // User Already in Another Game
            ConnectedTwice();

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
            // if Key is pressed start moving the paddle
            window.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === "ArrowUp" || event.key === "w") {
                    (socket.value as Socket).emit("UpKeyPressed");
                }
                if (event.key === "ArrowDown" || event.key === "s") {
                    (socket.value as Socket).emit("DownKeyPressed");
                }
            });

            // if Key is unpressed stop moving the paddle
            window.addEventListener('keyup', (event: KeyboardEvent) => {
                if (event.key === "ArrowUp" || event.key == "w") {
                    (socket.value as Socket).emit("UpKeyUnpressed");
                }
                if (event.key === "ArrowDown" || event.key == "s") {
                    (socket.value as Socket).emit("DownKeyUnpressed");
                }
            });

            game.value.addEventListener('touchstart', (event: TouchEvent) => {
                event.preventDefault();
            });

            game.value.addEventListener('touchmove', (event: TouchEvent) => {
                const canvasBounds = game.value.getBoundingClientRect();
                if (
                    event.changedTouches[0].clientX >= canvasBounds.left
                    && event.changedTouches[0].clientX <= canvasBounds.right
                    && event.changedTouches[0].clientY >= canvasBounds.top
                    && event.changedTouches[0].clientY <= canvasBounds.bottom
                ) {
                    const facts = Draw.getFactors(
                    playground.value.width,
                    playground.value.height,
                    game.value.offsetWidth,
                    game.value.offsetWidth * 0.6,
                    );
                    (socket.value as Socket).emit('touchMove', {
                    y: (event.changedTouches[0].clientY - canvasBounds.top) * facts.horz
                    });
                }
            });

            game.value.addEventListener('mousemove', (event: MouseEvent) => {
                const canvasBounds = game.value.getBoundingClientRect();
                if (
                    event.clientX >= canvasBounds.left
                    && event.clientX <= canvasBounds.right
                    && event.clientY >= canvasBounds.top
                    && event.clientY <= canvasBounds.bottom
                ) {
                    const facts = Draw.getFactors(
                        playground.value.width,
                        playground.value.height,
                        game.value.offsetWidth,
                        game.value.offsetWidth * 0.6,
                    );
                    (socket.value as Socket).emit('touchMove', {
                        y: (event.clientY - canvasBounds.top) * facts.horz
                    });
                }
            });
        }
    }
});

onUnmounted(() => {
   if (socket != null) {
    (socket.value as Socket).disconnect();
   }
});
function ConnectedTwice() {
    (socket.value as Socket).on('alreadyInGame', (data) => {
        window.location.href = '/';
    });
}


function DrawPlayerWaiting() {
    (socket.value as Socket).on('WaitingForPlayer', (data) => {
    playground.value = data.playground;
    if (playground.value != null) {
            game.value.width = game.value.offsetWidth;
            game.value.height = game.value.width * 0.6;
            message.value = 'Player: ' + data.player + ' is ' + data.message;
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
        message.value = '';
    });
}

function DisplayWinner() {
    (socket.value as Socket).on("DisplayWinner", (data) => {
    const { winner, loser } = data;
    if (winner && loser) {
            message.value = winner + ' wins against ' + loser;
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
