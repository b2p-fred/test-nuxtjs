<template>
  <v-row>
    <v-col class="text-center">
      <blockquote class="blockquote">
        &#8220;Petite phrase d'introduction ...&#8221;
        <footer>
          <small>
            <em>&mdash;John Doe</em>
          </small>
        </footer>
      </blockquote>
      <SignInDialog v-show="dialogVisible">
      </SignInDialog>
    </v-col>
  </v-row>
</template>
<script>
import SignInDialog from '~/components/SignIn';

export default {
  components: {
    SignInDialog
  },
  auth: false,
  data: () => ({
    dialogVisible: true,
  }),
}
</script>
