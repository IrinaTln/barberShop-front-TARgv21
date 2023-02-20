<template>
    <div>
        <h1>Name: {{ name }}</h1>
        <p>Booking date: {{ bookingDate }}</p>
        <p>Booking time: {{ bookingTime }}</p>
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