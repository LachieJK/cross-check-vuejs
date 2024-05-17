<template>
    <div v-if="user">
        <!-- Section for the button that triggers the modal to create a new list -->
        <div class="centered-container">
            <button type="button" data-bs-toggle="modal" data-bs-target="#createListModal">
                <!-- Button styling and text -->
                <span class="animated-box-button" style="width: 60vw;">
                    Create New List
                </span>
            </button>
        </div>

        <!-- Modal for creating a new list -->
        <div class="modal fade" id="createListModal" tabindex="-1" aria-labelledby="createListModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal header with title and close button -->
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createListModalLabel">Create List</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Form for submitting the new list's title -->
                    <form @submit="createList">
                        <div class="modal-body">
                            <!-- Textarea for inputting the new list's title -->
                            <textarea id="list_title_textarea" name="title" class="form-control" placeholder="What would you like to call the list?"></textarea>
                        </div>
                        <!-- Modal footer with close and save buttons -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <div v-if="checklists" id="sortable-lists">
            <div v-for="checklist in checklists">
                <div class="list-contents" data-id="{{ checklist.id }}">
                    <!-- Handle for dragging the checklist, facilitating the sorting functionality -->
                    <div class="contents-handle handle">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
                        </svg>
                    </div>
                    <!-- Left-side content, primarily for displaying the checklist name and ownership/collaboration status -->
                    <div class="list-contents-left-side view-list" data-list-url="{% url 'checklist' list.id %}">
                        <div class="list-name-{{ checklist.id }}">
                            {{ checklist.listName }}
                            <span style="font-style: italic; color: rgb(161, 161, 161); font-family: 'Courier New', monospace; padding-left: 2em;">
                                <span v-if="user.value == checklist.owner">(Owner)</span>
                                <span v-else>(Collaborator)</span>
                            </span>
                        </div>
                    </div>
                    <!-- Right-side content for list management options like edit, delete, add or remove users -->
                    <div class="list-contents-right-side">
                        <div class="three-dots">
                            <!-- Trigger for dropdown menu containing list management options -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="rgb(75, 75, 75)" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                            </svg>
                            <div class="dropdown-menu" style="margin-right: 10px;">
                                <!-- Dropdown menu items for actions like rename, add user, remove user, delete list, or leave list -->
                                <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#rename_list_modal_{{ list.id }}">Rename</a>
                                <a v-if="user.value == checklist.owner" href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#add_user_modal_{{ list.id }}">Add User</a>
                                <a v-if="user.value == checklist.owner" href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#remove_user_modal_{{ list.id }}">Remove User</a>
                                <a v-if="user.value == checklist.owner" href="{% url 'delete_list' list.id %}" class="dropdown-item">Delete</a>
                                <a v-if="user.value != checklist.owner" href="{% url 'leave_list' list.id %}" class="dropdown-item">Leave</a>
                            </div>
                        </div>
                        <!-- Displays the count of completed tasks versus total tasks for the list -->
                        <div class="list-complete-count">
                            <b>Completed: </b>{{ checklist.completed_task_count }}/{{ checklist.total_task_count }}
                        </div>
                        <!-- Displays the count of tasks with issues versus total tasks for the list -->
                        <div class="list-issues-count">
                            <b>Issues: </b>{{ checklist.issue_task_count }}/{{ checklist.total_task_count }}
                        </div>
                    </div>
                </div>

                <!-- Modal for renaming list -->
                <div class="modal fade" id="rename_list_modal_{{ checklist.id }}" tabindex="-1" role="dialog" aria-labelledby="renameListLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <!-- Form for submitting the new list name -->
                            <form>
                                <div class="modal-header">
                                    <h5 class="modal-title" id="renameListNameLabel">Edit List Name</h5>
                                    <!-- Button to close the modal -->
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <!-- Text area for inputting the new list name -->
                                    <textarea id="name_textarea_{{ checklist.id }}" name="rename_list" class="form-control">{{ checklist.listName }}</textarea>
                                </div>
                                <div class="modal-footer">
                                    <!-- Button to cancel the operation and close the modal -->
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <!-- Button to submit the form and save the new list name -->
                                    <input type="submit" class="btn btn-primary" value="Save changes">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Container for the 'Clear Tasks in all Lists' button, centered horizontally -->
            <div style="display: flex; justify-content: center;">
                <button type="button" class="clear-button" id="clear-lists-button">
                    Clear Tasks in all Lists <!-- Button text indicating its function -->
                </button>
            </div>
        </div>
        <div v-else class="empty-message">
            Your account currently has no lists.
        </div>
    </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient'

export default {
    data() {
        return {
            user: null,
            checklists: [],
            realtime_changes: undefined,
        }
    },
    async created() {
        await this.getUser();
        this.getChecklists();
        this.subscribeLists();
    },
    methods: {
        async getUser() {
            const { data } = await supabase.auth.getUser()
            this.user = data.user
            console.log(this.user)
            if (this.user == null) {
                return this.$router.push('/login')
            }
        },
        async getChecklists() {
            const { data, error } = await supabase
                .from('D100_List')
                .select('*')
                .eq('owner_id', this.user.id)
            if (error) {
                console.error("get list error is " + error)
            } else {
                this.checklists = data
            }
            console.log(this.checklists)
        },
        async createList() {
            const title = document.getElementById('list_title_textarea').value
            const { data, error } = await supabase
                .from('D100_List')
                .insert({ listName: title, owner_id: this.user.id})
            if (error) {
                console.error("create list error is " + error)
            }
        },
        subscribeLists() {
            this.realtime_changes = supabase
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
                        if (payload.eventType === 'UPDATE' && payload.new.owner_id === this.user.id) {
                            for (let i = 0; i < this.checklists.length; i++) {
                                if (this.checklists[i].id === payload.new.id) {
                                    this.checklists[i] = payload.new;
                                }
                            }
                        }
                    }
                )
                .subscribe();
        },
    }
}
</script>

