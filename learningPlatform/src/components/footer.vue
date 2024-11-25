<template>
  <div class="">
    <!-- container -->
    <div class="font bggreen black py-5">
      <div class="container">
        <div class="row mob-width">
          <!-- logo and intro -->
          <div class="col-md-4 col-xl-4 col-xxl-4 col-lg-4">
            <!-- logo -->
            <div>
              <img src="@/assets/icon/logo1.png" alt="" style="width: 170px" />
            </div>
            <div>
              <span class="fs-200"
                >A drop of water makes a ocean, start that course today
              </span>
            </div>
          </div>
          <!-- services -->
          <div class="col-md-3 padding col-xl-3 col-xxl-3 col-lg-3">
            <ul class="off-list-deco">
              <li class="fw-bold pb-3">Services</li>
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">Teach on OSCSA</li></nuxt-link
              >
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">Contact us</li></nuxt-link
              >
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">About us</li></nuxt-link
              >
            </ul>
          </div>
          <!-- account -->
          <div class="col-md-3 paddin2g col-xl-3 col-xxl-3 col-lg-3">
            <ul class="off-list-deco">
              <li class="fw-bold pb-3">Help and Support</li>
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">Blog</li></nuxt-link
              >
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">Investors</li></nuxt-link
              >
            </ul>
          </div>
          <!-- About -->
          <div class="col-md-2 paddin2g col-xl-2 col-xxl-2 col-lg-2">
            <ul class="off-list-deco">
              <li class="fw-bold pb-3">Terms</li>
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">Privacy policy</li></nuxt-link
              >
              <nuxt-link class="text-decoration-none text-reset">
                <li class="fs-200 py-1">Terms and Conditions</li></nuxt-link
              >
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/* unordered list reset */
.off-list-deco {
  list-style-type: none !important;
}
</style>
