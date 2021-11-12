<!-- 智慧楼宇 左 统计图 -->
<template>
	<div class="left_buiding">
		<div class="chart_li dynamic_dyke">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				消防系统
			</div>
			<div class="chart_content">
				<div class="building_li" v-for="(item,index) in fireControl" :key="index">
					<div class="building_text">
						{{item.name}}
					</div>
					<div class="building_chart">
						<div class="chart_display" :style="{'width':item.percentage} ">
						</div>
						<span>{{item.value}}</span>
					</div>
					<div class="building_value">
						{{item.percentage}}
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li dynamic_energy">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				能源管理
			</div>
			<div class="chart_content">
				<div class="energy_li">
					<div class="energy_text">
						今日总耗能:
						<span>236.00/kmh</span>
					</div>
					<div class="energy_container">
						<div class="energy_chart">
							<div class="energy_display"
								style="background-image: linear-gradient(to left,rgba(0,123,255,1),rgba(22,223,148,1)); width: 100%;">
							</div>
							<span>236.00/kmh</span>
						</div>
						<!-- <div class="energy_value">
							70%
						</div> -->
					</div>
				</div>

				<div class="energy_li">
					<div class="energy_text">
						当前用电功率:
						<span>6.2kw</span>
					</div>
					<div class="energy_container">
						<div class="energy_chart">
							<div class="energy_display"
								style="background-image: linear-gradient(to left,rgba(0,123,255,1),rgba(22,223,148,1); width: 100%;">
							</div>
							<span>6.2kw</span>
						</div>
						<!-- <div class="energy_value">
							90%
						</div> -->
					</div>
				</div>

			</div>
		</div>
		<div class="chart_li dynamic_havc">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				暖通空调
			</div>
			<div class="chart_content">
				<div class="chart_content">
					<div class="building_li" v-for="(item,index) in havcData" :key="index">
						<div class="building_text">
							{{item.name}}
						</div>
						<div class="building_chart">
							<div class="chart_display" :style="{'width':item.percentage,'backgroundColor':item.color}">
							</div>
							<span>{{item.value}}</span>
						</div>
						<div class="building_value">
							{{item.percentage}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li dynamic_electric">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				交配电
			</div>
			<div class="chart_content">
				<div class=" distributing">
					<div class="distributing_li">
						<div id="ball_chart" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart2" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart3" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart4" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart5" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart6" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart7" style="width: 100%; height: 100%;"></div>
					</div>
					<div class="distributing_li">
						<div id="ball_chart8" style="width: 100%; height: 100%;"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import leftBuiding from './leftBuiding.js';
	export default leftBuiding;
</script>

<style scoped>
	@import url("leftBuiding.css");
</style>
