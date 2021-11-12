<!-- 数字地标 右 统计图 -->
<template>
	<div class="right-index">
		<div class="chart_li personnel_li">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				{{renyuanqingkuang.name}}
			</div>
			<div class="chart_content content_flex">
				<div class="personnel_li">
					<!-- 内部人员 -->
					<div id="inside" style="width: 100%; height: 100%;"></div>
				</div>
				<div class="personnel_li">
					<!-- 外部人员 -->
					<div id="external" style="width: 100%; height: 100%;"></div>
				</div>
			</div>
		</div>
		<div class="chart_li material_li">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				{{wuziqingkuang.name}}
			</div>
			<div class="chart_content">
				<div class="chart_switch">
					<div class="switch_li" :class="item.type ? 'switch_li_te': ''" v-for="(item,index) in materialData" :key = "index" @click="clickMaterial(index)">
						{{item.name}}
					</div>
				</div>
				<!-- 物资情况 -->
				<div id="material" style="width: 100%; height:  calc(100% - 30px);"></div>
			</div>
		</div>
		<div class="chart_li equipment_li">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				{{shebeiqingkuang.name}}
			</div>
			<div class="chart_content content_flex" style="justify-content: center; align-items: center;">
				<div class="content_equipment">
					<div class="chart_content_left">
						{{equipmentData.total}}台
					</div>
					<div class="chart_content_right">
						<div class="content_right_title">
							工程机械设备
						</div>
						<div class="content_right_content">
							<div class="li">
								在用数：
								<span>{{equipmentData.use}}台</span>
							</div>
							<div class="li">
								闲置数：
								<span>{{equipmentData.free}}台</span>
							</div>
							<div class="li">
								利用率：
								<span>{{equipmentData.utilize}}%</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import index from './index.js';
	export default index;
</script>

<style scoped>
	@import url("index.css");
</style>
