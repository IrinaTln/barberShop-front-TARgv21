<template>
    <div>
        <h1>Bookings: {{ currentBooking.id_booking }}</h1>    
         <ul>
            <li>               
                Booking time: {{ currentBooking.bookingTime }} <br>
                Customer: {{ currentBooking.customer.customerName }} <br>
                Phone: {{ currentBooking.customer.phone }} <br>
                Service: {{ currentBooking.service.serviceName }} <br>
                Barber: {{ currentBooking.barber.barberName }}<hr>
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
            currentBooking: { 
                id_booking: "", 
                customer: {
                    customerName: "", 
                    phone: ""
                }, 
                service: {
                    serviceName: ""
                }, 
                barber: {
                    barberName: ""
                }
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentBooking = await (await fetch(url + "/" + this.booking.id_booking)).json()
            console.log("bookingDetails",this.currentBooking );
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>