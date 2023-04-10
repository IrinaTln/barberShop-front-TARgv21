<template>
    <div>
        <h1>Customers: {{ currentCustomer.customerName }}</h1>    
         <ul>
            <li v-for="(booking, index) in currentCustomer.bookings" :key="index">
                Booking date: {{ formatDate(booking.bookingDate) }} <br>
                Booking time: {{ booking.bookingTime }} <br>
                Phone: {{ customer.phone }} <br>
                E-mail: {{ customer.mail }}<hr>
            </li>
        </ul> 

    </div>
</template>
<script>
const API_URL = "http://localhost:8080/customers"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        customer: Object,
        required: true
    },
    data() {
        return {
            currentCustomer: { name: "", phone: "", mail: "" }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentCustomer = await (await fetch(url + "/" + this.customer.id_customer)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>