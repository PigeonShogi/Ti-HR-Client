<!-- GPS 打卡頁面中的 Google 地圖 -->
<template>
  <div id="button-container">
    <button class="btn btn-primary mx-2 mb-2" @click.prevent="findUser">
      確認現在位置
    </button>
    <button class="btn btn-warning mx-2 mb-2" @click.prevent="findCompany">
      確認公司位置
    </button>
  </div>
  <div class="spinner mb-3" v-if="process.loadingUserPosition === true">
    <div class="spinner-border text-success mt-2 mx-2" role="status"></div>
    <span
      >正在定位，請暫時停止任何操作。如果等候時間過久，可能是你未授權本網站定位，
      請檢查瀏覽器設定。</span
    >
  </div>
  <GMapMap
    :center="center"
    :zoom="15"
    map-type-id="terrain"
    style="width: 50vw; height: 50vh"
  >
    <GMapMarker
      :key="marker.id"
      v-for="marker in markers"
      :position="marker.position"
    />
  </GMapMap>
</template>

<script setup>
import { reactive } from "vue";
import useProcessStore from "../stores/process";

const process = useProcessStore();

const center = reactive({
  lat: 25.05756263191021,
  lng: 121.61238726873873,
});
const markers = reactive([
  {
    id: "TitanSoft",
    position: {
      lat: 25.05756263191021,
      lng: 121.61238726873873,
    },
  },
  {
    id: "User",
    position: {
      lat: null,
      lng: null,
    },
  },
]);
// 將地圖中心點重置為公司所在地
function findCompany() {
  center.lat = 25.05756263191021;
  center.lng = 121.61238726873873;
}
// 將地圖中心點設置為使用者所在地
function findUser() {
  process.loadingUserPosition = true;
  const promise = new Promise(function (resolve) {
    // 使用瀏覽器的定位功能
    navigator.geolocation.getCurrentPosition(function (position) {
      const latlng1 = position.coords.latitude;
      const latlng2 = position.coords.longitude;
      resolve({ lat: latlng1, lng: latlng2 });
    });
  });
  promise
    .then((res) => {
      center.lat = res.lat;
      center.lng = res.lng;
      markers[1].position = res;
      process.loadingUserPosition = false;
    })
    .catch((err) => {
      process.loadingUserPosition = false;
      console.error(err);
    });
}
</script>
