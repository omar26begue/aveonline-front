import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import './assets/tailwind.css'
import routes from './routes'
import * as VueRouter from 'vue-router'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSave, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ECharts from 'vue-echarts'
import { use } from "echarts/core"
// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
])


library.add(faSave);
library.add(faPlusCircle);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
  })

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component('v-chart', ECharts)
  .mount('#app')
