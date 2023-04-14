<template>
    <booking-details :booking="booking"></booking-details>
    <booking-list :bookings="bookings" @deleted="removeItem"></booking-list>
    <booking-form @submit="fetchData"></booking-form>
</template>
<script>
const API_URL = "http://localhost:8080/bookings"

import bookingDetails from "../components/bookingDetails.vue"
import bookingList from "../components/bookingList.vue"
import bookingForm from  "../components/bookingForm.vue"


    export default{
        components:{
            bookingDetails,
            bookingList,
            bookingForm,
        },
        data(){
            return{
                id: 2,
                id_booking: 1,
                booking: {
                    bookingDate: "2023-02-15",
                    bookingTime: "10:00:00"
                }, 
                bookings: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}`
                this.bookings= await (await fetch(url)).json()
            },
            removeItem(id_booking){
                console.log("Item ", id_booking)
                this.bookings.splice(this.bookings.map(i=>i.id_booking).indexOf(id_booking), 1)
            }
        }
    }
</script>
