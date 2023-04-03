<template>
    <barber-list :barbers="barbers"></barber-list>
</template>
<script>
const API_URL = "http://localhost:8080/customers"

import barberList from "./barberList.vue"

export default{
        components:{
            barberList,
        },
        props: {
            id_customer: Number,
            require: true
        },
        data() {
            return {
                barbers: []
            }
        },
        created()
        {
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}/${this.id_customer}`
                const customerData = await (await fetch(url)).json()
                this.barbers = customerData.bookings.map(gp=>gp.barber)
            },
        }
    }

</script>

<style>


</style>