<template>
    <table class="table">
        <tr class="table thead th">
            <th >Name</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="barber in barbers" :key="barber.id_barber">
            <td class="table td">{{ barber.barberName }}</td>           
            <td class="table td">
                <button id="show-details-modal" @click="barberDetailId = barber.id_barber">Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="barberDeleteId = barber.id_barber">Delete</button>
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
        <modal :show="barberDetailId !==0" @close="barberDetailId = 0">
        <template #header>{{ currentBarber.barberName }}</template>
        <template #body>
            <barberDetails :barber="currentBarber"></barberDetails>
        </template>
        <template #footer></template>
        </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="barberDeleteId !== 0">
      <template #header>Delete {{ currentBarber.barberName }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
            <button class="modal-default-button button-danger" @click="deleteBarber">
            Yes
            </button>
            <button class="modal-default-button button-safe" @click="barberDeleteId = 0">
            No
            </button>
        </div>
        <div v-else>
            <span class="text-danger">{{  error }}</span>
            
            <button class="modal-default-button button-safe" @click="barberDeleteId = 0">
            Ok
            </button>
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import barberDetails from "./barberDetails.vue"
import Modal from "./modal.vue"
    export default{
        components: {
            Modal,
            barberDetails,
        },
        props: {
            barbers: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return{
                barberDetailId: 0,
                barberDeleteId: 0,
                currentBarber: null,
                error: null
            }
        },
        watch: {
            barberDetailId(newId, oldId) {
                this.currentBarber = this.barbers.find((item)=>item.id_barber ==newId);
                console.log(this.currentBarber)
            },
            barberDeleteId(newId, oldId) { 
                this.currentBarber = this.barbers.find((item)=>item.id_barber ==newId);
                this.error = null
            }
        },
        methods: {
            deleteBarber() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/barbers/${this.barberDeleteId}`, {
                    method: "delete",
                    })
                    .then(async response => {
                        const isJson = response.headers.get("Content-type")?.includes("application/json")
                        const data = isJson && await response.json()
                        if(!response.ok) {
                            const error = (data && data.error) || responce.status
                            return Promise.reject(error)
                        }
                        this.$emit("deleted", this.barberDeleteId)
                        this.barberDeleteId = 0
                    })
                    .catch(error => {
                        console.log("Barber Delete error: ", error)
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