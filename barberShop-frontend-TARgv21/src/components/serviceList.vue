<template>
    <table class="table">
        <tr class="table thead th">
            <th >Name</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="service in services" :key="service.id_service">
            <td class="table td">{{ service.serviceName }}</td>           
            <td class="table td">
                <button id="show-details-modal" @click="serviceDetailId = service.id_service">Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="serviceDeleteId = service.id_service">Delete</button>
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
        <modal :show="serviceDetailId !==0" @close="serviceDetailId = 0">
        <template #header>{{ currentService.serviceName }}</template>
        <template #body>
            <serviceDetails :service="currentService"></serviceDetails>
        </template>
        <template #footer></template>
        </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="serviceDeleteId !== 0">
      <template #header>Delete {{ currentService.serviceName }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
            <button class="modal-default-button button-danger" @click="deleteService">
            Yes
            </button>
            <button class="modal-default-button button-safe" @click="serviceDeleteId = 0">
            No
            </button>
        </div>
        <div v-else>
            <span class="text-danger">{{  error }}</span>
            
            <button class="modal-default-button button-safe" @click="serviceDeleteId = 0">
            Ok
            </button>
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import serviceDetails from "./serviceDetails.vue"
import Modal from "./modal.vue"
    export default{
        components: {
            Modal,
            serviceDetails,
        },
        props: {
            services: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return{
                serviceDetailId: 0,
                serviceDeleteId: 0,
                currentService: null,
                error: null
            }
        },
        watch: {
            serviceDetailId(newId, oldId) {
                this.currentService = this.services.find((item)=>item.id_service ==newId);
                console.log(this.currentService)
            },
            serviceDeleteId(newId, oldId) { 
                this.currentService = this.services.find((item)=>item.id_service ==newId);
                this.error = null
            }
        },
        methods: {
            deleteService() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/services/${this.serviceDeleteId}`, {
                    method: "delete",
                    })
                    .then(async response => {
                        const isJson = response.headers.get("Content-type")?.includes("application/json")
                        const data = isJson && await response.json()
                        if(!response.ok) {
                            const error = (data && data.error) || responce.status
                            return Promise.reject(error)
                        }
                        this.$emit("deleted", this.serviceDeleteId)
                        this.serviceDeleteId = 0
                    })
                    .catch(error => {
                        console.log("Service Delete error: ", error)
                        this.error = error
                    })
            }
        },
    }
</script>

<style>
.text-danger {
    color: red;
}
</style>