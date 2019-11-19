<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn v-on:click="start" text>
        <div class="d-flex align-center">
          <v-img
            alt="Movie DB Logo"
            class="shrink mr-2"
            contain
            :src="require('./../public/panda-bear.png')"
            transition="scale-transition"
            width="40"
          />

          <span
            class="headline font-weight-light shrink mt-1 hidden-sm-and-down"
            >Movie DB</span
          >
        </div>
      </v-btn>

      <v-spacer></v-spacer>

      <v-text-field 
        hide-details
        prepend-icon="mdi-magnify"
        single-line
        hint="Search The Movie DB"
        v-model="search"
        @keydown.enter="$event.target.blur()"
        @blur="searchStart"
        @click:prepend="searchStart"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn @click.stop="dialog = true" target="_blank" text>
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

    <v-dialog v-model="dialog" width="60%" overlay-opacity="0.9">
      <v-card>
        <v-card-title class="headline background">
          Movie Database
        </v-card-title>

        <v-card-text class="background">
          <div>
            Source available on
            <a href="https://github.com/kfsz/moviedb-vue" title="MovieDB Source"
              >GitHub</a
            >
          </div>
          <div>
            Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
              >Freepik</a
            >
            from
            <a href="https://www.flaticon.com/" title="Flaticon"
              >www.flaticon.com</a
            >
          </div>
          <div>
            This product uses the TMDb API but is not endorsed or certified by TMDb.
          </div>
        </v-card-text>

        <v-card-actions class="background">
          <v-img
            alt="The Movie DB Logo"
            class="shrink mr-2"
            contain
            :src="require('./../public/moviedb.png')"
            transition="scale-transition"
            width="160"
          />
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-footer>
      <v-pagination
        v-model="page"
        :next-icon="nextIcon"
        :prev-icon="prevIcon"
        :length="length"
        :page="page"
        total-visible="7"
        @input="changePage"
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
    start() {
      this.search = "";
      this.page = 1;
      this.get();
    },
    changePage() {
      if (this.search == "") this.get();
      else this.searchDatabase();
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
        .get(`${process.env.VUE_APP_API_URL}discover/movie?`, Config)
        .then(response => {
          this.movies = response.data.results;
          this.length = response.data.total_pages;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchStart() {
      this.page = 1;
      this.searchDatabase();
    },
    searchDatabase() {
      const axios = require("axios");
      let Config = {
        params: {
          api_key: process.env.VUE_APP_API_KEY,
          language: "en-US",
          query: this.search,
          page: this.page
        }
      };
      axios
        .get(`${process.env.VUE_APP_API_URL}search/movie?`, Config)
        .then(response => {
          this.movies = response.data.results;
          this.length = response.data.total_pages;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
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
    movies: [],
    dialog: false
  })
};
</script>
