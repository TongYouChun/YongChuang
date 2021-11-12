<!-- 主页面 -->
<template>
	<div class="index_home">
		<!-- 导航栏 -->
		<div class="navigation">
			<div class="navigation_ul">
				<div class="navigation_ul_menu navigation_ul_menu_left">
					<div class="navigation_li" v-for="(item,index) in menuData1" :class="item.type ? 'navigation_li_te':''"
						:key="item.id" @click="clickLeftMenu(index)">
						<router-link :to="{path: item.route}"
							style="color: #fff; height: 100%; width: 100%; display: block; text-decoration:none;">
							{{item.name}}</router-link>
					</div>
					
				</div>
				
				<div class="navigation_main">
					<div class="navigation_name">数字永昌</div>
				</div>
				
				<div class="navigation_ul_menu navigation_ul_menu_right">
				<div class="navigation_li navigation_li_Right" v-for="(item,index) in menuData2"
					:class="item.type ? 'navigation_li_Right_te':''" :key="item.id" @click="clickRightMenu(index)">
					<router-link :to="{path: item.route}"
						style="color: #fff; height: 100%; width: 100%; display: block; text-decoration:none;">
						{{item.name}}</router-link>
				</div>
				</div>
				<div class="imgs_setting"></div>
			</div>
			<div class="navigation_left">

			</div>
			<div class="navigation_right">
				<div class="navigation_tips_name" ref="userName">
					<!-- 铃声 -->
					<div class="navigation_tips" @click="clickRemind">
						<!-- <span>1</span> -->
					</div>
					<div class="navigation_name">root</div>
				</div>
				<div class="date" ref="timeDate">
					<div class="date_text">
						{{nowDate}}
					</div>
					<!-- <div class="date_text">
						10:00
					</div> -->
					<!-- <div class="date_text">
						农历九月初六
					</div> -->
				</div>
			</div>
		</div>
		<!-- 主页内容 -->
		<div class="index_content">
			<div class="index_content_model" v-show="displayModel">
				<model @loadingModel ='loadingModel'></model>
			</div>
			<!-- 数字地标 -->
			<!-- <landmark></landmark> -->
			<router-view v-if="openType"></router-view>
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
