<template>
    <table>
        <tr>
            <th>Name</th>
            <th></th>
        </tr>
        <tr v-for="barber in barbers" :key="barber.id">
            <td>{{ barber.name }}</td>
            <td>Link detailidele</td>
        </tr>
    </table>

</template>
<script>
    export default{
        props: {
            barbers: Array,
            required: true
        }
    }
</script>