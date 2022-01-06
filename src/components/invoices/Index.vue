<template>
  <div>
      <router-link to="/facturas/crear" class="py-3 px-2 bg-blue-400 text-white font-bold rounded"><font-awesome-icon icon="plus-circle" /> Crear Nuevo </router-link>
      <table class="w-full my-5">
        <thead class="bg-gray-300 px-4">
          <tr>
              <th class="py-3">Fecha</th>
              <th class="py-3">Total</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in invoices" v-bind:key="item.id">
            <td class="py-4">{{ item.fecha_creacion.substring(0, 10) }}</td>
            <td class="py-4">${{ item.pago_total.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup() {
    let invoices = ref([])
    onMounted(() => {
      getInvoices();
    })

    const getInvoices = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/invoice`)
        .then(response =>{
          invoices.value = response.data;
        })
        .catch((err) =>{
          console.log(err)
        });
    }

    return {
      invoices,
    }
  },
}
</script>

<style>
  tr > td {
    border-bottom: 1px solid black;
  }
</style>