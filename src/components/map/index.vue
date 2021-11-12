<template>
	<!-- 地图穿透 -->
	<div class="map_penetration">
		<div class="map_penetration_Button" v-show="returnHide">
		</div>
		<div id="penetration" style="width: 100%; height: 100%;"></div>
	</div>
</template>

<script>
	import index from './index.js';
	export default index;
</script>

<style scoped>
	@import url("index.css");
</style>
