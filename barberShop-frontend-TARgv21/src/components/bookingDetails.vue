<template>
    <div>
        <h1>Bookings: {{ currentBooking.id_booking }}</h1>    
         <ul>
            <li v-for="(customer, index) in currentBooking.customers" :key="index">               
                Booking time: {{ booking.bookingTime }} <br>
                Customer: {{ customer.customerName }} <br>
                Phone: {{ customer.phone }} <hr>
            </li>
        </ul> 

    </div>
</template>
<script>
const API_URL = "http://localhost:8080/bookings"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        booking: Object,
        required: true
    },
    data() {
        return {
            currentBooking: { id_booking: ""}
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentBooking = await (await fetch(url + "/" + this.booking.id_booking)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>