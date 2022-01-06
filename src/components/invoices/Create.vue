<template>
    <div class="min-h-screen bg-gray-100 flex items-center">
        <div class="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
            <div class="py-12 p-10 bg-white rounded-xl">
                <div class="mb-6">
                  <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Promoción:</label>
                  <select @blur="validate('id_promotion')" :class="validateClass.id_promotion"
                          v-model="invoice.id_promotion">
                    <option v-for="item in promotions" v-bind:key="item.id" :value="item.id">{{
                        item.descripcion
                      }}
                    </option>
                  </select>
                </div>
                <div class="">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Medicinas</label>
                    <Multiselect
                        @click="addMedicine"
                        v-model="invoice.medicines"
                        mode="tags"
                        :closeOnSelect="false"
                        :searchable="true"
                        :createTag="true"
                        :options="medicines"
                        :class="validateClass.medicines"
                    />
                </div>
                 <div class="">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2" >Total:</label>
                   <input type="number" :class="validateClass.pago_total" v-model="invoice.pago_total"
                          disabled="disabled"/>
                </div>
                
                <button class="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" @click="save">Guardar</button>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import Multiselect from '@vueform/multiselect'

export default {
    setup(){
        const today = ref(new Date())
        let invoice = ref({
          pago_total: 0,
          id_promotion: '',
          medicines: []
        })
        let promotions = ref([])
        let medicines = ref([])
        let medicinesCompled = ref([])
        onMounted(() => {
            getPromotions();
            getMedicines();
        })
        

        const getMedicines = () => {
            axios.get(`${process.env.VUE_APP_HOST}/v1/medicine`)
                .then(response =>{
                    medicinesCompled.value = response.data;
                    medicines.value = response.data.map(item => {return {value: item.id, label: item.name}});
                })
                .catch((err) =>{
                    console.log(err)
                });
        }

        const getPromotions = () => {
            axios.get(`${process.env.VUE_APP_HOST}/v1/promotion`)
                .then(response =>{
                    response.data.map(item => {
                      let startDate = new Date(item.fecha_inicio)
                      let fishDate = new Date(item.fecha_fin)
                      if (today.value.getTime() >= startDate.getTime() && today.value.getTime() <= fishDate.getTime()) {
                        promotions.value.push(item)
                      }

                    });
                })
                .catch((err) =>{
                    console.log(err)
                });
        }

        let validateClass = ref({
          id_promotion: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
          pago_total: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
          medicines: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        })
        const save = ()=> {
          invoice.value.medicines = invoice.value.medicines.map(item => item)
          axios.post(`${process.env.VUE_APP_HOST}/v1/invoice`, invoice.value)
              .then(() => {
                alert("Registro Guardado")
                window.location.href = "/#/facturas";
              })
              .catch((err) => {
                console.log(err)
                alert("Error al Guardar Medicina")
              });
        }

      const validate = (flag) => {
        if (flag === "promotionId" && (invoice.value.id_promotion === "" || invoice.value.id_promotion < 0)) {
          validateClass.value.id_promotion = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        } else if (flag === "id_promotion") {
          validateClass.value.id_promotion = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        }
        if (flag === "medicines" && (invoice.value.medicines === "" || invoice.value.medicines.length > 0)) {
          validateClass.value.medicines = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        } else if (flag === "medicines") {
          validateClass.value.medicines = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        }
        if (flag === "pago_total" && (invoice.value.pago_total === "" || invoice.value.pago_total > 0)) {
          validateClass.value.pago_total = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        } else if (flag === "pago_total") {
          validateClass.value.pago_total = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        }
      }

      const addMedicine = () => {
        let subtotal = 0;
        invoice.value.medicines.map(item => {
          medicinesCompled.value.filter(md => {
            if (md.id === item) {
              subtotal += md.price
              return
            }
          })
        })
        let discount = 0;

        promotions.value.filter(item => {
          if (item.id === invoice.value.id_promotion) {
            discount += item.porcentaje
            return
          }
        })
        invoice.value.pago_total = subtotal - (subtotal * (discount / 100));
        invoice.value.pago_total.toFixed(2)
      }

        return {
            invoice,
            save,
            validateClass,
            validate,
            promotions,
            medicines,
            addMedicine,
        }
    },
    components:{
        Multiselect,
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>
<style>

</style>