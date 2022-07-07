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
import { inject, onMounted, ref } from 'vue';
const store = inject('store')
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { io, Socket } from 'socket.io-client';
import { PlaygroundInterface } from '../interfaces';
import Draw from '../utils/Draw';

const props = defineProps({
    difficulty: String
})

let message = ref('' as String);
let socket = ref(null as unknown);
let context = ref({} as CanvasRenderingContext2D);
let game = ref({} as HTMLCanvasElement);
let playground = ref(null as PlaygroundInterface);

onMounted(() => {
    if (props.difficulty) {
        socket.value = io('http://' + /* window.location.hostname */ 'localhost' + ':5000/' + props.difficulty, {
        query: {
            'role': 'player'
        },
        });

        context.value = game.value.getContext("2d");

        // drawing game on gameStarted event
        DrawGameStarted();

        // drawing game for player whos waiting
        DrawPlayerWaiting();

        // drawing game for second player if the other left
        DrawGameInterrupted();

        // Draw playground/ ball/ paddles / score in every update
        DrawGameEachUpdate();

        // render
        window.addEventListener('resize', () => {
        game.value.width = game.value.offsetWidth;
        game.value.height = game.value.width * 0.6;
        Draw.updatePlayground(
            playground.value,
            context.value,
            game.value.width,
            game.value.height
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
    } else {
       window.location.href = '/game';
    }
});

function DrawGameStarted() {
    (socket.value as Socket).on('GameStarted', (data) => {
    console.log("Game Started");
    playground.value = data.playground;
    if (playground.value != null) {
            game.value.width = game.value.offsetWidth;
            game.value.height = game.value.width * 0.6;
            Draw.clearContext(
            context.value,
            game.value.width,
            game.value.height
        );
        message.value = 'Room: ' + data.room + ' Players: [' + data.player1 + ', ' + data.player2 + ']';
    }
    });
}

function DrawPlayerWaiting() {
    (socket.value as Socket).on('WaitingForPlayer', (data) => {
    console.log("Game On Wait");
    playground.value = data.playground;
    if (playground.value != null) {
                game.value.width = game.value.offsetWidth;
                game.value.height = game.value.width * 0.6;
                message.value = 'Player: ' + data.player + ' is ' + data.message;
                Draw.updatePlayground(
                playground.value,
                context.value,
                game.value.width,
                game.value.height
            );
        }
    });
}

function DrawGameInterrupted() {
    (socket.value as Socket).on("gameInterrupted", (data) => {
    console.log("Game Interrupted");
    playground.value = data.playground;
    if (playground.value != null) {
            game.value.width = game.value.offsetWidth;
            game.value.height = game.value.width * 0.6;
            message.value = 'Second Player Left';
            Draw.updatePlayground(
            playground.value,
            context.value,
            game.value.width,
            game.value.height
        );
    }
    });
}

function DrawGameEachUpdate() {
    (socket.value as Socket).on("updatePlayground", (data) => {
    console.log("update Playground");
    playground.value = data.playground;
    if (playground.value != null) {
            game.value.width = game.value.offsetWidth;
            game.value.height = game.value.width * 0.6;
            Draw.updatePlayground(
            playground.value,
            context.value,
            game.value.width,
            game.value.height
        );
    }
    });
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
