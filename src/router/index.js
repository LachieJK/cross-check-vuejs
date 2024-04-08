import { createRouter, createWebHistory } from 'vue-router';
import ChecklistsPage from '../views/ChecklistsPage.vue';
import IssuesPage from '../views/IssuesPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignoutPage from '../views/SignoutPage.vue';

const routes = [
    {
        path: '/',
        component: ChecklistsPage
    },
    {
        path: '/issues',
        component: IssuesPage
    },
    {
        path: '/history',
        component: HistoryPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/signout',
        component: SignoutPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;