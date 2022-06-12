<template>
    <div class="selectionContainer">
        <div class="element">
            <span class="elementTitle centeredFlexRow">
                Farbe
            </span>
            <div class="elementOptions centeredFlexRow">
                <v-menu
                    v-model="colorPickerMenu"
                    offset-y
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            style="width: 32px; height: 32px; border: 2px solid rgba(231, 231, 231, 0.7)"
                            :style="'background-color: ' + selectedColor"
                            v-on="on"
                            v-bind="attrs"
                        />
                    </template>
                    <v-color-picker
                        v-model="selectedColor"
                    />
                </v-menu>
            </div>
            <div class="elementQueueButtons centeredFlexRow">

            </div>
        </div>
    </div>
</template>

<script>
export default {
name: "Selection",
    data: () => ({
        // Farbe
        colorPickerMenu: false,
        selectedColor: '#FFFFFF',
    }),
    methods: {

    }
}
</script>

<style scoped>
.selectionContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.element {
    width: 100%;
    height: 100px;
    border: solid 2px rgba(231, 231, 231, 0.3);
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
}

.elementTitle {
    width: 40%;
    height: 100%;
}

.elementOptions {
    width: 30%;
    height: 100%;
}

.elementQueueButtons {
    width: 30%;
    height: 100%;
}

.centeredFlexRow {
    display: flex;
    align-items: center;
}
</style>