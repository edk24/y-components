<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import VConsole from "vconsole";
onLaunch(() => {
  console.log("App Launch");
  const vConsole = new VConsole()
  return vConsole
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
