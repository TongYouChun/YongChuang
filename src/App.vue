// App.vue
<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
	/* background-color: #5fcee1; */
	background-image: url(../public/imges/building/control/background.png);
	background-size: 100% 100%;
}
#app{
  margin: 0;
  padding: 0;
}
div{
  margin: 0;
  padding: 0;
}
/* 滚动条 */
::-webkit-scrollbar {
		width: 3px;
		height: 3px;
	}

::-webkit-scrollbar-track {
		border-radius: 3px;
		box-shadow: inset 0 0 2px rgba(7, 73, 142, .6);
		background-color: #f8f8f8;

	}

::-webkit-scrollbar-thumb {
		border-radius: 3px;
		box-shadow: inset 0 0 2px rgba(7, 73, 142, .6);
		background-color: #334157;
	}

</style>
