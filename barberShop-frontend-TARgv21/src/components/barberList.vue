<template>
    <table class="table">
        <tr class="table thead th">
            <th >Name</th>
            <th></th>
        </tr>
        <tr v-for="barber in barbers" :key="barber.id_barber">
            <td class="table td">{{ barber.barberName }}</td>           
            <td class="table td">
                <button id="show-modal" @click="barberDetailId = barber.id_barber">Show Details</button>
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
                currentBarber: null
            }
        },
        watch: {
            barberDetailId(newId, oldId) {
                this.currentBarber = this.barbers.find((item)=>item.id_barber ==newId);
                console.log(this.currentBarber)
        },
        }
    }
</script>