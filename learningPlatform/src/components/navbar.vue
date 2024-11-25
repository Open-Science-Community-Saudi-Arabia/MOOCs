<template>
  <div class="bggreen font sticky-top">
    <div class="fontneubold container">
      <!-- container -->

      <div
        class="d-flex mob-width py-4 align-items-center justify-content-between"
      >
        <!-- logo -->
        <router-link to="/" class="text-reset text-decoration-none">
          <div>
            <img src="@/assets/icon/logo1.png" alt="" style="width: 170px" />
          </div>
        </router-link>
        <!-- search bar -->
        <div class="bgwhite rounded-2 shadow-sm px-2 w-30">
          <div class="d-flex align-items-center justify-content-between">
            <div class="w-100">
              <input
                type="text"
                placeholder="What do you want to learn"
                class="rounded-2 p-2 border-0  w-100 fs-200"
              />
            </div>
            <!-- icon -->
            <div>
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="20px"
                height="20px"
              >
                <path
                  d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
                />
              </svg>
            </div>
          </div>
        </div>
        <!-- buttons -->
        <div class="d-flex justify-content-between">
          <!-- nav -->
          <router-link
            class="text-reset anima-nav text-decoration-none px-3"
            :to="port.to"
            v-for="port in portfolios"
            :key="port.id"
          >
            {{ port.title }}
          </router-link>
        </div>
        <!-- login and register -->
        <div>
          <div class="d-flex align-items-center">
            <div class="px-3 anima-nav">
              <span>Login</span>
            </div>
            <div class="bgwhite p-2 py-2 rounded-2">
              <span class=" ">Join for free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portfolios: [
        { title: "Videos", to: "/about/resume" },
        { title: "Learning materials", to: "/projects" },
      ],
    };
  },

  components: {},
};
</script>

<style scoped>
.nav-marg {
  margin: 2rem 4rem 0rem 3.5rem !important ;
}
/* .logo-style{

} */
.bggreen {
  background-image: url(@/assets/images/Shape.png);
  background-color: #05d69a;
  color: #162120;
}

.anima-nav:hover {
  animation: headShake; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s;
   /* color: var(--clr-white) !important; */
  border-bottom: 3px solid var(--clr-black) !important;
  font-weight: bold;
}
.anima-nav-home:hover {
  animation: headShake; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 2s;
  border-radius: 0.3rem;
  padding: 0rem 0rem;
}
</style>
