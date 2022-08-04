<template>
    <div class="queueContainer">
        <div v-for="(element, index) in queue" :key="index" class="elementQueue">
            <!-- Single color -->
            <div v-if="element && element.type === 'singleColor'" class="singleColorContainer"
                :style="'background-color: ' + element.color">
                <div class="elementInfo">
                    <span style="font-size: x-large"
                        :style="isColorTooBrightForWhite(element.color) ? 'color: black' : 'color: white'">
                        Farbe
                    </span>
                    <DurationBar v-if="index === 0" :duration="element.duration" :progress="currentElementProgress"
                        :progress-text-color="isColorTooBrightForWhite(element.color) ? 'black' : 'white'" />
                </div>
                <ElementQueueButtons :disable-move-up="index === 0" :disable-move-down="index === queue.length - 1"
                    style="position: absolute; right: 32px;" @moveDown="moveElementDown(index)"
                    @moveUp="moveElementUp(index)" @delete="deleteElement(index)" />
            </div>

            <!-- Weather -->
            <div v-if="element && element.type === 'weather'" class="weatherContainer"
                :style="'background-color: ' + element.bgColor">
                <div class="elementInfo">
                    <span style="font-size: x-large" :style="'color: ' + element.color">
                        Regen 27°C
                    </span>
                    <DurationBar v-if="index === 0" :duration="element.duration" :progress="currentElementProgress"
                        :progress-text-color="isColorTooBrightForWhite(element.color) ? 'black' : 'white'" />
                </div>
                <ElementQueueButtons :disable-move-up="index === 0" :disable-move-down="index === queue.length - 1"
                    style="position: absolute; right: 32px;" @moveDown="moveElementDown(index)"
                    @moveUp="moveElementUp(index)" @delete="deleteElement(index)" />
            </div>

            <!-- Text -->
            <div v-if="element && element.type === 'text'" class="textContainer"
                :style="'background-color: ' + element.bgColor">
                <div class="elementInfo">
                    <span style="margin: auto; font-size: xxx-large" :style="'color: ' + element.color">
                        {{ element.text }}
                    </span>
                    <DurationBar v-if="index === 0" :duration="element.duration" :progress="currentElementProgress"
                        :progress-text-color="isColorTooBrightForWhite(element.bgColor) ? 'black' : 'white'" />
                </div>
                <ElementQueueButtons :disable-move-up="index === 0" :disable-move-down="index === queue.length - 1"
                    style="position: absolute; right: 32px;" @moveDown="moveElementDown(index)"
                    @moveUp="moveElementUp(index)" @delete="deleteElement(index)" />
            </div>
        </div>
    </div>
</template>

<script>

import ElementQueueButtons from "@/components/QueueComponents/ElementQueueButtons";
import DurationBar from "@/components/QueueComponents/DurationBar";
import { stringify } from "querystring";
export default {
    name: "Queue",
    components: {DurationBar, ElementQueueButtons},
    props: {
        queue: {type: Array, required: true},
        queuePlaying: {type: Boolean, required: true},
    },
    data: () => ({
        api_key: '22b001ab26511ebd68eb57328e0a4a2b',
        url_base: 'https://api.openweathermap.org/data/2.5',
        weather: {},
        location: 'Heilbronn',

        currentElementProgress: 0,
        clock: null,
        loopMode: 'loopWhole'
    }),
    watch: {
        queuePlaying() {
            if(this.queuePlaying) {
                this.startClock();
            } else {
                clearInterval(this.clock);
            }
        },
    },
    methods: {
        startClock() {
            this.clock = setInterval(() => {
                // Emergency exit if something bugs (not working just preventing further bugs WIP)
                if(this.queue[0] === undefined) {
                    clearInterval(this.clock);
                    return;
                }
                if (this.currentElementProgress >= this.queue[0].duration) {
                    if (this.loopMode == 'noLoop') {
                        this.$emit('delete', 0);
                    }
                    if (this.loopMode == 'loopWhole') {
                        this.moveElementBottom(0);
                    }
                    clearInterval(this.clock);
                    this.currentElementProgress = 0;
                    if(this.queue.length > 0) {
                        this.startClock();
                        if (String(queue[1].type).valueOf == 'weather'.valueOf) {
                            this.fetchWeather();
                            console.log('hi')
                        }
                    } else {
                        this.$emit("stopQueue");
                    }
                } else {
                    this.currentElementProgress++;
                }
            }, 1000);
        },

        isColorTooBrightForWhite(color) {
            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            result = {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            };
            return result.r > 200 && result.g > 200 && result.b > 200;
        },

        deleteElement(index) {
            if(index === 0) {
                this.currentElementProgress = 0;
                clearInterval(this.clock);
                this.$emit('delete', index);
                if(this.queue.length > 0 ) {
                    this.startClock();
                }
            } else {
                this.$emit('delete', index);
            }
        },
        
        moveElementDown(index) {
            if(index === 0) {
                this.currentElementProgress = 0;
                clearInterval(this.clock);
                this.$emit('moveDown', index);
                if(this.queue.length > 0 && this.queuePlaying) {
                    this.startClock();
                }
            } else {
                this.$emit('moveDown', index);
            }
        },
        moveElementBottom(index) {
            if (index === 0) {
                this.currentElementProgress = 0;
                clearInterval(this.clock);
                for (let i = index; i < this.queue.length; i++){
                    this.$emit('moveDown', i);
                }
                
                if (this.queue.length > 0 && this.queuePlaying) {
                    this.startClock();
                }
            } else {
                for (let i = index; i < this.queue.length; i++){
                    this.$emit('moveDown', i);
                }
            }
        },

        moveElementUp(index) {
            if (index === 1) {
                this.currentElementProgress = 0;
                clearInterval(this.clock);
                this.$emit('moveUp', index);
                if(this.queue.length > 0 && this.queuePlaying) {
                    this.startClock();
                }
            } else {
                this.$emit('moveUp', index);
            }
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
        },

                fetchWeather() {
            fetch(`${this.url_base}weather?q=${this.location}&units=metric&APPID=${this.api_key}`)
                .then(res => {
                    return res.json();
                }).then(this.setResults);
        },

        setResults(results) {
            this.weather = results;
        }
    }
}


</script>

<style scoped>

.elementQueue {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    border-bottom: solid 2px rgba(231, 231, 231, 0.5);
}

.queueContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.singleColorContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.weatherContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.textContainer {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.elementInfo {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
</style>