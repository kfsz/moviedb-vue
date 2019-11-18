<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="movie in movies" :key="movie.title" :class="{'ma-0': $vuetify.breakpoint.smAndDown, 'ma-5': $vuetify.breakpoint.mdAndUp}">
        <v-card shaped class="mx-auto" width="300px">
          <v-img
            :src="getImgUrl(movie.poster_path)"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.8)"
            height="450px"
            width="300px"
          >
            <v-card-title v-text="movie.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-btn icon>
              <v-icon>mdi-information</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <span class="mr-2">Popularity: {{ movie.popularity }}</span>
            <span class="mr-2">Votes: {{ movie.vote_count }}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MovieDatabase",
  props: ['movies'],
  methods: {
    getImgUrl(path) {
      return process.env.VUE_APP_API_IMAGE_URL + path
    }
  },
  data: () => ({
    // data
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
// fix word wrapping on card titles
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>
