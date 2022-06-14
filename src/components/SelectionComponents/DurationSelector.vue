<template>
    <div>
        <v-tooltip top>
            <template v-slot:activator="{ on }">
                <div class="timerSelectionContainer">
                    <v-btn>
                        <input
                            v-model="time"
                            ref="timePicker"
                            type="time"
                            step="1"
                            style="cursor: pointer"
                            v-on="on"
                        >
                    </v-btn>
                </div>
            </template>
            <div class="tooltipContainer">
                <span>Dauer auswählen</span>
                <span>Stunden : Minuten : Sekunden</span>
            </div>
        </v-tooltip>
    </div>
</template>

<script>
export default {
    name: "DurationSelector",
    props: {
        defaultDuration: {required: true}
    },
    data: () => ({
        time: null,
    }),
    mounted() {
        this.time = this.defaultDuration;
    },
    watch: {
        time() {
            this.$emit("durationChange", this.time);
        }
    }
}
</script>

<style scoped lang="scss">
.timerSelectionContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
}

.tooltipContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>