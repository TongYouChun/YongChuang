<!-- 数字地标 -->
<template>
	<div class="landmark">
		<!-- 左 -->
		<div class="index_left">
		    <leftIndex :digitData = "digitData" :wordEffect='wordEffect'></leftIndex>
		</div>
		
		<!-- 右 -->
		<div class="index_right">
		    <rightIndex :digitData = "digitData" :wordEffect='wordEffect'></rightIndex>
		</div>
		<!-- 文字效果 -->
		<div class="writing_right">
			<typing :loadtype='loadtype' @writtenWords= 'writtenWords'></typing>
		</div>
	</div>
</template>

<script>
	import landmark from './index.js';
	export default landmark;
</script>

<style scoped>
	 @import url("index.css");
</style>
