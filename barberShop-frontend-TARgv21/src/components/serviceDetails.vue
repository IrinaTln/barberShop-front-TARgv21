<template>
    <div>
        <h1>Services: {{ currentService.serviceName }}</h1>    
         <ul>
            <li >
                Service price: {{ currentService.servicePrice }}
            </li>
        </ul> 

    </div>
</template>
<script>
const API_URL = "http://localhost:8080/services"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        service: Object,
        required: true
    },
    data() {
        return {
            currentService: { serviceName: "", servicePrice: ""}
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentService = await (await fetch(url + "/" + this.service.id_service)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>