<template>

    <router-link to="/" class="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>
        </svg>
        <span class="back-button-text">Back to Checklists</span>
    </router-link>

    <h1>{{ listName }}</h1>
</template>

<script>
import { supabase } from '../lib/supabaseClient'

export default {
    data() {
        return {
            user: null,
            listName: null,
            listId: null,
        }
    },
    created() {
        this.getUser();
        this.listId = this.$route.params.id;
        this.getList();
    },
    methods: {
        async getUser() {
            const { data } = await supabase.auth.getUser()
            this.user = data.user
        },
        async getList() {
            const { data: [list], error } = await supabase
                .from('D100_List')
                .select('*')
                .eq('id', this.listId)
            if (error) {
                console.error(error)
                return
            }
            this.listName = list.listName
        }
    }
}

</script>