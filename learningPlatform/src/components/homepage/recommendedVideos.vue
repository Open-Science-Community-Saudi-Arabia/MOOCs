<template>
  <div>
    <div class="container font">
      <!--intro -->
      <div class="text-center py-4 w-60 m-auto fw-bold">
        <h4 class="fw-bold green">
          OSCSA is dedicated to bringing you Learning materials that would help
          your Academic and Skill growth for the growth of your career
        </h4>
      </div>
      <!-- recommended courses -->
      <div class="">
        <div class="border my-3 rounded-3 p-3">
          <!-- title -->
          <div>
            <h5 class="fw-bold py-3">
              Explore our list of recommended courses
            </h5>
          </div>
          <!-- courses -->
          <div>
            <Carousel
              :itemsToShow="4"
              :settings="CarouselSettings"
              class="row my-3"
            >
              <Slide
                style="height: 300px"
                class="col-lg-3 col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 text-start courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide class="col-lg-3 col-md-3 col-xl-3 col-xxl-3">
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen white text-start fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide class="col-lg-3 col-md-3 col-xl-3 col-xxl-3">
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide class="col-lg-3 col-md-3 col-xl-3 col-xxl-3">
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
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
          <div class="d-flex justify-content-end">
            <div class="bggreen rounded-2 py-2 white w-20 text-center">
              <span class="fw-bold">View all</span>
            </div>
          </div>
        </div>
      </div>
      <!-- ARticles for you -->
      <div class="">
        <div class="border my-3 rounded-3 p-3">
          <!-- title -->
          <div>
            <h5 class="fw-bold py-3">Learning materials for you</h5>
          </div>
          <!-- courses -->
          <div>
            <Carousel
              :itemsToShow="4"
              :settings="CarouselSettings"
              class="row my-3"
            >
              <Slide
                class="col-lg-3 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="text-start py-2">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
                    </div>
                  </div>
                </div>
              </Slide>
              <Slide
                class="col-lg-3 carousel__item col-md-3 col-xl-3 col-xxl-3"
              >
                <!-- card -->
                <div class="position-relative notinmobile m-2">
                  <div class="">
                    <img
                      src="@/assets/images/young-beautiful-woman-works-office-speak-video-call-laptop.jpg"
                      alt=""
                      class="w-100 imagecover rounded-2"
                      style="height: 290px"
                    />
                  </div>

                  <div
                    class="w-95 black my-2 p-2 courseDatePosition white rounded-3"
                  >
                    <div class="py-2 text-start">
                      <!-- title -->
                      <div class="fs-200">
                        <span style="height: 3vh" class="fw-bold">
                          Learn Python: The Complete Python Programming Course
                        </span>
                      </div>
                      <!-- course by -->
                      <div class="fs-170 py-1">
                        <span class=""> Jesutobi j.j </span>
                      </div>
                    </div>

                    <!-- view -->
                    <div
                      class="bggreen text-start white fw-bold fs-170 rounded-2 py-2 px-3"
                    >
                      <span>view</span>
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
          <div class="d-flex justify-content-end">
            <div class="bggreen rounded-2 py-2 white w-20 text-center">
              <span class="fw-bold">View all</span>
            </div>
          </div>
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
/* image style */
.imagecover {
  object-fit: cover !important;
}
/* price of flight or hotel */
.courseDatePosition {
  position: absolute;
  /* top: 0rem; */
  bottom: 0rem;
  left: 0.4rem;
  right: 0rem;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.781) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
}
.hffocus:visited {
  background-color: red;
}
/* focus on hotels and flight button */
.hffocus:active,
:hover {
  background-color: rgba(255, 255, 255, 1);
}

/* max-width */
.header-width {
  max-width: 90% !important;
  margin: auto !important;
}
</style>
