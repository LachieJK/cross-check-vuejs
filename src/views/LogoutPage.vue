<template>
    <div class="signout-container">
        <h2 class="details-heading" style="padding: 0px">Sign Out</h2>
        <p>
            Are you sure you want to sign out?
        </p>
        <div class="signout-buttons-container">
            <router-link to="/" class="btn cancel-button">Cancel</router-link>
            <form @submit.prevent="logout">
                <input class="btn btn-danger" type="submit" value="Logout" style="padding: 5px 30px"> 
            </form>
        </div>
    </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient';

export default {
    methods: {
        async logout() {
            const { error } = await supabase.auth.signOut()
            if (error) {
                alert(error.message);
            } else {
                this.$router.push('/login');
            }
        }
    }
}
</script>

