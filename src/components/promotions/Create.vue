<template>
    <div class="min-h-screen bg-gray-100 flex items-center">
        <div class="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
            <div class="py-12 p-10 bg-white rounded-xl">
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Descripción:</label>
                    <input type="text" @blur="validate('descripcion')" :class="validateClass.descripcion" v-model="promotion.descripcion" />
                </div>
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Porcentaje:</label>
                    <input type="number" step="0.1" @blur="validate('porcentaje')" :class="validateClass.porcentaje" v-model="promotion.porcentaje"  />
                </div>
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Fecha de Inicio:</label>
                    <input type="date" @blur="validate('fecha_inicio')" :class="validateClass.fecha_inicio" v-model="promotion.fecha_inicio" />
                </div>
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Fecha de Final:</label>
                    <input type="date" @blur="validate('fecha_fin')" :class="validateClass.fecha_fin" v-model="promotion.fecha_fin" />
                </div>
                <button class="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" @click="save">Guardar</button>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
import axios from 'axios'

export default {
    setup(){
        let promotion = ref({
          descripcion: '',
          porcentaje: 0.0,
          fecha_inicio: '',
          fecha_fin: ''
        })
        let validateClass = ref({
          descripcion: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
          porcentaje: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
          fecha_inicio: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
          fecha_fin: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
        })
        const save = ()=>{
            axios.post(`${process.env.VUE_APP_HOST}/v1/promotion`,promotion.value)
                .then((response) =>{
                    if(response.data.error){
                        alert("No puede existir una promoción el mismo rango de fechas")
                    }else{
                        alert("Registro Guardado")
                        window.location.href = "/#/promociones";
                    }
                })
                .catch((err) =>{
                    console.log(err)
                    alert("Error al Guardar Promocion")
                });
        }

        const validate = (flag)=>{
            if( flag==="descripcion" && (promotion.value.descripcion === "" || promotion.value.descripcion.lenght > 120)){
                validateClass.value.descripcion = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="descripcion"){
                validateClass.value.descripcion = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
            if( flag==="porcentaje" && (promotion.value.porcentaje === "" || promotion.value.porcentaje < 0.1)){
                validateClass.value.porcentaje = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="percentaje"){
                validateClass.value.porcentaje = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
            if( flag==="fecha_inicio" && (promotion.value.fecha_inicio === "")){
                validateClass.value.fecha_inicio = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="fecha_inicio"){
                validateClass.value.fecha_inicio = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
             if( flag==="fecha_fin" && (promotion.value.fecha_fin === "")){
                validateClass.value.fecha_fin = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="fecha_fin"){
                validateClass.value.fecha_fin = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
        }

        return {
            promotion,
            save,
            validateClass,
            validate,
        }
    }
}
</script>

<style>

</style>