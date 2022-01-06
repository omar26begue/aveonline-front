<template>
  <div>
    <nav class="flex my-4 mx-2 bg-blue-400 text-white rounded font-bold">
      <router-link to="/" class="py-4 px-4">Inicio</router-link>
      <router-link to="/medicinas" class="py-4 px-4">Medicinas</router-link>
      <router-link to="/promociones" class="py-4 px-4">Promociones</router-link>
      <router-link to="/facturas" class="py-4 px-4">Facturas</router-link>
      <router-link to="/simulador" class="py-4 px-4">Simulador</router-link>
    </nav>
    <div class="mx-2">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>

</style>
