<script>
import "../auth/auth.css"
import { hrisServiceAuthInfo, token } from "../../api/index";

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await hrisServiceAuthInfo.post(
                    "auth/sign-in/login",
                    {
                        namaUser: this.username,
                        kataSandi: this.password
                    },
                    {
                        headers: {
                            "x-auth-token": token // Menggunakan token dari import
                        }
                    }
                );
                // Log respons untuk memeriksa struktur respons
                console.log(response.data);
                if (response.status === 200) {
                    const token = response.data.data.token;
                    // Pastikan nama 'accessToken' sesuai saat menyimpan ke localStorage
                    localStorage.setItem('accessToken', token);

                    // Redirect ke halaman "/dashboard" setelah login berhasil
                    this.$router.push("/dashboard");
                } else {
                    // Tangani situasi lain jika diperlukan
                    console.log("Gagal login");
                }
            } catch (error) {
                // Tangani kesalahan jika terjadi
                console.error('Login error:', error);
            }
        },
        loginOnEnter(event) {
            if (event.key === 'Enter') {
                this.login();
            }
        }
    }
}
</script>

<template>
    <div class="containerLogin">
        <div class="cardLogin logo">
            <div class="flex flex-column md:flex-row">
                <div class="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-8">
                    <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label class="w-6rem">Username</label>
                        <InputText v-model="username" id="username" type="text" class="w-12rem"
                            @keydown.enter="loginOnEnter" />
                    </div>
                    <div class="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label class="w-6rem">Password</label>
                        <InputText v-model="password" id="password" type="password" class="w-12rem"
                            @keydown.enter="loginOnEnter" />
                    </div>

                </div>
                <div class="w-full md:w-2">
                    <Divider layout="vertical" class="hidden md:flex"><b>OR</b></Divider>
                    <Divider layout="horizontal" class="flex md:hidden" align="center"><b>OR</b></Divider>
                </div>
                <div class="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <div>
                        <Button label="Login" @click="login()" icon="pi pi-user" class="w-10rem"></Button>
                    </div>
                    <div>

                        <Button label="Sign Up" icon="pi pi-user-plus" severity="success"
                            class="center w-10rem"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
/* .container {
    margin: 200px;
    height: 300px;
    padding: 15px;
    background-color: rgb(34, 50, 74);
} 

/* .center {
    margin: center;
} */
</style>