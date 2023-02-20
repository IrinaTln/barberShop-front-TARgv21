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
        }
    }
</script>