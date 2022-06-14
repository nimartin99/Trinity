<template>
    <div class="durationBarContainer">
        <span :style="'color: ' + progressTextColor">
            {{ getProgress() }}
        </span>
        <v-progress-linear
            :value="progress *  100 / duration"
            :buffer-value="100"
            style="width: 65%"
        />
    </div>
</template>

<script>
export default {
    name: "DurationBar",
    props: {
        duration: {type: Number, required: true},
        progress: {type: Number, required: true},
        progressTextColor: {type: String, required: true, default: 'white'}
    },
    methods: {
        getProgress() {
            if(this.duration >= 3600) {
                const durationHours = Math.floor(this.duration / 3600);
                const durationMinutes = Math.floor((this.duration - durationHours * 3600) / 60);
                const durationSeconds = this.duration % 60;
                const progressHours = Math.floor(this.progress / 3600);
                const progressMinutes = Math.floor((this.progress - progressHours * 3600) / 60);
                const progressSeconds = this.progress % 60
                const duration = `${durationHours < 10 ? 0 : ''}${durationHours}:${durationMinutes < 10 ? 0 : ''}${durationMinutes}:${durationSeconds < 10 ? 0 : ''}${durationSeconds}`;
                const progress = `${progressHours < 10 ? 0 : ''}${progressHours}:${progressMinutes < 10 ? 0 : ''}${progressMinutes}:${progressSeconds < 10 ? 0 : ''}${progressSeconds}`;
                return progress + " / " + duration;
            } else if(this.duration >= 60) {
                const durationMinutes = Math.floor(this.duration / 60);
                const durationSeconds = this.duration % 60;
                const progressMinutes = Math.floor(this.progress / 60);
                const progressSeconds = this.progress % 60
                const duration = `${durationMinutes < 10 ? 0 : ''}${durationMinutes}:${durationSeconds < 10 ? 0 : ''}${durationSeconds}`;
                const progress = `${progressMinutes < 10 ? 0 : ''}${progressMinutes}:${progressSeconds < 10 ? 0 : ''}${progressSeconds}`;
                return progress + " / " + duration;
            } else {
                const durationSeconds = this.duration % 60;
                const progressSeconds = this.progress % 60
                const duration = `${durationSeconds < 10 ? 0 : ''}${durationSeconds}`;
                const progress = `${progressSeconds < 10 ? 0 : ''}${progressSeconds}`;
                return progress + " / " + duration;
            }
        },
    }
}
</script>

<style scoped>
.durationBarContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
</style>