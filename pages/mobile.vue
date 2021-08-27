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
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      {text: 'Cellphone', icon: 'mdi-cellphone'},
      {text: 'Cellphone Cog', icon: 'mdi-cellphone-cog'},
      {text: 'Cellphone Text', icon: 'mdi-cellphone-text'},
      {text: 'Cellphone Message', icon: 'mdi-cellphone-message'},
    ],
  }),
}
</script>
