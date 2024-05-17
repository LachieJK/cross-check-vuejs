<template>
  <!-- Bootstrap navigation bar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom border-body">
    <div class="container-fluid">
      <!-- Logo and brand name -->
      <img src="https://imagedelivery.net/5MYSbk45M80qAwecrlKzdQ/521b56fb-2e33-41e9-c473-72f2dd193200/preview" height="30" class="d-inline-block align-text-top" style="margin-right: 8px; margin-left: 10px; padding: 0px;">
      <span class="navbar-brand" style="padding-left: 5px; padding-top: 3px;">Cross Check</span>
      <!-- Navbar toggler for mobile view -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Navbar items -->
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav" style="height: 40px">
          <!-- Navigation items -->
          <li v-if="user" class="nav-item"><router-link to="/" class="nav-link" aria-current="page">Checklists</router-link></li>
          <li v-if="user" class="nav-item"><router-link to="/issues" class="nav-link" aria-current="page">Open Issues</router-link></li>
          <li v-if="user" class="nav-item"><router-link to="/history" class="nav-link" aria-current="page">Issue Logs</router-link></li>
          <!-- Dropdown for user authentication -->
          <li class="nav-item dropdown" style="position: absolute; right: 15px; margin: 0;">
            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="display: flex; align-items: center; padding: 0px;">
              <img v-if="user" src="https://www.pngarts.com/files/10/Default-Profile-Picture-Transparent-Image.png" class="nav-profile-picture d-inline-block align-text-top">
              <span v-if="user" style="padding-right: 5px;">Signed in as <strong>{{ user.email }}</strong></span>
              <span v-if="!user" style="line-height: 40px; display: flex; align-items: center; padding-right: 5px;">Not signed in</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <!-- Authentication options -->
              <li v-if="user"><router-link to="/logout" class="dropdown-item">Log Out</router-link></li>
              <li v-if="!user"><router-link to="/login" class="dropdown-item">Log In</router-link></li>
              <li v-if="!user"><router-link to="/register" class="dropdown-item">Register</router-link></li>
            </ul>
          </li>                        
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

  import { supabase } from '../lib/supabaseClient'

  export default {
    data() {
      return {
        user: null
      }
    },
    created() {
      this.getUser()
      supabase.auth.onAuthStateChange(() => {
          this.getUser()
      })
    },
    methods: {
      async getUser() {
        const { data } = await supabase.auth.getUser()
        this.user = data.user
        console.log(this.user)
      }
    }
  }

</script>