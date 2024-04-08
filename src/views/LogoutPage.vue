<script setup>
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const router = useRouter();

async function logout(event) {
    event.preventDefault();

    const { error } = await supabase.auth.signOut()

    if (error) {
        alert(error.message);
    } else {
        router.push('/login');
    }
}

</script>

<template>
    <div class="signout-container">
            <h2 class="details-heading" style="padding: 0px">Sign Out</h2>
            <p>
                Are you sure you want to sign out?
            </p>
            <div class="signout-buttons-container">
                <router-link to="/" class="btn cancel-button">Cancel</router-link>
                <form @submit="logout">
                    <input class="btn btn-danger" type="submit" value="Logout" style="padding: 5px 30px"> 
                </form>
            </div>
        </div>
</template>