<template>
  <div>
      <router-link to="/promociones/crear" class="py-3 px-2 bg-blue-400 text-white font-bold rounded"><font-awesome-icon icon="plus-circle" /> Crear Nuevo </router-link>
      <table class="w-full my-5">
        <thead class="bg-gray-300 px-4">
          <tr>
              <th class="py-3">Descripción</th>
              <th class="py-3">Porcentaje</th>
              <th class="py-3">Fecha de Inicio</th>
              <th class="py-3">Fecha de Final</th>    
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in promotions" v-bind:key="item.id">
            <td class="py-4">{{ item.descripcion }}</td>
            <td class="py-4">{{ item.porcentaje }}%</td>
            <td class="py-4">{{ item.fecha_inicio.substring(0, 10) }}</td>
            <td class="py-4">{{ item.fecha_fin.substring(0, 10) }}</td>
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
    let promotions = ref([])
    onMounted(() => {
      getPromotions();
    })

    const getPromotions = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/promotion`)
        .then(response =>{
          promotions.value = response.data;
        })
        .catch((err) =>{
          console.log(err)
        });
    }

    return {
      promotions,
    }
  },
}
</script>

<style>
  tr > td {
    border-bottom: 1px solid black;
  }
</style>