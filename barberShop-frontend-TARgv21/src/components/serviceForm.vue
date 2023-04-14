<template>
    <form @submit.prevent="addService">
        <label>
            Service name:
            <input type="text" v-model="service.serviceName">
        </label>
        <label>
            Service price:
            <input type="number" v-model="service.servicePrice">
        </label>
        <button type="submit">Add service</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
  data() {
    return {
      service: {
        serviceName: ""
    },
    errors: null
    }
  },
  computed: {
    canSubmit() {
      return this.serviceName.length > 0
    }
  },
  methods: {
    addService() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      fetch(api_url + "/services", {
        method: "post",
        body: JSON.stringify(this.service),
        headers: {'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then((response) =>{return response.json()})
      .then((data)=>{console.log("AddService", data)
        if (data.error) {
            this.errors = data.error
            throw data.error
        } else {
            this.service ={serviceName: ""}
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