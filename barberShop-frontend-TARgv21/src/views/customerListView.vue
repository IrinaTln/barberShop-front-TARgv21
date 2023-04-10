<template>
    <customer-details :customer="customer"></customer-details>
    <customer-list :customers="customers" @deleted="removeItem"></customer-list>
    <customer-form @submit="fetchData"></customer-form>
</template>
<script>
const API_URL = "http://localhost:8080/customers"

import customerDetails from "../components/customerDetails.vue"
import customerList from "../components/customerList.vue"
import customerForm from  "../components/customerForm.vue"


    export default{
        components:{
            customerDetails,
            customerList,
            customerForm,
        },
        data(){
            return{
                id: 2,
                id_barber: 1,
                customer: {
                    name: "Marko Tasane",
                    bookingDate: "2023-02-15",
                    bookingTime: "10:00:00"
                }, 
                customers: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}`
                this.customers= await (await fetch(url)).json()
            },
            removeItem(id_customer){
                console.log("Item ", id_customer)
                this.customers.splice(this.customers.map(i=>i.id_customer).indexOf(id_customer), 1)
            }
        }
    }
</script>
