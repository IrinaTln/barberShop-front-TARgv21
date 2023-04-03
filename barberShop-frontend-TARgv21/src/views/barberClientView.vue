<template>
    <barber-client :id_customer="id_customer"></barber-client>
</template>
<script>

import barberClient from "../components/barberClient.vue"

    export default{
        props:{
            id_customer: Number,
            required: true,
        },
        components:{
            barberClient
        }      
    }
</script>
