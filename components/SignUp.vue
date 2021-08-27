<template>
  <v-row justify="center">
    <v-dialog
      v-model="visible"
      persistent
      max-width="600px"
    >
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open registration dialog
        </v-btn>
      </template>
      <v-form v-model="valid">
        <v-card>
          <v-card-title>
            <span class="text-h5">Self registration</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="firstName"
                    label="First name*"
                    required
                    :rules="[required('First name'), minLength('First name', 3)]"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                >
                  <v-text-field
                    v-model="lastName"
                    label="Last name*"
                    required
                    :rules="[required('Last name'), minLength('Last name', 3)]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    label="Email*"
                    required
                    :rules="[required('e-mail')]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword1 ? 'text' : 'password'"
                    label="Password*"
                    hint="Use a strong password"
                    persistent-hint
                    required
                    clearable
                    :rules="[required('Password'), minLength('Password', 3)]"
                    @click:append="showPassword1 = !showPassword1"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="confirmedPassword"
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword2 ? 'text' : 'password'"
                    label="Confirm password*"
                    hint="Please confim..."
                    persistent-hint
                    required
                    :rules="[required('Password'), minLength('Password', 3), passwordsMatch('Password')]"
                    @click:append="showPassword2 = !showPassword2"
                  ></v-text-field>
                </v-col>
              </v-row>
              <!--            <v-row>-->
              <!--              <v-col-->
              <!--                cols="12"-->
              <!--                sm="6"-->
              <!--              >-->
              <!--                <v-select-->
              <!--                  :items="['0-17', '18-29', '30-54', '54+']"-->
              <!--                  label="Age*"-->
              <!--                  required-->
              <!--                ></v-select>-->
              <!--              </v-col>-->
              <!--              <v-col-->
              <!--                cols="12"-->
              <!--                sm="6"-->
              <!--              >-->
              <!--                <v-autocomplete-->
              <!--                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"-->
              <!--                  label="Interests"-->
              <!--                  multiple-->
              <!--                ></v-autocomplete>-->
              <!--              </v-col>-->
              <!--            </v-row>-->
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="visible = false"
            >
              Close
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :disabled="!valid"
              @click="onSubmit"
            >
              Sign up
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  data: () => ({
    visible: false,
    valid: false,
    showPassword1: false,
    showPassword2: false,
    // Form fields
    username: "",
    password: "",
    confirmedPassword: "",
    firstName: "",
    lastName: "",
    // Form rules
    required(property) {
      return v => !!v || `${property} is mandatory.`
    },
    minLength(property, minLength) {
      return v => v && v.length >= minLength || `${property} must be at least ${minLength} characters.`
    },
    passwordsMatch(property, minLength) {
      return v => v && v === this.password || `${property} must match with its confirmation.`
    },
  }),
  computed: {
    ...
      mapState({
        authenticated: state => state.authenticated
      })
  },
  methods: {
    ...
      mapActions("account", ["signup"]),
    async onSubmit() {
      this.visible = false;

      try {
        this.$toast.show('Logging in...')
        // No need to test for null values ;)
        const {username, password, confirmedPassword, firstName, lastName} = this;
        await this.signup({username, password, confirmedPassword, firstName, lastName});
        this.$toast.success('Successfully authenticated')
      } catch(e){
        this.$toast.global.my_error() // Using custom toast
        this.$toast.error('Error while authenticating')
      }
    }
  }
}
</script>
