<template>
  <div>
    <div class="container font">
      <div class="my-4">
        <div class="text-center w-60 m-auto">
          <!-- title -->
          <div class="py-1">
            <h3 class="fontbold green">Testimonials</h3>
          </div>
          <div>
            <span
              >Students from all around the world that have used our platform
              have something to say</span
            >
          </div>
        </div>
        <!-- testimonial card -->
        <Carousel class="w-60 m-auto">
          <Slide
            :items-to-show="1"
            :wrap-around="true"
            class="rounded-2 my-4 bglightblue p-3 py-5"
          >
            <div>
              <div class="d-flex align-items-center justify-content-center">
                <div class="">
                  <img src="" alt="" />
                </div>
                <div>
                  <span>Faith j.j</span>
                  <br />
                  <span>Front-end Developer </span>
                </div>
              </div>
              <div class="pt-3">
                <p class="fs-200 fw-bold text-center">
                  "i have used this platform and i can tell you that its the
                  best Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, voluptatum. "
                </p>
              </div>
            </div>
          </Slide>
          <Slide
            :items-to-show="1"
            :wrap-around="true"
            class="rounded-2 my-4 bglightblue p-3 py-5"
          >
            <div>
              <div class="d-flex align-items-center justify-content-center">
                <div class="">
                  <img src="" alt="" />
                </div>
                <div>
                  <span>John j.j</span>
                  <br />
                  <span>Front-end Developer </span>
                </div>
              </div>
              <div class="pt-3">
                <p class="fs-200 fw-bold text-center">
                  "i have used this platform and i can tell you that its the
                  best Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, voluptatum. "
                </p>
              </div>
            </div>
          </Slide>
          <Slide
            :items-to-show="1"
            :wrap-around="true"
            class="rounded-2 my-4 bglightblue p-3 py-5"
          >
            <div>
              <div class="d-flex align-items-center justify-content-center">
                <div class="">
                  <img src="" alt="" />
                </div>
                <div>
                  <span>Jesutobi j.j</span>
                  <br />
                  <span>Front-end Developer </span>
                </div>
              </div>
              <div class="pt-3">
                <p class="fs-200 fw-bold text-center">
                  "i have used this platform and i can tell you that its the
                  best Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat, voluptatum. "
                </p>
              </div>
            </div>
          </Slide>
          <template #addons>
            <div class="d-flex justify-content-between">
              <Navigation />
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

// import { defineComponent } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "WrapAround",
  components: {
    Carousel,
    Slide,
    Navigation,
  },
});
</script>

<style scoped></style>
