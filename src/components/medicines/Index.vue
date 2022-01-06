<template>
  <div>
      <router-link to="/medicinas/crear" class="py-3 px-2 bg-blue-400 text-white font-bold rounded"><font-awesome-icon icon="plus-circle" /> Crear Nuevo </router-link>
      <table class="w-full my-5">
        <thead class="bg-gray-300 px-4">
          <tr>
              <th class="py-3">Nombre</th>
              <th class="py-3">Precio</th>
              <th class="py-3">Ubicación</th>  
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="item in medicines" v-bind:key="item.id">
            <td class="py-4">{{ item.name }}</td>
            <td class="py-4">{{ item.price }}</td>
            <td class="py-4">{{ item.location }}</td>
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
    let medicines = ref([])
    onMounted(() => {
      getMedicines();
    })

    const getMedicines = () => {
      axios.get(`${process.env.VUE_APP_HOST}/v1/medicine`)
        .then(response =>{
          medicines.value = response.data;
        })
        .catch((err) =>{
          console.log(err)
        });
    }

    return {
      medicines,
    }
  },
}
</script>

<style>
  tr > td {
    border-bottom: 1px solid black;
  }
</style>