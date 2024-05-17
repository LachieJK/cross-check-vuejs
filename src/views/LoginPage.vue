<template>
    <h2 class="details-heading">Login</h2> <!-- Heading for login -->

    <!-- Form for login -->
    <form class="centered-form" @submit.prevent="login">
        <div class="form-group" style="width: 40vw">
            <input v-model="email" autofocus class="form-control" type="text" placeholder="Email"> <!-- Input for email -->
        </div>
        <div class="form-group" style="width: 40vw">
            <input v-model="password" class="form-control" type="password" placeholder="Password"> <!-- Input for password -->
        </div>
        <input class="btn btn-primary" type="submit" value="Login" style="width: 40vw"> <!-- Login button -->
        <div style="padding-top: 40px">
            Don't have an account? <router-link to="/register">Register here.</router-link> <!-- Link for registration -->
        </div>
    </form>
</template>

<script>
import { supabase } from '../lib/supabaseClient';

export default {
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        async login() {
            const { error } = await supabase.auth.signInWithPassword({
                email: this.email,
                password: this.password
            });
            if (error) {
                alert(error.message);
            } else {
                this.$router.push('/');
            }
        }
    }
}
</script>