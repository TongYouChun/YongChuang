<!-- 应急指挥 -->
<template>
	<div class="command">
		<!-- 左列表 -->
		<div class="command_left">
			<div class="command_left_title">
				<div class="left_title_li_left">
					应急指挥
				</div>
				<div class="left_title_li_right" @click="chargeClick()">
					发起会议
				</div>
			</div>
			<!-- 项目列表 -->
			<div class="command_left_ul">
				<div class="command_left_ul_title">
					项目列表
				</div>
				<div class="command_left_ul_button">
					已接入项目统计数: 25
				</div>
				<div class="command_left_list" v-loading="loading">
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
								<div class="list_li_content">
									<div class="list_li_chart">
										<img src="../../../public/imges/building/supervise/ico/gongcheng.png">
									</div>
									<div class="list_li_text">
										{{ite.name}} ({{ite.userNum}} 人)
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
					<!-- 公司 工程 -->
					<div class="list_li" v-for="(item,index) in companyData" :key="index">
						<div class="list_father_li" @click="menuClick(index, companyData)">
							<div class="list_li_content">
								<div class="list_li_chart">
									<img src="../../../public/imges/building/supervise/ico/gongcheng.png">

								</div>
								<div class="list_li_text">
									{{item.engCompany.companyName}}
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
								<div class="list_li_content">
									<div class="list_li_chart">
										<img src="../../../public/imges/building/supervise/ico/gongcheng.png">
									</div>
									<div class="list_li_text">
										{{ite.name}}
									</div>
								</div>
								<div class="list_li_icos">
									<img class="imgs1" src="../../../public/imges/building/supervise/ico/biaojian.png"
										v-if="!ite.follow" @click="enshrineClick(index,inde)">
									<img class="imgs1" src="../../../public/imges/building/supervise/ico/biaoji.png"
										v-else @click="enshrineClick(index,inde)">
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
		<div class="command_right">
			<div class="command_project_name">
				<div class="project_name_li title">
					项目名称
				</div>
				<div class="project_name_li channel">
					闭路电视路-6
				</div>
			</div>
			<div class="command_project_container">
				<!-- 地图 -->
				<mapPenetration></mapPenetration>
			</div>

			<!-- 弹框 -->
			<div class="command_spring_frame" v-show=" decideLaunch">
				<div class="spring_frame">
					<div class="frame_title">
						永昌大厦
					</div>
					<!-- 会议主题 -->
					<div class="frame_meeting">
						<div class="meeting_text">
							会议主题
						</div>
						<div class="meeting_name">
							<input type="text" placeholder="输入会议主题" v-model="conferenceData.theme" />
						</div>
					</div>
					<!-- 会议内容 + 人 -->
					<div class="frame_content">
						<div class="frame_content_left">
							<!-- 标题 -->
							<div class="frame_content_left_title">
								<b></b>
								<div class="frame_content_text">
									搜索会议人员
								</div>
							</div>
							<!-- 人员 -->
							<div class="personnel"  v-loading="loadings" element-loading-text="加载中" element-loading-spinner="el-icon-loading">
								<el-input placeholder="输入人员名称" v-model="filterText">
								</el-input>
								<div class="personnel_tree">
									<el-tree :data="personnelData" show-checkbox node-key="id" :props="defaultProps"
										:filter-node-method="filterNode" ref="tree" @check-change="clickObtain">
									</el-tree>
								</div>
							</div>
						</div>
						<div class="frame_content_right">
							<!-- 参与人员标题 -->
							<div class="frame_content_right_title">
								参与人员
							</div>
							<!-- 边框 -->
							<div class="frame_content_right_frame">
								<div class="frame_text_ul" ref="contentUl">
									<div class="frame_text_li" v-for="(item,index) in partakePeople" :key="index">
										{{item}}
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- 发起会议 -->
					<div class="frame_launch" @click="clickLaunch">
						发起会议
					</div>
					<!-- 关闭弹窗 -->
					<div class="close_frame" @click="clickClose">

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

<style type="text/css">
	.command .personnel .el-input__inner {
		width: 100%;
		height: 28px;
		color: #fff;
		background-color: rgba(0, 0, 0, 0);
		border: 1px solid #08c9ff;
		font-size: 12px;
	}

	.command .personnel .personnel_tree {
		margin-top: 4%;
	}

	.command .personnel .personnel_tree .el-tree {
		background-color: rgba(0, 0, 0, 0);
		color: #fff;
	}

	.command .personnel .personnel_tree .el-tree:hover {
		background-color: rgba(0, 0, 0, 0);
	}

	.command .personnel .personnel_tree .el-tree .el-tree-node__content {
		background-color: rgba(0, 0, 0, 0);
	}

	.command .personnel .personnel_tree .el-tree .el-tree-node__content:hover {
		background-color: rgba(9, 131, 178, .2);
	}

	.command .el-loading-mask {
		background-color: rgba(0, 0, 0, .4);
	}
</style>
