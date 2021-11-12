<!-- 数字地标 左 数字地标 -->
<template>
	<div class="lefl-index">
		<div class="chart_li enterprise_li">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				{{qiyejinyingshuju.name}}
			</div>
			<div class="chart_content">
				<div class="chart_content_li">
					<div class="operating_li" v-for="(item,index) in operatingData1" :key="index">
						<img :src="operatingImgs1[index].img">
						<div class="operating_content">
							<div class="operating_name">
								{{item.name}}
							</div>
							<div class="operating_quantity">
								{{item.quantity}}
								<span>({{item.type}})</span>
							</div>
						</div>
					</div>
				</div>
				<div class="chart_content_li">
					<div class="operating_li" v-for="(item,index) in operatingData2" :key="index">
						<img :src="operatingImgs2[index].img">
						<div class="operating_content">
							<div class="operating_name">
								{{item.name}}
							</div>
							<div class="operating_quantity">
								{{item.quantity}}
								<span>({{item.type}})</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="chart_li collect_li">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				{{xiangmushouzhi.name}}
			</div>
			<div class="chart_content">
				<div id="pile" style="width: 100%; height: 100%;"></div>
			</div>
		</div>
		<div class="chart_li contract_li">
			<div class="chart_li_img"></div>
			<div class="chart_title">
				{{xiangmuhetong.name}}
			</div>
			<div class="chart_content">
				<div id="contract" style="width: 100%; height: 100%;"></div>
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
