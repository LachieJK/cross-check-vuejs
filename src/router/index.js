import { createRouter, createWebHistory } from 'vue-router';
import ChecklistsPage from '../views/ChecklistsPage.vue';
import ListPage from '../views/ListPage.vue';
import IssuesPage from '../views/IssuesPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import SignoutPage from '../views/LogoutPage.vue';

const routes = [
    {
        path: '/',
        component: ChecklistsPage
    },
    {
        path: '/list/:id',
        component: ListPage
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
        path: '/logout',
        component: SignoutPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;