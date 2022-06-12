<template>
    <div class="queueContainer">
        <div class="widget">
            <div class="headerWidget">
                <v-icon
                    color="white"
                    x-large
                >
                    mdi-lightbulb-on-outline
                </v-icon>
                <h2 style="padding-left: 4px">Elemente</h2>
            </div>
            <Selection />
        </div>
        <div class="widget">
            <div class="headerWidget">
                <v-icon
                    color="white"
                    x-large
                >
                    mdi-menu
                </v-icon>
                <h2 style="padding-left: 4px">Warteschlange</h2>
            </div>
            <Queue />
        </div>
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
    }),
    methods: {
        async getCatFact() {
            const temp = JSON.parse(await backend.getCatFact());
            this.catFact = temp.fact;
        }
    }
}
</script>

<style scoped lang="scss">
.queueContainer {
    width: 100%;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
}

.widget {
    width: 49%;
    height: 100%;
    border-radius: 12px;
    background-color: var(--v-matrixBlack-base);
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)
}

.headerWidget {
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 48px;
    background-color: var(--v-green-base);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 16px;
    color: white;
}
</style>