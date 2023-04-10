<template>
    <form @submit.prevent="addBooking">
        <label>
            Booking date:
            <input type="date" v-model="booking.bookingDate">
        </label>
        <label>
            Booking time:
            <input type="time" v-model="booking.bookingTime">
        </label>
        <button type="submit">Add booking</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
  data() {
    return {
      booking: {
        id_booking: ""
    },
    errors: null
    }
  },
  computed: {
    canSubmit() {
      return this.id_booking.length > 0
    }
  },
  methods: {
    addBooking() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      fetch(api_url + "/bookings", {
        method: "post",
        body: JSON.stringify(this.booking),
        headers: {'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then((response) =>{return response.json()})
      .then((data)=>{console.log("AddBooking ", data)
        if (data.error) {
            this.errors = data.error
            throw data.error
        } else {
            this.booking ={id_booking: ""}
            this.$emit("submit")
        }
    })
      .catch(error => console.log("Error:", error)) 
    }
  }
}
</script>
<style>
    select,
input,
button {
  display: block;
  margin: 0.5em 0;
  font-size: 15px;
}

input[disabled] {
  color: #999;
}

p {
  color: red;
}
</style>