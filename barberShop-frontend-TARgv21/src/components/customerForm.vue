<template>
    <form @submit.prevent="addCustomer">
        <label>
            Customer name:
            <input type="text" v-model="customer.customerName">
        </label>
        <button type="submit">Add customer</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
  data() {
    return {
      customer: {
        customerName: ""
    },
    errors: null
    }
  },
  computed: {
    canSubmit() {
      return this.customerName.length > 0
    }
  },
  methods: {
    addBarber() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      fetch(api_url + "/barbers", {
        method: "post",
        body: JSON.stringify(this.customer),
        headers: {'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then((response) =>{return response.json()})
      .then((data)=>{console.log("AddCustomer ", data)
        if (data.error) {
            this.errors = data.error
            throw data.error
        } else {
            this.customer ={customerName: ""}
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