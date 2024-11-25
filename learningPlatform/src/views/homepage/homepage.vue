<template>
  <div>
    <div>
      <Hero />
    </div>
    <div>
      <Recommended />
    </div>
    <div>
      <Categories />
    </div>
    <!-- our partners -->
    <div>
      <Partners />
    </div>
    <!-- Testimonial -->
    <div>
      <Testimonial />
    </div>
  </div>
</template>

<script>
import Hero from "@/components/homepage/hero.vue";
import Partners from "@/components/homepage/partners.vue";
import Categories from "@/components/homepage/categories.vue";
import Testimonial from "@/components/homepage/testimonial.vue";
import Recommended from "@/components/homepage/recommendedVideos.vue";
export default {
  components: {
    Hero,
    Recommended,
    Partners,
    Categories,
    Testimonial,
  },
};
</script>

<style></style>
