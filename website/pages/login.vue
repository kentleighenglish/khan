<template>
  <div class="flex flex-center">
    <form class="login-box" @submit="onSubmit($event)">
      <h2>Login</h2>
      <input
        v-model="form.email"
        required
        class="input-lg"
        type="email"
        name="email"
        placeholder="Your Email"
        spellCheck="false"
      />
      <span v-if="errors.email" class="note note--danger">
        {{ errors.email }}
      </span>
      <input
        v-model="form.password"
        required
        class="input-lg"
        type="password"
        name="password"
        placeholder="Your Password"
      />
      <span v-if="errors.password" class="note note--danger">
        {{ errors.password }}
      </span>
      <hr />
      <div class="flex flex-row flex-align-stretch-center">
        <div class="flex">
          <span class="note">
            <RouterLink to="/signup">
              Click here to create an account
            </RouterLink>
          </span>
        </div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { mapState, mapActions } from "vuex";

const requiredMessage = "Please fill in this field.";

interface LoginErrors {
  email?: string;
  password?: string;
}

interface LoginPage {
  errors: LoginErrors;
}

export default (Vue as VueConstructor<Vue & LoginPage>).extend({
  data: () => ({
    form: {
      email: "",
      password: "",
    },
    errors: {},
  }),
  computed: {
    ...mapState({
      loggingIn: "user/loading",
      errors: "user/errors",
    }),
  },
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    onSubmit(e: Event) {
      e.preventDefault();

      const { email, password } = this.form;

      if (email && email.length && password && password.length) {
        this.login({ email, password });
      } else {
        const errors: LoginErrors = {};
        if (!email) {
          errors.email = requiredMessage;
        }
        if (!password) {
          errors.password = requiredMessage;
        }

        this.errors = errors;
      }
    },
  },
});
</script>
