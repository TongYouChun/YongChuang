<!-- 报警页面 -->
<template>
	<div class="remind">
		<!-- 左 -->
		<div class="index_left">
			<!-- 左边 统计图 -->
			<leftRemind></leftRemind>
		</div>
		
		<!-- 模型 -->
		<div class="model">
		</div>
		
		<!-- 右 -->
		<div class="index_right">
			<!-- 右边 统计图 -->
			<rightRemind></rightRemind>
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


