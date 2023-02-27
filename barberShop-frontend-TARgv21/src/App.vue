<template>
    <!--<barber-details :barber="barber"></barber-details>-->
    <barber-list :barbers="barbers"></barber-list>
    <barber-form></barber-form>
</template>
<script>
const API_URL = "http://localhost:8080/barbers"

import barberDetails from "./components/barberDetails.vue"
import barberList from "./components/barberList.vue"
import barberForm from  "./components/barberForm.vue"

    export default{
        components:{
            barberDetails,
            barberList,
            barberForm
        },
        data(){
            return{
                id: 2,
                barber: {
                    name: "Marko Tasane",
                    bookingDate: "2023-02-15",
                    bookingTime: "10:00:00"
                }, 
                barbers: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}`
                this.barbers= await (await fetch(url)).json()
            }
        }
    }
</script>
