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
        <span class="mr-2 hidden-sm-and-down">About</span>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <v-btn v-on:click="toggleTheme" target="_blank" text>
        <span class="mr-2 hidden-sm-and-down">Toggle dark mode</span>
        <v-icon>mdi-compare</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <MovieDatabase :movies="this.movies" />
    </v-content>

    <v-footer>
      <v-pagination
        v-model="page"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :length="length"
        :page="page"
        total-visible=7
        @input="get"
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
    },
    get() {
      const axios = require("axios");
      let Config = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          language: "en-US",
          sort_by: "popularity.desc",
          page: this.page
        }
      };
      axios
        .get(`${process.env.VUE_APP_API_URL}discover/movie/?`, Config)
        .then(response => {
          this.movies = response.data.results;
          console.log(this.movies);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.get();
  },
  data: () => ({
    search: "",
    page: 1,
    length: 15,
    movies: []
  })
};
</script>
