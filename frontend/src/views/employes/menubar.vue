<template>
    <Menubar :model="items" class="sticky-menubar" position="sticky" top="0">
        <template #start>
            <a href="/eis">
                <svg width="300" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4rem">
                    <image xlink:href="../../assets/logo/logo-pagawe-1.png" x="0" y="0" width="130" height="70" />
                </svg>
            </a>
        </template>

        <template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex align-items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{
        item.shortcut
    }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
            </a>
        </template>

        <template #end>
            <!-- <div class="navbar">
                <div class="date">{{ currentDate }}</div>
            </div>
            <button @click="filterStatusPegawai">Fetch Data JK</button> -->

            <!-- <div class="flex align-items-center gap-2">
                <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            </div> -->

        </template>
    </Menubar>
</template>


<script>
import employesController from '../../controller/employes-controller';


import './style.css';

export default {
    mixins: [employesController],
    components: {
    },
}

</script>