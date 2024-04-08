<script setup>
import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

async function login(event) {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
    });

    if (error) {
        alert(error.message);
    } else {
        router.push('/');
    }
}

</script>

<template>
    <h2 class="details-heading">Login</h2> <!-- Heading for login -->

    <!-- Form for login -->
    <form class="centered-form" @submit="login">
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