<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <img src="../../assets/user.png" alt="" class="user-img" color="indigo" v-bind="props">
            </template>

            <v-card min-width="300">
                <v-list class="d-flex align-center">
                        <img src="../../assets/user(1).png" alt="" class="user-img">
                        <h3>{{ user.full_name }}</h3>
                </v-list>

                <hr />
                <v-list>
                    <div class="d-flex align-center" >
                        <img src="../../assets/youtube.png" alt="" class="user-img"  to="/cover-user" />
                        <v-btn to="/cover-user">Your Channel</v-btn>
                    </div>
                    <div class="d-flex align-center" >
                        <img src="../../assets/logout(1).png" alt="" class="user-img" id="logout" @click="logout" >
                        <label for="logout">Logout</label>
                    </div>
                </v-list>
                <hr/>
                <v-list>
                    <div class="d-flex align-center">
                        <img src="../../assets/brightness-and-contrast.png" alt="" class="user-img">
                        <label>Dark Mode</label>
                    </div>
                    <div class="d-flex align-center">
                        <img src="../../assets/feedback.png" alt="" class="user-img">
                        <label>Feedback</label>
                    </div>
                </v-list>
            
            </v-card>
        </v-menu>
    </div>
</template>
<script>
export default {
    props: ['user'],
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true,
    }),
    methods: {
        logout() {
            this.$emit('logout', true)
        }
    }
}
</script>
<style scoped>
.user-img {
    width: 36px;
    margin: 15px;
    cursor: pointer;
}
</style>