<template>
    <div class="card">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <template #header>
                <!-- <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                    <span class="text-xl text-900 font-bold">Products</span>
                    <Button icon="pi pi-refresh" rounded raised />
                </div> -->
            </template>
            <Column header="Foto">
                <template #body="slotProps">
                    <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                        :alt="slotProps.data.image" class="w-6rem border-round" />
                </template>
            </Column>
            <Column header="Pegawai">
                <template #body="slotProps">
                    <div v-html="formatName(slotProps.data.name)"></div>
                </template>
            </Column>


            <!-- <template #footer> In total there are {{ products ? products.length : 0 }} products. </template> -->
        </DataTable>
    </div>
</template>

<script>
import { ProductService } from '../service/ProductService';
export default {
    data() {
        return {
            products: null
        };
    },
    mounted() {
        ProductService.getProductsMini().then((data) => (this.products = data));
    },
    methods: {

        formatName(name) {
            return name.replace(/\n/g, '<br>');
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        getSeverity(product) {
            switch (product.inventoryStatus) {
                case 'INSTOCK':
                    return 'success';

                case 'LOWSTOCK':
                    return 'warning';

                case 'OUTOFSTOCK':
                    return 'danger';

                default:
                    return null;
            }
        }
    }
};
</script>
