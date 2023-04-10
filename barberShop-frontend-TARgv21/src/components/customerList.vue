<template>
    <table class="table">
        <tr class="table thead th">
            <th >Name</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="customer in customers" :key="customer.id_customer">
            <td class="table td">{{ customer.customerName }}</td>           
            <td class="table td">
                <button id="show-details-modal" @click="customerDetailId = customer.id_customer">Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="customerDeleteId = customer.id_customer">Delete</button>
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
        <modal :show="customerDetailId !==0" @close="customerDetailId = 0">
        <template #header>{{ currentCustomer.customerName }}</template>
        <template #body>
            <customerDetails :customer="currentCustomer"></customerDetails>
        </template>
        <template #footer></template>
        </modal>
  </Teleport>
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="customerDeleteId !== 0">
      <template #header>Delete {{ currentCustomer.customerName }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
            <button class="modal-default-button button-danger" @click="deleteCustomer">
            Yes
            </button>
            <button class="modal-default-button button-safe" @click="customerDeleteId = 0">
            No
            </button>
        </div>
        <div v-else>
            <span class="text-danger">{{  error }}</span>
            
            <button class="modal-default-button button-safe" @click="customerDeleteId = 0">
            Ok
            </button>
        </div>
      </template>
    </modal>
  </Teleport>
</template>
<script>
import customerDetails from "./customerDetails.vue"
import Modal from "./modal.vue"
    export default{
        components: {
            Modal,
            customerDetails,
        },
        props: {
            customers: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return{
                customerDetailId: 0,
                customerDeleteId: 0,
                currentCustomer: null,
                error: null
            }
        },
        watch: {
            customerDetailId(newId, oldId) {
                this.currentCustomer = this.customers.find((item)=>item.id_customer ==newId);
                console.log(this.currentBarber)
            },
            customerDeleteId(newId, oldId) { 
                this.currentCustomer = this.customers.find((item)=>item.id_customer ==newId);
                this.error = null
            }
        },
        methods: {
            deleteCustomer() {
                const api_url = import.meta.env.VITE_API_URL
                fetch(`${api_url}/customers/${this.customerDeleteId}`, {
                    method: "delete",
                    })
                    .then(async response => {
                        const isJson = response.headers.get("Content-type")?.includes("application/json")
                        const data = isJson && await response.json()
                        if(!response.ok) {
                            const error = (data && data.error) || responce.status
                            return Promise.reject(error)
                        }
                        this.$emit("deleted", this.customerDeleteId)
                        this.customerDeleteId = 0
                    })
                    .catch(error => {
                        console.log("Customer Delete error: ", error)
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