<template>
    <v-container fluid>
        <v-row>
            <v-col>
                Hello world!
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <HelloWorld />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
    name: "Home",
    components: {
        HelloWorld
    }
}
</script>

<style scoped lang="scss">

</style>
