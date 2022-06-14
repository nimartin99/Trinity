<template>
    <div class="selectionOptionsContainer">
        <v-btn
            fab
            @click="$emit('addElement')"
        >
            <v-icon>mdi-playlist-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "ElementSelectionButtons"
}
</script>

<style scoped>
.selectionOptionsContainer {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
}
</style>