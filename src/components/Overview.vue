<template>
    <div class="overviewContainer">
        <div class="widget">
            <div
                class="headerWidget"
                style="background-color: var(--v-header1-base)"
            >
                <div style="display: flex; flex-direction: row">
                    <v-icon
                        color="white"
                        large
                    >
                        mdi-lightbulb-on-outline
                    </v-icon>
                    <h2 style="padding-left: 4px">Elemente</h2>
                </div>
            </div>
            <Selection
                @addSingleColor="(color, duration) => { addElementToQueue( {type: 'singleColor', color, duration}) }"
                @addText="(text, color, duration) => { addElementToQueue({type: 'text', text, color, duration}) }"
            />
        </div>
        <div class="widget">
            <div
                class="headerWidget"
                style="background-color: var(--v-header2-base)"
            >
                <div style="display: flex; flex-direction: row; width: 30%">
                    <v-icon
                        color="white"
                        x-large
                    >
                        mdi-menu
                    </v-icon>
                    <h2 style="padding-left: 4px">Warteschlange</h2>
                </div>
                <v-btn
                    text
                    fab
                    small
                    @click="toggleQueue"
                >
                    <v-icon
                        color="white"
                    >
                        {{ queuePlaying ? 'mdi-pause' : 'mdi-play' }}
                    </v-icon>
                </v-btn>
                <div style="display: flex; justify-content: flex-end; width: 30%">
                    <v-tooltip top>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                                v-on="on"
                                v-bind="attrs"
                                style="width: 36px; min-width: 36px; margin-right: 8px"
                                @click="changeLoopMode"
                            >
                                <v-icon>mdi-reload</v-icon>
                                <v-icon
                                    v-if="loopMode === 'noLoop'"
                                    style="position: absolute"
                                    x-large
                                >
                                    mdi-close
                                </v-icon>
                                <span
                                    v-if="loopMode === 'loopOne'"
                                    style="position: absolute; top: 4px; left: 6px; font-weight: bold"
                                >
                                    1
                                </span>
                            </v-btn>
                        </template>
                        <span>{{ loopMode === 'loopWhole' ? 'Alles wiederholen' : loopMode === 'loopOne' ? 'Oberstes wiederholen' : 'Nichts wiederholen' }}</span>
                    </v-tooltip>
                    <v-tooltip top>
                        <template v-slot:activator="{on, attrs}">
                            <v-btn
                                v-on="on"
                                v-bind="attrs"
                                style="width: 36px; min-width: 36px"
                                @click="shuffleQueue"
                            >
                                <v-icon>mdi-shuffle-variant</v-icon>
                            </v-btn>
                        </template>
                        <span>Warteschlange mischen</span>
                    </v-tooltip>
                </div>
            </div>
            <Queue
                :queue="queue"
                :queue-playing="queuePlaying"
                @moveUp="moveElementUp"
                @moveDown="moveElementDown"
                @delete="deleteElement"
                @stopQueue="queuePlaying = false"
            />
        </div>
        <v-snackbar
            v-model="snackbar"
            bottom
            :color="snackbarColor"
            timeout="6000"
        >
            <span style="margin-left: 15px">{{ snackbarText }}</span>
        </v-snackbar>
    </div>
</template>

<script>
import * as backend from "@/api/backend";
import Queue from "@/components/Queue";
import Selection from "@/components/Selection";

export default {
    name: 'Overview',
    components: {Selection, Queue},
    data: () => ({
        weatherInfo: '',
        catFact: '',
        queue: [],
        queuePlaying: false,
        loopMode: 'noLoop',

        snackbar: false,
        snackbarText: '',
        snackbarColor: 'success',
    }),
    methods: {
        async getCatFact() {
            const temp = JSON.parse(await backend.getCatFact());
            this.catFact = temp.fact;
        },
        addElementToQueue(elementObject) {
            this.queue.push(elementObject);
        },
        moveElementUp(index) {
            this.moveElementInArray(this.queue, index, index - 1);
        },
        moveElementDown(index) {
            this.moveElementInArray(this.queue, index, index + 1);
        },
        deleteElement(index) {
            this.queue.splice(index, 1);
        },
        moveElementInArray(arr, old_index, new_index) {
            const element = arr[old_index];
            arr.splice(old_index, 1);
            arr.splice(new_index, 0, element);
        },
        shuffleQueue() {
            this.queue = this.shuffle(JSON.parse(JSON.stringify(this.queue)));
        },
        shuffle(a) {
            let j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        toggleQueue() {
            if(this.queue.length > 0) {
                this.queuePlaying = !this.queuePlaying;
            } else {
                this.queuePlaying = false;
                this.showSnackbar("Es ist kein Element in der Warteschlange.", "error");
            }
        },
        showSnackbar(text, color) {
            this.snackbarText = text;
            this.snackbarColor = color;
            this.snackbar = true;
        },
        changeLoopMode() {
            switch (this.loopMode) {
                case "noLoop":
                    this.loopMode = "loopWhole";
                    break;
                case "loopWhole":
                    this.loopMode = "loopOne";
                    break;
                case "loopOne":
                    this.loopMode = "noLoop";
                    break;
            }
        }
    }
}
</script>

<style scoped lang="scss">
.overviewContainer {
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    background-image: url("../assets/matrix.gif");
    background-size: cover;
}

.widget {
    width: 49%;
    height: 100%;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)
}

.headerWidget {
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    color: white;
}
</style>