<template>
    <div class="min-h-screen bg-gray-100 flex items-center">
        <div class="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
            <div class="py-12 p-10 bg-white rounded-xl">
                <div class="mb-6">
                    <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Día de Compra:</label>
                    <input type="date" @blur="validate('creationDate')" @change="validateDate" :class="validateClass.creationDate" v-model="invoice.creationDate" />
                </div>
                <div class="mb-6">
                  <label class="mr-4 text-gray-700 font-bold inline-block mb-2">Promoción:</label>
                  <select @blur="validate('promotionId')" :class="validateClass.promotionId"
                          v-model="invoice.promotionId">
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
                    <input type="number" :class="validateClass.totalPay" v-model="invoice.totalPay" disabled="disabled" />
                </div>
                
                <button class="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300" @click="simulate">Simular</button>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import axios from 'axios'
import Multiselect from '@vueform/multiselect'

export default {
    setup() {
      let invoice = ref({
        creationDate: '',
        totalPay: 0,
        promotionId: '',
        medicines: []
      })
      const today = ref(new Date())
      const month = ref((today.value.getMonth() + 1).toString().padStart(2, '0'))
      let promotions = ref([])
      let medicines = ref([])
      let medicinesCompled = ref([])
      onMounted(() => {
        getPromotions();
        getMedicines();
      })

      const getPromotions = () => {
        axios.get(`${process.env.VUE_APP_HOST}/v1/promotion`)
            .then(response => {
              promotions.value = response.data;
            })
            .catch((err) => {
              console.log(err)
            });
      }

      const getMedicines = () => {
        axios.get(`${process.env.VUE_APP_HOST}/v1/medicine`)
            .then(response => {
              medicinesCompled.value = response.data;
              medicines.value = response.data.map(item => {
                return {value: item.id, label: item.name}
              });
            })
            .catch((err) => {
              console.log(err)
            });
      }

      let validateClass = ref({
        creationDate: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
        promotionId: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
        totalPay: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded",
        medicines: "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
      })

      const simulate = () => {
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
        let dateSelected = new Date(`${invoice.value.fecha_creacion.substring(0, 10)} 23:59:59`);
        promotions.value.filter(item => {
          let start = new Date(`${item.fecha_creacion.substring(0, 10)} 00:00:00`)
          let end = new Date(`${item.fecha_creacion.substring(0, 10)} 23:59:59`)
          if (dateSelected.getTime() >= start.getTime() && dateSelected.getTime() <= end.getTime()) {
            discount += item.porcentaje
            invoice.value.id_promotion = item.id
            return
          }
        })
        invoice.value.pago_total = subtotal - (subtotal * (discount / 100));
        invoice.value.pago_total = invoice.value.pago_total.toFixed(2)
      }

        const validate = (flag)=>{
            if( flag==="creationDate" && (invoice.value.creationDate === "")){
                validateClass.value.creationDate = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="creationDate"){
                validateClass.value.creationDate = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
            if( flag==="medicines" && (invoice.value.medicines === "" || invoice.value.medicines.length > 0)){
                validateClass.value.medicines = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="medicines"){
                validateClass.value.medicines = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
            if( flag==="totalPay" && (invoice.value.totalPay === "" || invoice.value.totalPay > 0)){
                validateClass.value.totalPay = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else if(flag==="totalPay"){
                validateClass.value.totalPay = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
        }
        
        const validateDate = ()=>{
            let date = new Date(`${invoice.value.creationDate} 23:59:59`);
            if(date.getTime() < today.value.getTime()){
                invoice.value.creationDate = today.value.getFullYear() + "-" + month.value + "-" + today.value.getDate();
                alert("El día no puede ser menor a la fecha actual");
                validateClass.value.creationDate = "border border-red-300 bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }else{
                validateClass.value.creationDate = "border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
            }
        }

        const addMedicine = ()=>{
            let subtotal = 0;
            invoice.value.medicines.map(item => {
               medicinesCompled.value.filter( md => {
                    if(md.id===item){
                        subtotal += md.price
                        return
                    }
                })
            })
            invoice.value.totalPay = subtotal.toFixed(2);
        }

        return {
            invoice,
            simulate,
            validateClass,
            validate,
            promotions,
            medicines,
            addMedicine,
            validateDate
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