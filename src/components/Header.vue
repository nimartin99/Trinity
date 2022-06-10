<template>
    <div class="headerContainer">
        <div style="display: flex; flex-direction: row; margin-left: 1vw">
            <v-icon
                x-large
                color="var(--v-lightGreen-base)"
            >
                mdi-sunglasses
            </v-icon>
            <h1 class="titleText">Trinity</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header"
}
</script>

<style scoped lang="scss">
.headerContainer {
    width: 100vw;
    height: 8vh;
    background-color: var(--v-matrixBlack-base);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.titleText {
    color: var(--v-lightGreen-base);
    font-family: "Roboto", sans-serif;
    height: fit-content;
    margin-left: 1vw;
}
</style>