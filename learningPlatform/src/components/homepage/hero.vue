<template>
  <div>
    <div class="bghero font">
      <div>
        <div class="space ">
          <!--Content before waves-->
          <div class="" >
            <div class="row containerH">
              <div class="col-lg-6 px-3 col-xl-6 col-xxl-6">
                <!-- image -->
                <div  >
                  <img
                    src="@/assets/images/beautiful-brunette-woman-staying-her-workplace2.jpg"
                    alt=""
                    class="w-100 rounded-3 m-2"
                    
                  />
                </div>
              </div>
              <!-- content -->
              <div class="col-lg-6 col-xl-6 col-xxl-6">
                <!-- intro text -->
                <div class="w-100 pt-4">
                  <div>
                    <h1 class="text-weight fontbold w-100 fw-bold black">
                      Online Courses
                    </h1>
                  </div>
                  <div>
                    <h1 class="text-weight fontbold fw-bold black">
                      On Demand
                    </h1>
                  </div>
                  <div class="py-3">
                    <p class="">
                      “The more that you read, the more things you will know.
                      The more that you learn, the more places you’ll go.” 

                      <br>
                      ― Dr.Seuss
                    </p>
                  </div>
                  <!-- explore button -->
                  <div class="pt-4">
                    <div
                      class="bggreen rounded-2 text-center white fw-bold w-50 p-3"
                    >
                      <span class="fs-300">Explore</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--  -->
          </div>

          <!--Waves Container-->
          <div>
            <svg
              class="waves"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shape-rendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g class="parallax">
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(255,255,255,0.7"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlink:href="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.3)"
                />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>
          <!--Waves end-->
        </div>
        <!--Header ends-->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* hero background */
.bghero {
  background-image: url(@/assets/images/banner-bg.png);
  height: 600px;
  /* width: 100% !important; */
}
/* hero font */
.text-weight {
  font-weight: 900 !important;
  font-size: 4.5rem;
}
/* intro words spacing */
.intro-spacing {
  word-spacing: 1rem !important;
}
/* hero of homepage */

.space {
  padding: 4.2rem 0 0 0rem !important;
}
</style>
