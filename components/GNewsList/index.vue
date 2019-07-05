<template>
  <v-container class="pa-0" grid-list-lg>
    <v-layout row wrap>
      <v-flex
        v-for="article in articles"
        :key="article.id"
        xs12
        sm8
        offset-sm2
        md6
        offset-md3
      >
        <v-card>
          <v-card-title>
            <div>
              <h2>
                {{ article.title }}
              </h2>
              <span class="accent--text">
                {{ dateToString(article.created_at) }}
              </span>
            </div>
          </v-card-title>
          <v-divider />
          <v-card-text>
            {{ article.body }}
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn icon>
              <v-icon>favorite_border</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapState({
      articles: state => state.news.articles
    })
  },

  beforeMount() {
    this.getArticles()
  },

  methods: {
    ...mapActions({
      getArticles: 'news/requestNewsfeed'
    }),

    dateToString(date) {
      const formatedDate = moment(date)
      return formatedDate.locale('fr').format('D MMMM YYYY')
    }
  }
}
</script>
