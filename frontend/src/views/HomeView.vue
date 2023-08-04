<template>
  <div>
    <v-card
      class="mx-10 my-6 d-flex justify-center align-center text-h4"
      style="height: 120px"
    >
      <h1 class="text-pink-lighten-2">ANNIVERSARY</h1>
    </v-card>
    <div class="d-flex justify-space-evenly align-center">
      <div class="text-center mx-8">
        <img
          :src="require('@/assets/photo_2023-08-04_15-58-25.jpg')"
          alt=""
          width="250"
          class="rounded-shaped"
        />

        <p>Seyha Chab</p>
      </div>
      <img :src="require('@/assets/OIF-removebg-preview.png')" alt="" width="200">
      <div class="text-center mx-8">
        <img
          :src="require('@/assets/photo_2023-08-04_16-05-37.jpg')"
          alt=""
          width="250"
          class="rounded-shaped"
        />

        <p>Vireak Roeun</p>
      </div>
    </div>
    <div class="d-flex">
      <v-card
        class="ml-10 mr-5 my-6 d-flex px-5 justify-center align-center text-h4"
        style="height: 120px"
      >
        <h1 class="text-blue-grey-darken-3">06/02/22</h1>
      </v-card>
      <v-card
        class="mr-10 my-6 d-flex flex-1-1 align-center text-h4 pl-16"
        style="height: 120px"
      >
        <h1 class="text-blue-grey-darken-3">Counter: {{ daysSinceDate }}</h1>
      </v-card>
    </div>
  </div>
  <div class="mx-10">
    <div class="text-center">
      <h1>GOOD MEMORIES</h1>
    </div>
    <div class="d-flex mt-5 flex-wrap justify-space-between">
      <v-card class="mx-3 my-3">
        <img
          :src="require('@/assets/photo_2023-08-01_10-43-46.jpg')"
          alt=""
          width="300"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: new Date("02/06/22"), // Set the start date
      currentDate: new Date(), // Get the current date
    };
  },
  computed: {
    daysSinceDate() {
      const timeDifference =
        this.currentDate.getTime() - this.startDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      return daysDifference;
    },
  },
};
</script>
<style  scoped>
h1 {
  font-family: fantasy;
}
</style>