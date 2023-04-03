<template>
    <nav>
        <router-link to="/">Go to Home</router-link>
        <router-link to="/barberClient">Go to Barber Client</router-link>
    </nav>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
</template>
<script>

import {RouterLink, RouterView} from "vue-router";

export default{
        components:{
            RouterView,
            RouterLink
        },
        data(){
            return{
               
            }
        }
    }
</script>
<style>
    nav a {
        margin-left: 1rem;
    }
</style>