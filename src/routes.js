import Index from './components/Index'
import InvoiceIndex from './components/invoices/Index'
import InvoiceCreate from './components/invoices/Create'
import PromotionsIndex from './components/promotions/Index'
import PromotionsCreate from './components/promotions/Create'
import MedicinesIndex from './components/medicines/Index'
import MedicinesCreate from './components/medicines/Create'
import SimulateIndex from './components/simulate/Index'

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/facturas',
        component: InvoiceIndex
    },
    {
        path: '/facturas/crear',
        component: InvoiceCreate
    },
    {
        path: '/promociones',
        component: PromotionsIndex
    },
    {
        path: '/promociones/crear',
        component: PromotionsCreate
    },
    {
        path: '/medicinas',
        component: MedicinesIndex
    },
    {
        path: '/medicinas/crear',
        component: MedicinesCreate
    },
    {
        path: '/simulador',
        component: SimulateIndex
    }
];

export default routes;