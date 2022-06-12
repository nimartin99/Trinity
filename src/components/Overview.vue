<template>
    <div class="queueContainer">
        <div class="widget">
            <div class="headerWidget">
                <h2>Elemente</h2>
            </div>
        </div>
        <div class="widget">
            <div class="headerWidget">
                <h2>Warteschlange</h2>
            </div>

        </div>
    </div>
</template>

<script>
import * as backend from "@/api/backend";

export default {
    name: 'Queue',

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
}

.headerWidget {
    border-radius: 12px 12px 0 0;
    width: 100%;
    height: 48px;
    background-color: var(--v-green-base);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
    color: white;
}
</style>