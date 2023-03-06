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
        <button class="modal-default-button button-danger" @click="deleteBarber">
          Yes
        </button>
        <button class="modal-default-button button-safe" @click="barberDeleteId = 0">
          No
        </button>
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
        data() {
            return{
                barberDetailId: 0,
                barberDeleteId: 0,
                currentBarber: null
            }
        },
        watch: {
            barberDetailId(newId, oldId) {
                this.currentBarber = this.barbers.find((item)=>item.id_barber ==newId);
                console.log(this.currentBarber)
            },
            barberDeleteId(newId, oldId) { 
                this.currentBarber = this.barbers.find((item)=>item.id_barber ==newId);
            }
        },
        methods: {
            deleteBarber() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/barbers/${barberDeleteId}`, {
                    method: "delete",
                    })
                    .then((responce) => this.barberDeleteId =0)
                    .then((data) => console.log(data))
                    .catch(error => console.log(error))
            }
        },
    }
</script>