<template>
    <form @submit.prevent="addBarber">
        <label>
            Barber name:
            <input type="text" v-model="barber.barberName">
        </label>
        <button type="submit">Add barber</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
  data() {
    return {
      barber: {
        barberName: ""
    },
    errors: null
    }
  },
  emits: ["submit"],
  computed: {
    canSubmit() {
      return this.barberName.length > 0
    }
  },
  methods: {
    addBarber() {
      this.errors = null
      const api_url = import.meta.env.VITE_API_URL
      fetch(api_url + "/barbers", {
        method: "post",
        body: JSON.stringify(this.barber),
        headers: {'Content-Type': 'application/json; charset=utf-8'
        },
      })
      .then((response) =>{return response.json()})
      .then((data)=>{console.log("AddBarber ", data)
        if (data.error) {
            this.errors = data.error
            throw data.error
        } else {
            this.barber ={barberName: ""}
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