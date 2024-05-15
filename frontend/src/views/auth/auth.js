import { hrisServiceAuthInfo } from "../../api/index";

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
                    "/authInfo/auth/sign-in/login",
                    {
                        namaUser: this.username,
                        kataSandi: this.password
                    }
                );
                // Handle successful login
                console.log(response.data);
                 // Redirect ke halaman "/eis" setelah login berhasil
                this.$router.push("/eis");
            } catch (error) {
                // Handle login error
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
