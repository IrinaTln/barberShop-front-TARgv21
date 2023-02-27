<template>
    <div>
        <h1>Name: {{ currentBarber.barberName }}</h1>
        <ul>
            <li v-for="(booking, index) in currentBarber.bookings" :key="index">
                Booking date: {{ formatDate(booking.bookingDate) }}
                Booking time: {{ booking.bookingTime }}
            </li>
        </ul>

    </div>
</template>
<script>
const API_URL = "http://localhost:8080/barbers"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        barber: Object,
        required: true
    },
    data() {
        return {
            currentBarber: { name: "", bookingDate: "", bookingTime: "" }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentBarber = await (await fetch(url + "/" + this.barber.id_barber)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }

    }

}
</script>