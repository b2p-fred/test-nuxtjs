<template>
  <v-row>
    <v-col class="text-center">
      <blockquote class="blockquote">
        &#8220;Petite phrase d'introduction ...&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>

      <v-data-table
        dense
        caption="My users"
        :headers="headers"
        item-key="id"
        :items="allItems"
        :items-per-page="pageSize"
        :loading="isLoading"
        :locale="locale"
        loading-text="Hold on! Cooking in progress..."
        no-data-text="Nothing to show in this table!"
        no-results-text="Nothing to show for this selection!"
        class="elevation-1"
      ></v-data-table>

      <v-card
        class="mx-auto"
        max-width="300"
        tile
      >
        <v-list shaped>
          <v-subheader>Icons</v-subheader>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data: () => ({
    selectedItem: 1,
    items: [
      {text: 'Chart Bubble', icon: 'mdi-chart-bubble'},
      {text: 'Group', icon: 'mdi-account-group'},
      {text: 'Group outline', icon: 'mdi-account-group-outline'},
      {text: 'Multiple', icon: 'mdi-cellphone-message'},
    ],
  }),
  computed: {
    ...mapState({
      locale: state => state.authentication.user.language,
    }),
    ...mapGetters({
      isLoading: "apiUsers/isLoading",
      pageSize: "apiUsers/pageSize",
      headers: "apiUsers/headers",
      allItems: "apiUsers/allItems",
      totalItems: "apiUsers/totalItems",
    })
  },
  created() {
    this.loadAllItems();
  },
  methods: {
    ...mapActions({
      loadAllItems: "apiUsers/getAll"
    })
  },
}
</script>
