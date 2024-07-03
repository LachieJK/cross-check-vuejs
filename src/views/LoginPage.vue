<template>
    <div class="login-page">
        <div class="login-container">
            <div class="login-titles">
                <img src="https://cdn-icons-png.freepik.com/512/2530/2530994.png" alt="logo" width="100px">
                <h1 class="login-heading">Welcome!</h1>
                <p class="login-text">Log in to Access your Checklists</p>
            </div>
            <form class="centered-form" @submit.prevent="login">
                <div class="form-section">
                    <input v-model="email" autofocus class="form-component" type="text" placeholder="Email">
                </div>
                <div class="form-section" style="margin-bottom: 30px;">
                    <input v-model="password" class="form-component" type="password" placeholder="Password">
                </div>
                <input class="login-button" type="submit" value="Continue">
                <div style="padding-top: 40px">
                    Don't have an account? <router-link to="/register">Register here.</router-link> <!-- Link for registration -->
                </div>
            </form>
        </div>
    </div>
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