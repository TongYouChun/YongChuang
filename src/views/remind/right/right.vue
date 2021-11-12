<!--报警页面 右 统计图 -->
<template>
	<div class="right_remind">
		<div class="chart_li power_supply">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				供电统计
			</div>
			<div class="chart_content">
				<div class="chart_content_li">
					<div id="electric_curve" style="width: 100%; height: 100%;"></div>
				</div>
				<div class="chart_content_li">
					<div class="chart_content_li_chart">
						<div class="li_chart">
							<div id="waterChart" style="width: 100%; height: 100%;"></div>
						</div>
						<div class="li_chart_text">
							<div class="name_text">
								空调用电
							</div>
							<div class="number_text" style="color: rgba(0, 159, 232, 1);">
								5225252Kwh
							</div>
						</div>
					</div>
					<div class="chart_content_li_chart">
						<div class="li_chart">
							<div id="waterChart2" style="width: 100%; height: 100%;"></div>
						</div>
						<div class="li_chart_text">
							<div class="name_text">
								设备用电
							</div>
							<div class="number_text" style="color: rgba(250, 173, 20, 1);">
								5225252Kwh
							</div>
						</div>
					</div>
					<div class="chart_content_li_chart">
						<div class="li_chart">
							<div id="waterChart3" style="width: 100%; height: 100%;"></div>
						</div>
						<div class="li_chart_text">
							<div class="name_text">
								照明用电
							</div>
							<div class="number_text" style="color: rgba(0, 159, 232, 1);">
								5225252Kwh
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li water_supply">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				供水统计
			</div>
			<div class="chart_content">
				<div class="chart_content_li">
					<div id="water_curve" style="width: 100%; height: 100%;"></div>
				</div>
				<div class="chart_content_li">
					<div id="water_pile" style="width: 100%; height: 100%;"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import right from './right.js';
	export default right;
</script>

<style scoped>
	@import url("right.css");
</style>
