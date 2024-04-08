<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const lists = ref([])

async function getLists() {
    const { data, error } = await supabase
        .from('D100_List')
        .select('*')
    if (error) {
        console.error(error)
    } else {
        lists.value = data
    }
}

const realtime_changes = supabase
    .channel('D100_List')
    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'D100_List',
        },
        (payload) => {
            console.log(payload)
            if (payload.new) {
                lists.value.push(payload.new);
            }
        }
    )
    .subscribe();

onMounted(() => {
    getLists()
})

</script>

<template>
    <h1>Checklists</h1>
    <div v-if="lists">
        <ul v-for="list in lists">
            <li key="{{ list.id }}">
                {{ list.listName }}
            </li>
        </ul>
    </div>
    <div v-else class="empty-message">
        Your account currently has no lists.
    </div>
</template>