<template>
    <div class="queueOptionsContainer">
        <v-tooltip top>
            <template v-slot:activator="{on}">
                <v-btn
                    fab
                    small
                    color="red"
                    style="margin-right: 4px"
                    v-on="on"
                    @click="$emit('delete')"
                >
                    <v-icon color="white">mdi-delete-empty</v-icon>
                </v-btn>
            </template>
            <span>Löschen</span>
        </v-tooltip>
        <div style="display: flex; flex-direction: column">
            <v-btn
                fab
                small
                :disabled="disableMoveUp"
                style="margin-bottom: 4px"
                @click="$emit('moveUp')"
            >
                <v-icon x-large>
                    mdi-menu-up
                </v-icon>
            </v-btn>
            <v-btn
                fab
                small
                :disabled="disableMoveDown"
                @click="$emit('moveDown')"
            >
                <v-icon x-large>
                    mdi-menu-down
                </v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "ElementQueueButtons",
    props: {
        disableMoveUp: {default: false},
        disableMoveDown: {default: false},
    },
}
</script>

<style scoped>
.queueOptionsContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>