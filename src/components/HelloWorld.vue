<template>
    <div>
        <v-btn
          @click="getCurrentWeather()"
        >
          Get the current Weather
        </v-btn>
        <p>{{ weatherInfo }}</p>
        <v-btn
            @click="getCatFact()"
        >
            Get cat fact
        </v-btn>
        <p>{{ catFact }}</p>
    </div>
</template>

<script>
import * as backend from "@/api/backend";

export default {
    name: 'HelloWorld',

    data: () => ({
        weatherInfo: '',
        catFact: '',
    }),
    methods: {
        async getCurrentWeather() {
            this.weatherInfo = await backend.getWeather(49, 9, 'alert');
            console.log("getWeather()", this.weatherInfo);
        },
        async getCatFact() {
            const temp = JSON.parse(await backend.getCatFact());
            this.catFact = temp.fact;
            console.log("getCatFact()", this.catFact);
        }
    }
}
</script>
