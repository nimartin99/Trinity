<template>
  <v-app>
      <!-- If a navigation drawer will be needed comment this in
    <v-navigation-drawer app>
    </v-navigation-drawer>
    -->
    <Header />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->

        <!-- If using vue-router -->
        <Queue />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Header from "@/components/Header";
import Queue from "@/components/Queue";

export default {
  name: 'App',
    components: {Queue, Header},
    data: () => ({
    //
  }),
  methods: {
    ...mapActions([ 'initAxiosInstance' ]),
  },
  created() {
    this.initAxiosInstance();
  },
  beforeMount() {
  },
  mounted() {

  },
};
</script>

<style>
body, html {
    overflow: hidden
}
</style>
