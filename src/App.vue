<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-text-field
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        hint="Search The Movie DB"
        v-model="search"
        @change="searchDatabase"
        @click:prepend="searchDatabase"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn v-on:click="toggleTheme" target="_blank" text>
        <span class="mr-2">About</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <v-btn v-on:click="toggleTheme" target="_blank" text>
        <span class="mr-2">Toggle dark mode</span>
        <v-icon>mdi-compare</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <MovieDatabase />
    </v-content>

    <v-footer>
      <v-pagination
        v-model="page"
        :length="15"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :page="page"
        :total-visible="7"
      ></v-pagination>
    </v-footer>
  </v-app>
</template>

<script>
import MovieDatabase from "./components/MovieDatabase";

export default {
  name: "App",

  components: {
    MovieDatabase
  },

  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    searchDatabase() {
      alert(this.search);
    }
  },

  data: () => ({
    search: "",
    page: 1
  })
};
</script>
