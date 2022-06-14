<template>
    <div class="queueContainer">
        <div class="elementSelection">
            <span class="elementTitle centeredFlexRow">
                Farbe
            </span>
            <div class="elementOptions centeredFlexRow">
                <v-menu
                    v-model="singleColorColorPickerMenu"
                    offset-y
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            style="width: 32px; height: 32px; border: 2px solid rgba(231, 231, 231, 1)"
                            class="option"
                            :style="'background-color: ' + colorSingleColor"
                            v-on="on"
                            v-bind="attrs"
                        />
                    </template>
                    <v-color-picker
                        v-model="colorSingleColor"
                        class="option"
                    />
                </v-menu>
                <DurationSelector
                    :default-duration="singleColorDuration"
                    class="option"
                    @durationChange="(duration) => { singleColorDuration = duration }"
                />
            </div>
            <div class="elementQueueButtons centeredFlexRow">
                <ElementSelectionButtons
                    @addElement="addSingleColor()"
                />
            </div>
        </div>

        <div class="elementSelection">
            <span class="elementTitle centeredFlexRow">
                Text
            </span>
            <div class="elementOptions centeredFlexRow">
                <v-text-field
                    v-model="text"
                    dense
                    solo
                    hide-details
                    placeholder="HHN"
                    :style="'color: ' + colorText"
                    class="option"
                />
                <v-menu
                    v-model="textColorPickerMenu"
                    offset-y
                    :close-on-content-click="false"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <div
                            style="width: 32px; height: 32px; border: 2px solid rgba(231, 231, 231, 1)"
                            :style="'background-color: ' + colorText"
                            v-on="on"
                            v-bind="attrs"
                            class="option"
                        />
                    </template>
                    <v-color-picker
                        v-model="colorText"
                    />
                </v-menu>
                <DurationSelector
                    :default-duration="textDuration"
                    class="option"
                    @durationChange="(duration) => { textDuration = duration }"
                />
            </div>
            <div class="elementQueueButtons centeredFlexRow">
                <ElementSelectionButtons
                    @addElement="addText()"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ElementSelectionButtons from "@/components/SelectionComponents/ElementSelectionButtons";
import DurationSelector from "@/components/SelectionComponents/DurationSelector";
export default {
name: "Selection",
    components: {DurationSelector, ElementSelectionButtons},
    data: () => ({
        // Farbe
        singleColorColorPickerMenu: false,
        colorSingleColor: '#8a198a',
        singleColorDuration: '00:00:05',

        // Text
        text: 'HHN',
        textColorPickerMenu: false,
        colorText: '#053087', // HHN Logo color
        textDuration: '00:00:05',
    }),
    methods: {
        convertTimeStringToSeconds(timeString) {
            const date = new Date(1970, 0, 1, parseInt(timeString.substring(0, 2)) + 1, timeString.substring(3, 5), timeString.substring(6, 8));
            return date.getTime() / 1000;
        },
        addSingleColor() {
            this.$emit("addSingleColor", this.colorSingleColor, this.convertTimeStringToSeconds(this.singleColorDuration));
        },

        addText() {
            this.$emit("addText", this.text, this.colorText, this.convertTimeStringToSeconds(this.textDuration));
        },
    }
}
</script>

<style scoped>
.elementSelection {
    width: 100%;
    height: 100px;
    border-bottom: solid 2px rgba(231, 231, 231, 0.5);
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
}

.queueContainer {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
}

.elementTitle {
    width: 30%;
    height: 100%;
    font-size: x-large;
}

.elementOptions {
    width: 50%;
    height: 100%;
}

.option {
    margin: 0 4px !important;
}

.elementQueueButtons {
    width: 20%;
    height: 100%;
}

.centeredFlexRow {
    display: flex;
    align-items: center;
}
</style>