<template>
    <div>
        <h1>Name: {{ barber.name }}</h1>
        <p>Booking date: {{ barber.bookingDate }}</p>
        <p>Booking time: {{ barber.bookingTime }}</p>
    </div>
</template>
<script>
    export default{
        props: {
            barber: Object,
            required: true
        },
        data(){
            return {
                name: this.barber.name,
                bookingDate: this.barber.bookingDate,
                bookingTime: this.barber.bookingTime
            }
        }
    }
</script>