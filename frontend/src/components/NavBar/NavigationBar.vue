<template>
  <v-app class="fill-height"> 
    <v-app-bar app theme="dark" class="px-3">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link to="/" 
        ><img
          :src="require('../../assets/my-logo.png')"
          width="90"
          height="90"
          style="border-radius: 25px; margin-top: 10px"
          alt=""
          class="mx-16"
      /></router-link>
      <v-spacer></v-spacer>
      <v-text-field class="w-75 ml-auto" :item="filteredVideos" density="compact" variant="solo" label="Search here"
        append-inner-icon="mdi-magnify" v-model="searchQuery" @keyup.enter="searchVideos" single-line hide-details
        rounded="pill"></v-text-field>
      <v-spacer></v-spacer>
      <!-- <v-menu transition="slide-x-transition" bottom right :open-on-click="true">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon size="x-large">mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list width="300px">
          <v-list-item>
            <v-avatar class="mr-5" :image="profilePictureUrl" size="40"></v-avatar>
            <v-item-title>{{ user.full_name }} </v-item-title>
          </v-list-item>
          <v-divider :thickness="3"></v-divider>

          <v-list-item :prepend-icon="profiles[0].icon" :title="profiles[0].title" :value="profiles[0].title"
            :to="profiles[0].to" v-if="haveChannel"></v-list-item>
          <v-list-item v-if="!haveChannel" :prepend-icon="profiles[0].icon" title="Create Channel"
            :value="profiles[0].title" @click="showChannelDialog = true"></v-list-item>
          <v-list-item :prepend-icon="profiles[1].icon" :title="profiles[1].title"
            :value="profiles[1].title"></v-list-item>
          <v-list-item :prepend-icon="profiles[2].icon" :title="profiles[2].title"
            :value="profiles[2].title"></v-list-item>
          <v-list-item :prepend-icon="profiles[3].icon" :title="profiles[3].title"
            :value="profiles[3].title"></v-list-item>
          <v-list-item :prepend-icon="profiles[4].icon" :title="profiles[4].title" :value="profiles[4].title"
            @click="logout"></v-list-item>
          <v-divider :thickness="1"></v-divider>
        </v-list>
      </v-menu> -->
    </v-app-bar>
    <!-- <v-navigation-drawer app theme="dark" v-model="drawer" width="200">
      <v-list>
        <v-list-item v-for="icon of icons" :key="icon.title" class="ml-2" @click="drawer = !drawer"
          :prepend-icon="icon.icon" :title="icon.title" :to="icon.to"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
      user: {
        token: "",
        full_name: "",
        email: "",
        user_id: "",
      },
      searchQuery: "",
      filteredVideos: [],
      dialog: false,
      drawer: false,
      profiles: [
        {
          title: "Your Channel",
          icon: "mdi-laptop-account",
          to: "/cover-user",
        },
        {
          title: "Switch Account",
          icon: "mdi-account-reactivate-outline",
          to: "",
        },
        { title: "Theme", icon: "mdi-theme-light-dark", to: "" },
        { title: "Feedback", icon: "mdi-message-alert", to: "" },
        { title: "Sign Out", icon: "mdi-login-variant" },
      ],
      icons: [
        { title: "Home", icon: "mdi-home", to: "/" },
        { title: "Upload", icon: "mdi-video-plus", to: "/upload" },
        { title: "History", icon: "mdi-history", to: "/history" },
        { title: "Playlist", icon: "mdi-playlist-play", to: "/uerPlaylist" },
      ],
      loginForm: false,
      registerForm: false,
      showChannelDialog: false,
      channel: [],
      haveChannel: false,
      profilePictureUrl: require("@/assets/users.jpg"),
      notifications: [],
    };
  },
  methods: {
    createChannel(item) {
      this.showChannelDialog = item;
      this.getChannel();
    },
    getVideos: function () {
      this.$http.get(`/allVideos`).then((response) => {
        this.listVideos = response.data;
      });
    },
    getNotifications() {
      this.$http
        .get("/notification", {
          headers: { Authorization: `Bearer ${this.user.token}` },
        })
        .then((response) => {
          this.notifications = response.data.data;
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    logout() {
      this.$http
        .post(`/logout`, null, {
          headers: { Authorization: `Bearer ${this.user.token}` },
        })
        .then((response) => {
          this.deleteCookie();
          this.user = {
            token: "",
            full_name: "",
            email: "",
            user_id: "",
          };
          console.log(response.data);
          location.loading;
          window.location.reload();
        }, 200)
        .catch((error) => {
          console.log(error.message);
        });
    },
    getChannel() {
      const now = new Date();
      const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // set the expiration time to 30 days from now
      const cookieOptions = {
        expires: expires,
        path: '/' // set the path to the root directory so the cookie can be accessed across the site
      };
      this.$http
        .get(`/user/channels`, {
          headers: {
            Authorization: "Bearer " + this.user.token,
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.channel = response.data.data;
          this.haveChannel = true;
          this.$cookies.set('channel_id', this.channel.id, cookieOptions)
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    searchVideos() {
      this.filteredVideos = [];
      const videos = this.listVideos;
      videos.forEach((video) => {
        if (
          video.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        ) {
          this.filteredVideos.push(video);
        }
      });
      if (this.filteredVideos.length > 0) {
        this.$router.push({
          name: "search",
          params: {
            title: this.searchQuery,
          },
        });
      }
    },
    handOverIsShowLogin(item) {
      this.getDataFromCookies();
      this.loginForm = item;
    },
    handOverIsShowRegister(item) {
      this.getDataFromCookies();
      this.registerForm = item;
    },
    handOver(item) {
      this.loginForm = item.login;
      this.registerForm = item.register;
    },
    handOverToken(user) {
      this.user = user;
    },
    getDataFromCookies() {
      this.user.user_id =
        this.$cookies.get("user_id") !== "undefined" &&
          this.$cookies.get("user_id") !== null
          ? this.$cookies.get("user_id")
          : "";
      this.user.full_name =
        this.$cookies.get("full_name") !== "full_name" &&
          this.$cookies.get("full_name") !== null
          ? this.$cookies.get("full_name")
          : "";
      this.user.email =
        this.$cookies.get("email") !== "email" &&
          this.$cookies.get("email") !== null
          ? this.$cookies.get("email")
          : "";
      this.user.token =
        this.$cookies.get("token") !== "undefined" &&
          this.$cookies.get("token") !== null
          ? this.$cookies.get("token")
          : "";
    },
    deleteCookie() {
      this.$cookies.remove("user_id");
      this.$cookies.remove("full_name");
      this.$cookies.remove("email");
      this.$cookies.remove("token");
      this.$cookies.remove("user_role");
      this.$cookies.remove("channel_id");
      this.$cookies.remove("favorites");
    },
  },
  mounted() {
    // this.getDataFromCookies();
    // this.getChannel();
    // this.getNotifications();
    // this.getVideos();
    // this.$http.get(`/allVideos`).then((response) => {
    //   this.listVideos = response.data;
    // });
  },
};
</script>

<style scoped>
.v-main {
  background-color: #252525;
  color: white;
}
</style>
