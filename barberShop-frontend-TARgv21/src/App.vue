<template>
    <nav>
        <router-link to="/">Go to Barbers</router-link>
        <router-link to="/barberClient">Go to Customer</router-link>
        <router-link to="/customerList">Go to Customer's List</router-link>
        <router-link to="/serviceList">Go to Services</router-link>
        <router-link to="/bookingList">Go to Bookings</router-link>
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