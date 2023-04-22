<template>
    <form  @submit="checkForm" @submit.prevent="addBooking" action="/something" method="post"> 
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
        <label>
            Booking date:
            <input type="date" v-model="booking.bookingDate">
        </label>
        <label>
            Booking time:
            <input type="time" v-model="booking.bookingTime">
        </label>
        <label>
            Customer:
            <select v-model="booking.id_customer">
              <option disabled value="0">Choose customer</option>
              <option v-for ="customer in customers" :value="customer.id_customer">{{ customer.customerName }}</option>
            </select>
        </label>
        <label>
            Service:
            <select v-model="booking.id_service">
              <option disabled value="0">Choose service</option>
              <option v-for ="service in services" :value= "service.id_service">{{ service.serviceName }}</option>
            </select>
        </label>
        <label>
            Barber:
            <select v-model="booking.id_barber">
              <option disabled value="0">Choose barber</option>
              <option v-for ="barber in barbers" :value= "barber.id_barber">{{ barber.barberName }}</option>
            </select>
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
        id_booking: "",
        id_customer: 0,
        id_service: 0,
        id_barber: 0
    },
    customers: [],
    services: [],
    barbers: [],
    errors: []
    }
  },
  async created() {
    this.customers = await(await fetch("http://localhost:8080/customers")).json(),
    this.services = await(await fetch("http://localhost:8080/services")).json(),
    this.barbers = await(await fetch("http://localhost:8080/barbers")).json()
  },
  computed: {
    canSubmit() {
      return this.id_booking.length > 0
    }
  },
  methods: {
    checkForm: function(e) {
      if (this.id_customer!=0 && this.id_service!=0 && this.id_barber!=0) {
        return true;
      }
      this.errors = [];

      if (!this.id_customer) {
        this.errors.push('Please insert customer name.');
      }
      if (!this.id_service) {
        this.errors.push('Please insert service.');
      }
      if(!this.id_barber){
        this.errors.push('Please insert barber name.')
      }

      e.preventDefault();
    },
    addBooking() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      //ToDo проверка на 0 при заполнении выпадающего списка
      fetch(api_url + "/bookings", {
        method: "post",
        body: JSON.stringify(this.booking),
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
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