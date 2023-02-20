<template>
    <barber-details :barber="barber"></barber-details>
</template>
<script>
const API_URL = "http://localhost:8080/barbers"

import barberDetails from "./components/barberDetails.vue"
    export default{
        components:{
            barberDetails
        },
        data(){
            return{
                id: 2,
                barber: {
                    name: "Marko Tasane",
                    bookingDate: "2023-02-15",
                    bookingTime: "10:00:00"
                }
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}/${this.id}`
                this.barber = (await (await fetch(url)).json())
                console.log(this.barber)
            }
        }
    }
</script>
