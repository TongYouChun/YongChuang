<!-- 智慧楼宇 右 统计图 -->
<template>
	<div class="right_buiding">
		<div class="chart_li effect_police">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				防盗报警
			</div>
			<div class="chart_content">
				<div class="steal_li">
					<div class="branch_li" v-for="(item,index) in policeData" :key="index">
						<div class="steal_img">
							<img :src="item.ico" >
						</div>
						<div class="steal_text">
							{{item.attribute}}: <span>{{item.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li effect_monitor">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				视频监控
			</div>
			<div class="chart_content">
				<div class="building_li" v-for="(item,index) in monitor" :key="index">
					<div class="building_text">
						{{item.name}}
					</div>
					<div class="building_chart">
						<div class="chart_display" :style="{'width':item.percentage,'backgroundColor':item.color}"></div>
						<span>{{item.value}}台</span>
					</div>
					<div class="building_value">
						{{item.total}}台
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li effect_vehicle">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				车辆管理
			</div>
			<div class="chart_content">
				<div class="vehicle">
					<div class="vehicle_left">
						<div class="vehicle_content">
							总车位
							<span>780</span>
						</div>
					</div>
					<div class="vehicle_right">
						<div class="vehicle_content">
							可用车位
							<span>238</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li effect_lighting">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				给排水
			</div>
			<div class="chart_content">
				<div class="stage">
					<div class="stage_ico">
						<img src="../../../../public/imges/building/imgs/stage.png" >
					</div>
					<div class="stage_chart">
						<div class="stage_chart_li">
							<div class="chart_title" style="color: rgba(0, 159, 232, 1);">
								低液位
							</div>
							<div id="stage_statistics" style="width: 100%; height: 100%;"></div>
						</div>
						<div class="stage_chart_li">
							<div class="chart_title" style="color: rgba(250, 173, 20, 1);">
								高液位
							</div>
							<div id="stage_statistics2" style="width: 100%; height: 100%;"></div>
						</div>
						<div class="stage_chart_li">
							<div class="chart_title" style="color: rgba(248, 9, 65, 1);">
								超高液位
							</div>
							<div id="stage_statistics3" style="width: 100%; height: 100%;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import rightBuiding from './rightBuiding.js';
	export default rightBuiding;
</script>

<style scoped>
	@import url("rightBuiding.css");
</style>
