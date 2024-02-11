<template>
  <div>
    <!-- nav bar -->
    <div>
      <Nav />
    </div>
    <!-- home page content -->
    <div>
      <Home />
    </div>
    <!-- footer -->
    <div>
      <Footer />
    </div>
  </div>
</template>

<script>
// import { RouterLink, RouterView } from "vue-router";
import Nav from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Home from "@/views/homepage/homepage.vue";
export default {
  components: {
    Nav,
    Home,
    Footer,

    // RouterLink,
    // RouterView,
  },
};
</script>

<style scoped></style>
