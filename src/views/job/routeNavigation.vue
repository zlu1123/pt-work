<template>
  <div>
    <div class="map-info">
      <div class="start">
        <div>起点</div>
        <div>{{ getLocationLngLat.address }}</div>
      </div>
      <div class="start">
        <div>终点</div>
        <div>{{ endAddr }}</div>
      </div>
    </div>
    <van-tabs
      v-model="active"
      sticky
      animated
      swipeable
      color="#21A675"
      class="get-height"
      @change="chooseWay"
    >
      <van-tab title="驾车"></van-tab>
      <van-tab title="公交"></van-tab>
      <van-tab title="骑行"></van-tab>
      <van-tab title="步行"></van-tab>
    </van-tabs>
    <div id="container" :style="{ height: wrapHeight + 'px' }"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "routeNavigation",
  data() {
    return {
      active: "0",
      wrapHeight: 0,
      startLngLat: [],
      endLngLat: [],
      endAddr: "",
      startAddr: ""
    };
  },
  mounted() {
    this.wrapHeight =
      document.documentElement.clientHeight -
      document.getElementsByClassName("get-height")[0].getBoundingClientRect()
        .bottom;
    this.endLngLat = this.$route.query.postionLngLat.split(",");
    this.endAddr = this.$route.query.postionAddr;
    this.$nextTick(() => {
      this.driveCar();
    });
  },
  methods: {
    chooseWay(name, title) {
      switch (name) {
        case 0:
          this.driveCar();
          break;
        case 1:
          this.bus();
          break;
        case 2:
          this.ride();
          break;
        case 3:
          this.walk();
          break;
      }
    },
    driveCar() {
      let map = new AMap.Map("container", {
        zoom: 10,
        resizeEnable: true
      });

      var drivingOption = {
        policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
        map: map,
        ferry: 1
      };
      // 构造路线导航类
      let driving = new AMap.Driving(drivingOption);
      // 根据起终点经纬度规划驾车导航路线
      driving.search(
        new AMap.LngLat(
          this.getLocationLngLat.location.lng,
          this.getLocationLngLat.location.lat
        ),
        new AMap.LngLat(this.endLngLat[0], this.endLngLat[1]), // 地铁延平门站
        (status, result) => {
          // result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              // 绘制第一条路线，也可以按需求绘制其它几条路线
              console.log("绘制驾车路线完成");
            }
          } else {
            console.error("获取驾车数据失败：" + result);
          }
        }
      );
    },

    bus() {
      var map = new AMap.Map("container", {
        zoom: 14
      });

      var transferOption = {
        city: "西安市",
        nightflag: true, // 是否计算夜班车
        policy: AMap.TransferPolicy.LEAST_TIME, // 其它policy取值请参照 https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
        map: map
      };

      var transfer = new AMap.Transfer(transferOption);

      // 根据起、终点坐标查询公交换乘路线
      transfer.search(
        new AMap.LngLat(
          this.getLocationLngLat.location.lng,
          this.getLocationLngLat.location.lat
        ),
        new AMap.LngLat(this.endLngLat[0], this.endLngLat[1]), // 地铁延平门站
        (status, result) => {
          // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
          if (status === "complete") {
            if (result.plans && result.plans.length) {
              console.log("绘制公交路线完成");
              drawRoute(result.plans[0]);
            }
          } else {
            console.error("公交路线数据查询失败" + result);
          }
        }
      );

      function drawRoute(route) {
        var startMarker = new AMap.Marker({
          position: route.segments[0].transit.origin,
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
          map: map
        });

        var endMarker = new AMap.Marker({
          position:
            route.segments[route.segments.length - 1].transit.destination,
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
          map: map
        });

        var routeLines = [];

        for (var i = 0, l = route.segments.length; i < l; i++) {
          var segment = route.segments[i];
          var line = null;

          // 绘制步行路线
          if (segment.transit_mode === "WALK") {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: "#ffeeee",
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: "grey",
              lineJoin: "round",
              strokeStyle: "dashed"
            });

            line.setMap(map);
            routeLines.push(line);
          } else if (
            segment.transit_mode === "SUBWAY" ||
            segment.transit_mode === "BUS"
          ) {
            line = new AMap.Polyline({
              path: segment.transit.path,
              isOutline: true,
              outlineColor: "#ffeeee",
              borderWeight: 2,
              strokeWeight: 5,
              strokeColor: "#0091ff",
              lineJoin: "round",
              strokeStyle: "solid"
            });

            line.setMap(map);
            routeLines.push(line);
          } else {
            // 其它transit_mode的情况如RAILWAY、TAXI等，该示例中不做处理
          }
        }

        // 调整视野达到最佳显示区域
        map.setFitView([startMarker, endMarker].concat(routeLines));
      }
    },
    ride() {
      var map = new AMap.Map("container", {
        zoom: 14
      });

      var ridingOption = {
        policy: 1,
        map: map
      };

      var riding = new AMap.Riding(ridingOption);

      // 根据起终点坐标规划骑行路线
      riding.search(
        new AMap.LngLat(
          this.getLocationLngLat.location.lng,
          this.getLocationLngLat.location.lat
        ),
        new AMap.LngLat(this.endLngLat[0], this.endLngLat[1]), // 地铁延平门站
        (status, result) => {
          // result即是对应的骑行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              drawRoute(result.routes[0]);
              console.log("绘制骑行路线完成");
            }
          } else {
            console.error("骑行路线数据查询失败" + result);
          }
        }
      );

      function drawRoute(route) {
        var path = parseRouteToPath(route);

        var startMarker = new AMap.Marker({
          position: path[0],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
          map: map
        });

        var endMarker = new AMap.Marker({
          position: path[path.length - 1],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
          map: map
        });

        var routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: "#ffeeee",
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: "#0091ff",
          lineJoin: "round"
        });

        routeLine.setMap(map);

        // 调整视野达到最佳显示区域
        map.setFitView([startMarker, endMarker, routeLine]);
      }

      // 解析RidingRoute对象，构造成AMap.Polyline的path参数需要的格式
      // RidingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_RideRoute
      function parseRouteToPath(route) {
        var path = [];

        for (var i = 0, l = route.rides.length; i < l; i++) {
          var step = route.rides[i];

          for (var j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j]);
          }
        }

        return path;
      }
    },
    walk() {
      var map = new AMap.Map("container", {
        zoom: 14
      });
      // 当前示例的目标是展示如何根据规划结果绘制路线，因此walkOption为空对象
      var walkingOption = {
        map: map
      };
      // 步行导航
      var walking = new AMap.Walking(walkingOption);

      // 根据起终点坐标规划步行路线
      walking.search(
        new AMap.LngLat(
          this.getLocationLngLat.location.lng,
          this.getLocationLngLat.location.lat
        ),
        new AMap.LngLat(this.endLngLat[0], this.endLngLat[1]), // 地铁延平门站
        (status, result) => {
          // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              drawRoute(result.routes[0]);
              console.log("绘制步行路线完成");
            }
          } else {
            console.log("步行路线数据查询失败" + result);
          }
        }
      );

      function drawRoute(route) {
        var path = parseRouteToPath(route);

        var startMarker = new AMap.Marker({
          position: path[0],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
          map: map
        });

        var endMarker = new AMap.Marker({
          position: path[path.length - 1],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
          map: map
        });

        var routeLine = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: "#ffeeee",
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: "#0091ff",
          lineJoin: "round"
        });

        routeLine.setMap(map);

        // 调整视野达到最佳显示区域
        map.setFitView([startMarker, endMarker, routeLine]);
      }

      // 解析WalkRoute对象，构造成AMap.Polyline的path参数需要的格式
      // WalkRoute对象的结构文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkRoute
      function parseRouteToPath(route) {
        var path = [];

        for (var i = 0, l = route.steps.length; i < l; i++) {
          var step = route.steps[i];

          for (var j = 0, n = step.path.length; j < n; j++) {
            path.push(step.path[j]);
          }
        }

        return path;
      }
    }
  },

  computed: {
    ...mapGetters(["getLocationInfo"]),

    getLocationLngLat() {
      return this.getLocationInfo
        ? this.getLocationInfo.detail
        : { address: "陕西西安", location: { lat: 34.95517, lng: 109.58646 } };
    }
  }
};
</script>

<style lang="less" scoped>
.map-info {
  background: @jobTitleBgColor;
  padding: 0 10px;
  .start {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    div {
      &:first-child {
        flex: 1;
      }
      &:last-child {
        flex: 10;
        margin-left: 10px;
        font-size: @fs15;
        color: @titleColor;
        font-weight: bold;
      }
    }
  }
}
</style>
