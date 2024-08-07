<template>
    <div v-if="loading" class="loading-spinner-container">
        <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    <div v-else>
        <router-link to="/" class="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"></path>
            </svg>
            <span class="back-button-text">Back to Checklists</span>
        </router-link>

        <!-- Section for the button that triggers the modal to create a new task -->
        <div class="centered-container">
            <button type="button" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                <!-- Styling for the button with text indicating the action to add a new task -->
                <span class="animated-box-button" style="width: 60vw;">
                    Add a Task
                </span>
            </button>
        </div>

        <!-- Modal structure for adding a new task -->
        <div class="modal fade" id="addTaskModal" tabindex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- Modal header with title and close button -->
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addTaskModalLabel">Add a Task</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <!-- Form to submit the new task details -->
                    <form method="POST" action="{% url 'checklist' list.id %}">
                        {% csrf_token %} <!-- CSRF token for form submission security -->
                        <div class="modal-body">
                            <!-- Textarea for inputting the task description -->
                            <textarea id="task_description_textarea" name="description" class="form-control" placeholder="Not another thing..."></textarea>
                        </div>
                        <!-- Modal footer with buttons to close the modal or save the new task -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div v-if="tasks.length > 0">
            <!-- Container for tasks, allowing sorting functionality -->
            <div id="sortable-tasks">
                <div v-for="task in tasks" :key="task.id">
                    <!-- Task container with dynamic classes for styling based on task properties -->
                    <div class="task-contents" :class="taskClass(task)" :data-completed="task.completedStatus" :id="task.id" :data-id="task.id">
                        <!-- Handle for sorting tasks -->
                        <div class="contents-handle handle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
                            </svg>
                        </div>
                        <!-- Left side of the task displaying name and conditional messages -->
                        <div class="task-contents-left-side">
                            <div :class="'task-name-' + task.id">
                                <!-- Task name, bold if marked as important -->
                                <div v-if="task.importantFlag">
                                    <b>{{ task.description }}</b>
                                </div>
                                <div v-else>
                                    {{ task.description }}
                                </div>
                            </div>
                            <!-- FIXME: Conditional messages based on task status -->
                            <div class="task-completion-message">
                                <div v-if="task.completedStatus && !task.issueStatus">
                                    {{ task.completedBy }} completed this on {{ task.timeCompleted }}
                                </div>
                                <div v-else-if="task.issueStatus && !task.completedStatus">
                                    {{ task.alertedBy }} reported an issue on {{ task.timeAlertedIssue }}
                                </div>
                                <div v-else-if="task.issueStatus && task.completedStatus">
                                    {{ task.completedBy }} completed, but also reported an issue on {{ task.timeCompleted }}
                                </div>
                            </div>
                        </div>
                        <!-- Right side of the task with action buttons -->
                        <div class="task-contents-right-side">
                            <!-- Options to edit or delete the task -->
                            <div class="three-dots" style="padding: 0px; padding-right: 10px;">
                                <!-- Dropdown menu for editing and deleting -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="rgb(75, 75, 75)" class="bi bi-three-dots" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                                </svg>
                                <div v-if="task.completedStatus == true || task.issueStatus == true" class="dropdown-menu" style="margin-right: 15px;">
                                    <!-- Links to edit and delete task -->
                                    <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit_task_modal_{{ task.id }}">Edit</a>
                                    <a href="{% url 'delete_task' task.id %}" class="dropdown-item">Delete</a>
                                </div>
                                <div v-else>
                                    <div class="dropdown-menu" style="margin-right: 70px;">
                                        <!-- Links to edit and delete task -->
                                        <a href="#" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#edit_task_modal_{{ task.id }}">Edit</a>
                                        <a href="{% url 'delete_task' task.id %}" class="dropdown-item">Delete</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Buttons for marking task as important, reporting issues, or marking as complete -->
                            <div class="task-contents-right-side-buttons">
                                <!-- Important Button -->
                                <div class="task-important-button tooltip-container">
                                    <button :class="['important-task-buttons', task.importantFlag ? 'important' : 'not-important']" :data-task-id="task.id" :id="'important-task-button-' + task.id">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                        </svg>
                                    </button>
                                    <span class="tooltip-text">Flag Important</span>
                                </div>
                                <!-- Issue Button -->
                                <div class="task-issues-button tooltip-container">
                                    <button :class="['issue-task-buttons', task.issueStatus ? 'issue' : 'no-issue']" :data-task-id="task.id" :id="'issue-task-button-' + task.id">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                                        </svg>
                                    </button>
                                    <span class="tooltip-text">Report Issue</span>
                                </div>
                                <!-- Complete Button -->
                                <div class="task-complete-button tooltip-container">
                                    <button :class="['complete-task-buttons', task.completedStatus ? 'complete' : 'not-complete']" :data-task-id="task.id" :id="'complete-task-button-' + task.id">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                        </svg>
                                    </button>
                                    <span class="tooltip-text">Complete Task</span>
                                </div>
                            </div>      
                        </div>
                    </div>
                    <!-- This modal provides a UI for users to edit the description of a task -->
                    <div class="modal fade" id="edit_task_modal_{{ task.id }}" tabindex="-1" role="dialog" aria-labelledby="editTaskLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <!-- Form submission URL is dynamically generated to edit a specific task -->
                                <form action="{% url 'edit_task' task.id %}" method="POST">
                                    {% csrf_token %} <!-- CSRF token for form submission security -->
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editTaskDescriptionLabel">Edit Task</h5>
                                        <!-- Button for closing the modal -->
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <!-- Text area for users to edit the task's description -->
                                        <textarea id="description_textarea_{{ task.id }}" name="edit_task" class="form-control">{{ task.description }}</textarea>
                                    </div>
                                    <div class="modal-footer">
                                        <!-- Button to cancel and close the modal -->
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <!-- Button to submit the form and save the edited task -->
                                        <input type="submit" class="btn btn-primary" value="Save changes">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- This modal allows users to report an issue with a specific task, including its severity and importance -->
                    <div class="modal fade" id="reportIssueModal_{{ task.id }}" tabindex="-1" aria-labelledby="reportIssueModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="reportIssueModalLabel">Report an Issue</h1>
                                    <!-- Button for closing the modal -->
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <!-- Form submission URL is dynamically generated to report an issue for a specific task -->
                                <form method="POST" action="{% url 'report_issue' task.id %}">
                                    {% csrf_token %} <!-- CSRF token for form submission security -->
                                    <div class="modal-body">
                                        <!-- Instructional text for users -->
                                        <p>If you wish to report the issue, please provide a description below and submit it. Otherwise, you can close this dialog.</p>
                                        <!-- Text area for users to describe the issue -->
                                        <textarea id="task_description_textarea" name="description" class="form-control" placeholder="What went wrong?"></textarea>
                                        <!-- Dropdown for users to select the severity of the issue -->
                                        <div class="modal-dropdowns">
                                            <label>How Severe is the Issue?</label>
                                            <select class="form-select" name="severity" aria-label="Default select example">
                                                <option selected value="Minimal">Minimal</option>
                                                <option value="Moderate">Moderate</option>
                                                <option value="Critical">Critical</option>
                                            </select>      
                                        </div>
                                        <!-- Dropdown for users to select the importance of the issue -->
                                        <div class="modal-dropdowns">
                                            <label>How Important is the Issue?</label>
                                            <select class="form-select" name="importance" aria-label="Default select example">
                                                <option selected value="Low">Low</option>
                                                <option value="Normal">Normal</option>
                                                <option value="High">High</option>
                                            </select>      
                                        </div>                             
                                    </div>
                                    <div class="modal-footer">
                                        <!-- Button to cancel and close the modal -->
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <!-- Button to submit the form and report the issue -->
                                        <button type="submit" class="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Button to clear all tasks, centered on the page -->
            <div style="display: flex; justify-content: center;">
                <button type="button" class="clear-button" id="clear-tasks-button" data-list-id="{{ list.id }}">
                    Clear all Tasks
                </button>
            </div>
        </div>
        <div v-else>
            <!-- Message displayed if there are no tasks in the list -->
            <div class="empty-message">
                This list currently has no tasks.
            </div>
        </div>        





    </div>
</template>

<script>
import { supabase } from '../lib/supabaseClient'

export default {
    data() {
        return {
            loading: true,
            user: null,
            listId: null,
            listInfo: [],
            tasks: [],
        }
    },
    async created() {
        try {
            await this.getUser();
            this.listId = this.$route.params.id;
            await this.getList();
            await this.getTasks();
            this.subscribeTasks();
        } catch (error) {
            console.error(error)
        } finally {
            this.loading = false
        }
    },
    methods: {
        async getUser() {
            const { data } = await supabase.auth.getUser()
            this.user = data.user
        },
        async getList() {
            const { data, error } = await supabase
                .from('D100_List')
                .select('*')
                .eq('id', this.listId)
            if (error) {
                console.error(error)
                return
            }
            this.listInfo = data[0];
        },
        async getTasks() {
            const { data, error } = await supabase
                .from('D300_Task')
                .select('*')
                .eq('list_id', this.listId)
            if (error) {
                console.error(error)
                return
            }
            this.tasks = data;
        },
        taskClass(task) {
            if (task.importantFlag && !task.completedStatus && !task.issueStatus) {
                return 'important-flash';
            } else if (task.completedStatus && task.issueStatus) {
                return 'task-completed-with-issue';
            } else if (task.completedStatus) {
                return 'task-completed';
            } else if (task.issueStatus) {
                return 'task-issue';
            }
            return '';
        },
        subscribeTasks() {
            this.realtime_changes = supabase
                .channel('D300_Task')
                .on(
                    'postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'D300_Task',
                    },
                    (payload) => {
                        console.log(payload)
                        if (payload.eventType === 'UPDATE') {
                            for (let i = 0; i < this.tasks.length; i++) {
                                if (this.tasks[i].id === payload.new.id) {
                                    this.tasks[i] = payload.new;
                                }
                            }
                        }
                        else if (payload.eventType === 'INSERT') {
                            this.tasks.push(payload.new);
                        }
                        else if (payload.eventType === 'DELETE') {
                            for (let i = 0; i < this.tasks.length; i++) {
                                if (this.tasks[i].id === payload.old.id) {
                                    this.tasks.splice(i, 1);
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