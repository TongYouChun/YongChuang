<!-- 运维监控 -->
<template>
	<div class="operation_monitor">
		<!-- 左列表 -->
		<div class="operation_left">
			<div class="operation_left_title">
				<div class="left_title_li_left">
					运营监管
				</div>
				<div class="left_title_li_right" @click="clickCommand()">
					应急指挥
				</div>
			</div>
			<!-- 项目列表 -->
			<div class="operation_left_ul">
				<div class="operation_left_ul_title">
					项目列表
				</div>
				<div class="operation_left_ul_button">
					已接入项目统计数: 25
				</div>
				<div class="operation_left_list" v-loading="loading">
					<div class="list_li" v-for="(item,index) in menusData" :key='index'>
						<div class="list_father_li" @click="menuClick(index)">
							<div class="list_li_content">
								<div class="list_li_chart">
									<img src="../../../public/imges/building/supervise/ico/gongcheng.png">

								</div>
								<div class="list_li_text">
									{{item.name}}
								</div>
							</div>
							<div class="list_li_ico">
								<img src="../../../public/imges/building/supervise/ico/guan.png"
									v-if="!item.menusWitch">
								<img src="../../../public/imges/building/supervise/ico/kai.png" v-if="item.menusWitch">
							</div>
						</div>

						<!-- 子工程 -->
						<div class="list_engineering_ul" v-if="item.menusWitch">
							<div class="list_engineering_li" v-for="(ite,inde) in item.data" :key="inde">
								<div class="list_li_content" @click="chargeClick(ite.id)">
									<div class="list_li_chart">
										<img src="../../../public/imges/building/supervise/ico/gongcheng.png">
									</div>
									<div class="list_li_text">
										{{ite.name}}  ({{ite.userNum}}人)
									</div>
								</div>
								<div class="list_li_icos">
									<img class="imgs1" src="../../../public/imges/building/supervise/ico/biaojian.png"
										v-if="!ite.type" @click="enshrineClick(ite)">
									<img class="imgs1" src="../../../public/imges/building/supervise/ico/biaoji.png"
										v-else @click="enshrineClick(ite)">
									<img class="imgs2"
										src="../../../public/imges/building/supervise/ico/shangchuan.png">
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 内容地图 -->
		<div class="operation_right">
			<!-- 返回 -->
			<div class="monitor_monitor_return" v-show="decideType" @click="clickReturn()">
			</div>
			<div class="operation_project_name">
				<div class="project_name_li title">
					项目名称
				</div>
				<div class="project_name_li channel">
					闭路电视路-6
				</div>
			</div>
			<div class="operation_project_container">
				<!-- 监控 视频列表 -->
				<monitor :cameraList = "cameraList" v-show="decideType"></monitor>
				<!-- 监控 地图 -->
				<mapPenetration v-show="!decideType"></mapPenetration>
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

<style type="text/css">
	.operation_monitor .el-loading-mask{
		background-color: rgba(0,0,0,.4);
	}
</style>