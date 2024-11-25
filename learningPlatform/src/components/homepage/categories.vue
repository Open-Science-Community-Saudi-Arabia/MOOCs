<template>
  <div>
    <div class="container font">
      <!-- recommended courses -->
      <div class="">
        <div class="my-3 rounded-3 p-3">
          <!-- title -->
          <div>
            <h5 class="fw-bold py-3">Explore our Top Categories</h5>
          </div>
          <!-- courses -->
          <div>
            <Carousel :items-to-show="4" :wrap-around="true" class="row my-3">
              <Slide class="col-lg-3 mx-2 col-md-3 col-xl-3 col-xxl-3">
                <!-- card -->
                <div
                  class="position-relative carousel__item shadow-sm rounded-2 notinmobile"
                >
                  <div class="">
                    <img
                      src="@/assets/images/19362653.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div class="w-95 black my-2 p-2 category white rounded-3">
                    <!-- view -->
                    <div
                      class="bggreen text-center white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>Web Development</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 mx-2 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative shadow-sm rounded-2 notinmobile">
                  <div class="">
                    <img
                      src="@/assets/images/stock-market-graph-financial-data-electronic-board-laptop-screen.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div class="w-95 black my-2 p-2 category white rounded-3">
                    <!-- view -->
                    <div
                      class="bggreen text-center white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>Business</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 mx-2 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative shadow-sm rounded-2 notinmobile">
                  <div class="">
                    <img
                      src="@/assets/images/black-videographer-smiling-camera-editing-video-project-post-production-software-working-creative-studio-office.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div class="w-95 black my-2 p-2 category white rounded-3">
                    <!-- view -->
                    <div
                      class="bggreen text-center white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>Design</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 mx-2 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative shadow-sm rounded-2 notinmobile">
                  <div class="">
                    <img
                      src="@/assets/images/handsome-african-guy-with-stylish-haircut-taking-photo-digital-camera.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div class="w-95 black my-2 p-2 category white rounded-3">
                    <!-- view -->
                    <div
                      class="bggreen text-center white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>Photography</span>
                    </div>
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
          <!-- view all -->
          <!-- <div class="d-flex justify-content-end">
            <div class="bggreen rounded-2 py-2 white w-20 text-center">
              <span class="fw-bold">View all</span>
            </div>
          </div> -->
        </div>
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

<style scoped>
/* carousel style */
.carousel__item {
  min-height: 200px;
  width: 100%;

}


/* closed */
/* image style */
.imagecover {
  object-fit: cover !important;
}
/* price of flight or hotel */
.category {
  position: absolute;
  /* top: 0rem; */
  bottom: 0rem;
  left: 0.4rem;
  right: 0rem;
}
.hffocus:visited {
  background-color: red;
}

/* max-width */
.header-width {
  max-width: 90% !important;
  margin: auto !important;
}

</style>
