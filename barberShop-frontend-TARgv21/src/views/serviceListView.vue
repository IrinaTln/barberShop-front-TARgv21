<template>
    <service-details :service="service"></service-details>
    <service-list :services="services" @deleted="removeItem"></service-list>
    <service-form @submit="fetchData"></service-form>
</template>
<script>
const API_URL = "http://localhost:8080/services"

import serviceDetails from "../components/serviceDetails.vue"
import serviceList from "../components/serviceList.vue"
import serviceForm from  "../components/serviceForm.vue"


    export default{
        components:{
            serviceList,
            serviceDetails,
            serviceForm,
        },
        data(){
            return{
                id: 2,
                id_service: 1,
                service: {
                    name: "Marko Tasane",
                    bookingDate: "2023-02-15",
                    bookingTime: "10:00:00"
                }, 
                services: []
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            async fetchData(){
                const url = `${API_URL}`
                this.services= await (await fetch(url)).json()
            },
            removeItem(id_service){
                console.log("Item ", id_service)
                this.services.splice(this.services.map(i=>i.id_service).indexOf(id_service), 1)
            }
        }
    }
</script>
