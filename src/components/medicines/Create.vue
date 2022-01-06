<template>
    <div class="min-h-screen bg-gray-100 flex items-center">
        <div class="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
            <div class="py-12 p-10 bg-white rounded-xl">
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Nombre:</label>
                    <input type="text" @blur="validate('name')" :class="validateClass.name" v-model="medicine.name" />
                </div>
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Precio:</label>
                    <input type="number" step="0.1" @blur="validate('price')" :class="validateClass.price" v-model="medicine.price"  />
                </div>
                <div class="">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Ubicación</label>
                    <input type="text" @blur="validate('location')" :class="validateClass.location" v-model="medicine.location" />
                </div>
                <button class="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" @click="save">Guardar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
export default {
    setup(){
        let medicine = ref({
            name: '',
            price: '',
            location: ''
        })
        let validateClass = ref({
            name: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
            price: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
            location: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        })
        const save = ()=>{
            //medicine.value.price = parseFloat(medicine.value.price)
            axios.post(`${process.env.VUE_APP_HOST}/v1/medicine`,medicine.value)
                .then(() =>{
                    alert("Registro Guardado")
                    window.location.href = "/#/medicinas";
                })
                .catch((err) =>{
                    console.log(err)
                    alert("Error al Guardar Medicina")
                });
        }

        const validate = (flag)=>{
            if( flag==="name" && (medicine.value.name === "" || medicine.value.name.lenght > 80)){
                validateClass.value.name = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="name"){
                validateClass.value.name = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
            if( flag==="price" && (medicine.value.price === "" || medicine.value.price < 0.1)){
                validateClass.value.price = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="price"){
                validateClass.value.price = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
            if( flag==="location" && (medicine.value.location === "" || medicine.value.location.lenght > 120)){
                validateClass.value.location = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="location"){
                validateClass.value.location = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
        }

        return {
            medicine,
            save,
            validateClass,
            validate,
        }
    }
}
</script>

<style>

</style>