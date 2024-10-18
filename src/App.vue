<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
// #ifdef H5
import VConsole from "vconsole";
// #endif

onLaunch(() => {
  console.log("App Launch");
  // #ifdef H5
  const vConsole = new VConsole()
  return vConsole
  // #endif
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
a {
  text-decoration: none;
}
</style>
