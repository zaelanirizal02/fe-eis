<template>
    <!-- <Menubar :model="items" class="sticky-menubar" position="sticky" top="0">
        <template #start>
            <svg width="300" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-4rem">
                <image xlink:href="../../assets/logo/logo-pagawe-1.png" x="0" y="0" width="130" height="70" />
            </svg>
        </template>

<template #item="{ item, props, hasSubmenu, root }">
            <a v-ripple class="flex align-items-center" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
                <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                <span v-if="item.shortcut"
                    class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut
                    }}</span>
                <i v-if="hasSubmenu"
                    :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
            </a>
        </template>


<template #end>
            <div class="navbar">
                <div class="date">{{ currentDate }}</div>
            </div> -->
    <!-- <button @click="filterStatusPegawai">Fetch Data JK</button>  -->

    <!-- <div class="flex align-items-center gap-2"> 
                <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            </div>
        </template>
</Menubar> -->

    <template>
        <div class="card flex justify-content-center">
            <div class="flex flex-column gap-3">
                <div v-for="category in categories" :key="category.key" class="flex align-items-center">
                    <RadioButton v-model="selectedCategory" :inputId="category.key" name="dynamic"
                        :value="category.name" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>
        </div>
    </template>


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

        <!-- <template #end>
            <div class="card flex justify-content-center">
                <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City"
                    checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
            </div>
            <div class="hariIni">
                <div class="date">{{ currentDate }}</div>
            </div>
            <button @click="jumlahPegawaiTotal">Fetch Data JK</button>

        </template> -->
        <template #end>
            <Dropdown v-model="selectedCategory" :options="responseDataPegawaiTotalDropdown" optionLabel="nama"
                placeholder="Select Category" class="mr-2">
                <template #option="{ option }">
                    <div class="flex align-items-center">
                        <Checkbox :inputId="option.key" :value="option.namaRuangan" v-model="selectedCategory" />
                        <label :for="option.key" class="ml-2">{{ option.namaRuangan }}</label>
                    </div>
                </template>
            </Dropdown>


            <!-- Dropdown untuk memilih tanggal awal -->
            <Calendar v-model="startDate" class="mr-2" placeholder="Tgl Awal" :showIcon="true" dateFormat="dd/mm/yy"
                style="width: 120px;" />

            <!-- Dropdown untuk memilih tanggal akhir -->
            <Calendar v-model="endDate" class="mr-2" placeholder="Tgl Akhir" :showIcon="true" dateFormat="dd/mm/yy"
                style="width: 120px;" />

            <!-- Tombol untuk melakukan pencarian -->
            <Button @click="searchByDateRange" label="Search" icon="pi pi-search" />
        </template>

        <!-- <div class="flex align-items-center gap-2">
                <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />
                <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
            </div> -->


    </Menubar>


    <div class="my-container">
        <div class="row">

            <!-- BLOCK PERTAMA -->
            <div class="grid" style="height: auto;">




                <!-- BLOCK KEDUA -->
                <div class="col" style="background-color:#fff;">

                    <div style="padding-top: 5px;">
                        <div class="grid">
                            <div class="col-4">
                                <div class="text-center border-round-lg">

                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(216, 88, 135);">
                                                <span class="navbar-item tPutih">Total Pegawai </span>
                                                <div class="ml-auto pr-2">

                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickDepartemen" modal
                                                        header="Jumlah Pegawai" :style="{ width: '25rem' }">
                                                        <span class="p-text-secondary block mb-5"> Berdasarkan
                                                            Departemen.</span>
                                                        <div class="col">
                                                            <DataTable :value="responseDataDepartemenTotal"
                                                                tableStyle="min-width:100%" class="custom-datatable">
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="namaDepartemen" header="Departemen">
                                                                </Column>
                                                                <Column field="jumlah" header="Total"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickDepartemen = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <h3 style="text-align: center;">Total Pegawai : {{
                    responseDataPegawaiTotal.totalPegawai }}</h3>



                                            <div class="row" style="display: flex; justify-content: center;">
                                                <div class="flex">
                                                    <div class="col-6" v-for="jenisKelamin in responseDataJenisKelamin"
                                                        :key="jenisKelamin.nama">
                                                        <div>
                                                            <img v-if="jenisKelamin.nama === 'Laki Laki'"
                                                                src="../../assets/icon-pegawai/man.png" alt="Avatar"
                                                                style="width: 110px; height: auto; border-radius: 100%;">
                                                            <img v-if="jenisKelamin.nama === 'Perempuan'"
                                                                src="../../assets/icon-pegawai/woman.png" alt="Avatar"
                                                                style="width: 110px; height: auto; border-radius: 100%;">
                                                            <h4> {{ jenisKelamin.nama }}: {{ jenisKelamin.jumlah
                                                                }}</h4>
                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(216, 88, 135);">
                                                <span class="navbar-item tPutih">Total Pegawai Departemen</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="clickDepartemen = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickDepartemen" modal
                                                        header="Jumlah Pegawai" :style="{ width: '25rem' }">
                                                        <span class="p-text-secondary block mb-5"> Berdasarkan
                                                            Departemen.</span>
                                                        <div class="col">
                                                            <DataTable :value="responseDataDepartemenTotal"
                                                                tableStyle="min-width:100%" class="custom-datatable">
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="namaDepartemen" header="Departemen">
                                                                </Column>
                                                                <Column field="jumlah" header="Total"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickDepartemen = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>


                                            <div class="grid ">
                                                <div class="col ">
                                                    <pegawaiDepartemenChart />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(127, 168, 37);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Total Pegawai Berdasarkan
                                                    Status</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="clickStatus = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickStatus" modal header="Jumlah Pegawai"
                                                        :style="{ width: '25rem' }">
                                                        <span class="p-text-secondary block mb-5"> Berdasarkan
                                                            Status.</span>
                                                        <div class="col">
                                                            <DataTable :value="responseDataFilterStatusPegawai"
                                                                tableStyle="min-width:100%" class="custom-datatable">
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Status"></Column>
                                                                <Column field="jumlah" header="Total"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickStatus = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">

                                                <div class="col ">
                                                    <pegawaiStatusChart />
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 216, 184);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Berdasarkan Pendidikan
                                                    Terakhir</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="visible2 = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="visible2" modal
                                                        header="Pendidikan Terakhir" :style="{ width: '25rem' }">
                                                        <!-- <span class="p-text-secondary block mb-5">Berdasarkan Pendidikan Terakhir.</span> -->
                                                        <div class="col">
                                                            <DataTable :value="responseDataPendidikanTerakhir"
                                                                :scrollable="true" scrollHeight="300px" :rows="5"
                                                                :paginator="false" tableStyle="min-width:100%"
                                                                class="custom-datatable">

                                                                <template #header>
                                                                    <div
                                                                        class="flex flex-wrap align-items-center justify-content-between gap-2">
                                                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                                                    </div>
                                                                </template>
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Tingkat"></Column>
                                                                <Column field="jumlah" header="Jumlah"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="visible2 = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <pendidikanTerakhirChart style="width: absolute;" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 216, 184);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Berdasarkan Status Pajak
                                                    PTKP</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="visible2 = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="visible2" modal header="Status PTKP"
                                                        :style="{ width: '25rem' }">
                                                        <!-- <span class="p-text-secondary block mb-5">Berdasarkan Pendidikan Terakhir.</span> -->
                                                        <div class="col">
                                                            <DataTable :value="responseDataPendidikanTerakhir"
                                                                :scrollable="true" scrollHeight="300px" :rows="5"
                                                                :paginator="false" tableStyle="min-width:100%"
                                                                class="custom-datatable">

                                                                <template #header>
                                                                    <div
                                                                        class="flex flex-wrap align-items-center justify-content-between gap-2">
                                                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                                                    </div>
                                                                </template>
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Tingkat"></Column>
                                                                <Column field="jumlah" header="Jumlah"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="visible2 = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <statusPajakPTKPChart style="width: absolute;" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 216, 184);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Berdasarkan Masa Kerja</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="clickMasaKerja = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickMasaKerja" modal
                                                        header="Berdasarkan Masa Kerja" :style="{ width: '25rem' }">
                                                        <!-- <span class="p-text-secondary block mb-5">Berdasarkan Pendidikan Terakhir.</span> -->
                                                        <div class="col">
                                                            <DataTable :value="responseDataPegawaiMasaKerja"
                                                                :scrollable="true" scrollHeight="300px" :rows="5"
                                                                :paginator="false" tableStyle="min-width:100%"
                                                                class="custom-datatable">

                                                                <template #header>
                                                                    <div
                                                                        class="flex flex-wrap align-items-center justify-content-between gap-2">
                                                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                                                    </div>
                                                                </template>
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Tingkat"></Column>
                                                                <Column field="jumlah" header="Jumlah"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickMasaKerja = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <pegawaiMasaKerjaChart style="width: absolute;" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 216, 184);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Pinjaman yg masih berjalan</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="visible2 = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="visible2" modal
                                                        header="Pendidikan Terakhir" :style="{ width: '25rem' }">
                                                        <!-- <span class="p-text-secondary block mb-5">Berdasarkan Pendidikan Terakhir.</span> -->
                                                        <div class="col">
                                                            <DataTable :value="responseDataPendidikanTerakhir"
                                                                :scrollable="true" scrollHeight="300px" :rows="5"
                                                                :paginator="false" tableStyle="min-width:100%"
                                                                class="custom-datatable">

                                                                <template #header>
                                                                    <div
                                                                        class="flex flex-wrap align-items-center justify-content-between gap-2">
                                                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                                                    </div>
                                                                </template>
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Tingkat"></Column>
                                                                <Column field="jumlah" header="Jumlah"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="visible2 = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <pendidikanTerakhirChart style="width: absolute;" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 216, 184);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Berdasarkan Biaya Pajak Per
                                                    Bulan</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="visible2 = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="visible2" modal header="Status PTKP"
                                                        :style="{ width: '25rem' }">
                                                        <!-- <span class="p-text-secondary block mb-5">Berdasarkan Pendidikan Terakhir.</span> -->
                                                        <div class="col">
                                                            <DataTable :value="responseDataPendidikanTerakhir"
                                                                :scrollable="true" scrollHeight="300px" :rows="5"
                                                                :paginator="false" tableStyle="min-width:100%"
                                                                class="custom-datatable">

                                                                <template #header>
                                                                    <div
                                                                        class="flex flex-wrap align-items-center justify-content-between gap-2">
                                                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                                                    </div>
                                                                </template>
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Tingkat"></Column>
                                                                <Column field="jumlah" header="Jumlah"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="visible2 = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <statusPajakPTKPChart style="width: absolute;" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-4">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 216, 184);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Biaya BPJS Per Bulan</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="clickMasaKerja = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickMasaKerja" modal
                                                        header="Biaya BPJS Per Bulan" :style="{ width: '25rem' }">
                                                        <!-- <span class="p-text-secondary block mb-5">Berdasarkan Pendidikan Terakhir.</span> -->
                                                        <div class="col">
                                                            <DataTable :value="responseDataPegawaiMasaKerja"
                                                                :scrollable="true" scrollHeight="300px" :rows="5"
                                                                :paginator="false" tableStyle="min-width:100%"
                                                                class="custom-datatable">

                                                                <template #header>
                                                                    <div
                                                                        class="flex flex-wrap align-items-center justify-content-between gap-2">
                                                                        <!-- <Button icon="pi pi-refresh" rounded raised /> -->
                                                                    </div>
                                                                </template>
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Tingkat"></Column>
                                                                <Column field="jumlah" header="Jumlah"></Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickMasaKerja = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <cobaChart style="width: absolute;" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Divider />
                        <div class="grid" style="padding-top: 5px; padding-bottom: 20px;">
                            <div class="col">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(216, 88, 135);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">STR SIP Pegawai Mendekati
                                                    Expired</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="clickUsiaDanJenisKelamin = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickUsiaDanJenisKelamin" modal
                                                        header="Jumlah Pegawai" :style="{ width: '30rem' }">
                                                        <span class="p-text-secondary block mb-5"> Berdasarkan
                                                            Usia dan Jenis
                                                            Kelamin.</span>
                                                        <div class="col">
                                                            <DataTable :value="responseDataUsiaDanJenisKelamin"
                                                                tableStyle="min-width:100%" class="custom-datatable">
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Usia"></Column>
                                                                <Column field="laki-laki" header="Laki-laki">
                                                                </Column>
                                                                <Column field="perempuan" header="Perempuan">
                                                                </Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickUsiaDanJenisKelamin = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <strSip />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="text-center border-round-lg">
                                    <div class="chart-card">
                                        <div class="card">
                                            <div class="navbar tinggi-nav-radius"
                                                style="background-color: rgb(88, 158, 216);">
                                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                                <span class="navbar-item tPutih">Jumlah Pegawai Berdasarkan Usia
                                                    dan Jenis
                                                    Kelamin</span>
                                                <div class="ml-auto pr-2">
                                                    <Button label=" Detail" @click="clickUsiaDanJenisKelamin = true"
                                                        class="pi pi-table tombol" />
                                                </div>
                                                <div class="card flex justify-content-end">
                                                    <Dialog v-model:visible="clickUsiaDanJenisKelamin" modal
                                                        header="Jumlah Pegawai" :style="{ width: '30rem' }">
                                                        <span class="p-text-secondary block mb-5"> Berdasarkan
                                                            Usia dan Jenis
                                                            Kelamin.</span>
                                                        <div class="col">
                                                            <DataTable :value="responseDataUsiaDanJenisKelamin"
                                                                tableStyle="min-width:100%" class="custom-datatable">
                                                                <Column field="index" header="No"
                                                                    :style="{ 'width': '3em' }">
                                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                                    <template #body="props">
                                                                        {{ props.index + 1 }}
                                                                    </template>
                                                                </Column>
                                                                <Column field="nama" header="Usia"></Column>
                                                                <Column field="laki-laki" header="Laki-laki">
                                                                </Column>
                                                                <Column field="perempuan" header="Perempuan">
                                                                </Column>
                                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                                            </DataTable>
                                                        </div>
                                                        <div class="flex justify-content-end gap-2">
                                                            <Button type="button" label="Cancel" severity="secondary"
                                                                @click="clickUsiaDanJenisKelamin = false"></Button>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="col">
                                                    <usiaDanJenisKelamin />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <Divider />
                    </div>
                </div>
                <!-- <div class="col-2">
                    <h1>tes</h1>
                </div> -->
            </div>
        </div>

        <div class="row" style="padding-top: 5px;">

            <div class="col">
                <div class="text-center border-round-lg">
                    <div class="chart-card">
                        <div class="card">
                            <div class="navbar tinggi-nav-radius" style="background-color: #caceed;">
                                <!-- Tambahkan elemen-elemen navbar di sini -->
                                <span class="navbar-item tPutih">Total Pegawai Berdasarkan
                                    Jabatan</span>
                                <div class="ml-auto pr-2">
                                    <Button label=" Detail" @click="clickJabatan = true" class="pi pi-table tombol" />
                                </div>
                                <div class="card flex justify-content-end">
                                    <Dialog v-model:visible="clickJabatan" modal header="Jumlah Pegawai"
                                        :style="{ width: '25rem' }">
                                        <span class="p-text-secondary block mb-5">
                                            Berdasarkan
                                            Jabatan.</span>
                                        <div class="col">
                                            <DataTable :value="responseDataJabatanTotal" tableStyle="min-width:100%"
                                                class="custom-datatable">
                                                <Column field="index" header="No" :style="{ 'width': '3em' }">
                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                    <template #body="props">
                                                        {{ props.index + 1 }}
                                                    </template>
                                                </Column>
                                                <Column field="namaJabatan" header="Jabatan">
                                                </Column>
                                                <Column field="totalPegawai" header="Total">
                                                </Column>
                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                            </DataTable>
                                        </div>
                                        <div class="flex justify-content-end gap-2">
                                            <Button type="button" label="Cancel" severity="secondary"
                                                @click="clickJabatan = false"></Button>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>

                            <div class="grid">
                                <div class="col">
                                    <pegawaiJabatanChart />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-6" style="width: 100%">
                <!-- <h2>Column 1</h2> -->
                <div class="grid">
                    <div class="col">
                        <div class="text-center border-round-lg">
                            <div class="chart-card">
                                <div class="card">
                                    <div class="navbar tinggi-nav-radius" style="background-color: rgb(88, 158, 216);">
                                        <!-- Tambahkan elemen-elemen navbar di sini -->
                                        <span class="navbar-item tPutih">Kehadiran</span>
                                    </div>

                                    <div class="grid">
                                        <div class="col">
                                            <DataTable ref="dt" :value="responseDataRekapByRuanganHarian"
                                                :scrollable="true" scrollHeight="500px" :paginator="false" :rows="5"
                                                tableStyle="min-width:100%;"
                                                class="custom-datatable responsive-datatable">

                                                <template #header>
                                                    <div class="p-grid p-nogutter p-align-left">
                                                        <div class="p-col">
                                                            <!-- Tempatkan kotak pencarian di sini -->

                                                        </div>
                                                        <div class="p-col-fixed" style="width: 100px;">
                                                            <!-- Tempatkan tombol export di sini -->
                                                            <Button icon="pi pi-external-link" label="Export"
                                                                @click="exportCSV($event)" />
                                                        </div>
                                                    </div>
                                                </template>

                                                <Column field="index" header="No" :style="{ 'width': '3em' }">
                                                    <!-- Gunakan slot "body" untuk menampilkan nomor urut -->

                                                    <template #body="props">
                                                        {{ props.index + 1 }}
                                                    </template>
                                                </Column>
                                                <Column header="Foto" :style="{ width: '100px' }">

                                                    <template #body="props">
                                                        <img :src="props.data.photoUrl" alt=""
                                                            style="max-width: 50%; max-height: 100px;"> </template>
                                                </Column>

                                                <Column field="namaLengkap" header="Nama"></Column>
                                                <Column field="tanggalString" header="Tanggal"></Column>
                                                <Column field="checkIn" header="Check In"></Column>
                                                <Column field="checkOut" header="Check Out"></Column>
                                                <Column field="jadwalMasuk" header="Jadwal Masuk"></Column>
                                                <Column field="jadwalPulang" header="Jadwal Pulang"></Column>
                                                <!-- Tambahkan kolom lain sesuai kebutuhan -->
                                            </DataTable>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>









    </div>
</template>

<script>
import Column from 'primevue/column';
import employesController from '../../controller/employes-controller';
import filterController from '../../controller/filter-controller';

import jenisKelaminChart from '../../components/jenisKelaminChart.vue';
import pendidikanTerakhirChart from '../../components/pendidikanTerakhirChart.vue';
import pegawaiJabatanChart from '../../components/pegawaiJabatanChart.vue';
import pegawaiDepartemenChart from '../../components/pegawaiDepartemenChart.vue';
import pegawaiMasaKerjaChart from '../../components/pegawaiMasaKerjaChart.vue';

import MyApexChart from '../../components/MyApexChart.vue';
import filterLokasiKerjaChart from '../../components/filterLokasiKerjaChart.vue';
import pegawaiStatusChart from '../../components/pegawaiStatusChart.vue';
import usiaDanJenisKelamin from '../../components/usiaDanJenisKelaminChart.vue';
import statusPajakPTKPChart from '../../components/statusPajakPTKPChart.vue';


import strSip from '../../components/strSip.vue';
import cobaChart from '../../components/cobaChart.vue';



import './style.css';

export default {
    mixins: [employesController, filterController],
    components: {
        jenisKelaminChart,
        pendidikanTerakhirChart,
        MyApexChart,
        filterLokasiKerjaChart,
        usiaDanJenisKelamin,
        pegawaiJabatanChart,
        pegawaiStatusChart,
        pegawaiDepartemenChart,
        pegawaiMasaKerjaChart,
        statusPajakPTKPChart,
        strSip,

        cobaChart

    },
}

</script>
