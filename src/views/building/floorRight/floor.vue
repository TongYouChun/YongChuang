<!--智慧楼宇 右 楼层-->
<template>
	<div class="floor">
		<div class="floor_li" v-for="(item,index) in floorData" :key="index" @click="clickFloor(index)">
			<div class="floor_text" :class="item.type ? 'floor_te' :''">
				{{item.floorName}}
			</div>
			<div class="floor_ico">
				<div class="floor_img">
					<img class="imgs1" src="../../../../public/imges/building/ico/dianLiang.png" v-if="item.type">
					<img class="imgs2" src="../../../../public/imges/building/ico/dian.png" v-else>
				</div>
				<div class="floor_Line" :class="item.type ? 'floor_te' : ''"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import floor from './floor.js';
	export default floor;
</script>

<style scoped>
	 @import url("floor.css");
</style>
