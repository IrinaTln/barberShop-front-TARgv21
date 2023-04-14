<template>
    <table class="table">
        <tr class="table thead th">
            <th >Bookings</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="booking in bookings" :key="booking.id_booking">
            <td class="table td">{{ booking.bookingDate }}</td>           
            <td class="table td">
                <button id="show-details-modal" @click="bookingDetailId = booking.id_booking">Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="bookingDeleteId = booking.id_booking">Delete</button>
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="bookingDetailId !==0" @close="bookingDetailId = 0">
        <template #header>{{ currentBooking.id_booking }}</template>
        <template #body>
            <bookingDetails :booking="currentBooking"></bookingDetails>
        </template>
        <template #footer></template>
        </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="bookingDeleteId !== 0">
      <template #header>Delete {{ currentBooking.id_booking }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
            <button class="modal-default-button button-danger" @click="deleteBooking">
            Yes
            </button>
            <button class="modal-default-button button-safe" @click="bookingDeleteId = 0">
            No
            </button>
        </div>
        <div v-else>
            <span class="text-danger">{{  error }}</span>
            
            <button class="modal-default-button button-safe" @click="bookingDeleteId = 0">
            Ok
            </button>
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import bookingDetails from "./bookingDetails.vue"
import Modal from "./modal.vue"
    export default{
        components: {
            Modal,
            bookingDetails,
        },
        props: {
            bookings: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return{
                bookingDetailId: 0,
                bookingDeleteId: 0,
                currentBooking: null,
                error: null
            }
        },
        watch: {
            bookingDetailId(newId, oldId) {
                this.currentBooking = this.bookings.find((item)=>item.id_booking ==newId);
                console.log(this.currentBooking)
            },
            bookingDeleteId(newId, oldId) { 
                this.currentBooking = this.bookings.find((item)=>item.id_booking ==newId);
                this.error = null
            }
        },
        methods: {
            deleteBooking() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/bookings/${this.bookingDeleteId}`, {
                    method: "delete",
                    })
                    .then(async response => {
                        const isJson = response.headers.get("Content-type")?.includes("application/json")
                        const data = isJson && await response.json()
                        if(!response.ok) {
                            const error = (data && data.error) || responce.status
                            return Promise.reject(error)
                        }
                        this.$emit("deleted", this.bookingDeleteId)
                        this.bookingrDeleteId = 0
                    })
                    .catch(error => {
                        console.log("Booking Delete error: ", error)
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