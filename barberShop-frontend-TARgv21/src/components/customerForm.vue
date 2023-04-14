<template>
    <form @submit.prevent="addCustomer">
        <label>
            Customer name:
            <input type="text" v-model="customer.customerName">
          </label>
        <label> Customer phone:
          <input type="number" v-model="customer.phone">
        </label>
        <label>Customer e-mail:  
            <input type="email" v-model="customer.mail">
        </label>
        <button type="submit">Add</button>
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
        customerName: "",
        phone: "",
        mail: ""
    },
    errors: null
    }
  },
  emits: ["submit"],
  computed: {
    canSubmit() {
      return this.customer.customerName.length > 0
    }
  },
  methods: {
    addCustomer() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      fetch(api_url + "/customers", {
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