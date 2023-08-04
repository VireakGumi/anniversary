<template>
  <div>
    <!-- <template v-if="userRole === 'admin'">
      <AdminNavTop />
    </template>
    <template v-else>
     
    </template> -->
    <navigation-bar></navigation-bar>
    <!-- <NavigationBar/> -->
  </div>
</template>
<script>
// import AdminNavTop from "./components/Nav/AdminNavTop.vue";
import NavigationBar from "./components/NavBar/NavigationBar.vue";

export default {
  components: { 
    // AdminNavTop,
    NavigationBar
   },
  data() {
    return {
    }
  },
  methods: {

  },

};
</script>

<style  scoped>

</style>