// 数字地标 3d模型 加载 js
import * as THREE from 'three/build/three.module'
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
	GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import {
	TWEEN
} from 'three/examples/jsm/libs/tween.module.min'

// outline postprocessing
import {
	EffectComposer
} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {
	RenderPass
} from "three/examples/jsm/postprocessing/RenderPass.js";
import {
	ShaderPass
} from "three/examples/jsm/postprocessing/ShaderPass.js";
import {
	OutlinePass
} from "three/examples/jsm/postprocessing/OutlinePass.js";
import {
	FXAAShader
} from "three/examples/jsm/shaders/FXAAShader.js";

import Stats from "three/examples/jsm/libs/stats.module.js";

import {
	mapState
} from 'vuex'


// 场景和控制器
let scene = null;
let controls = null;
let camera = null;
let cameraTest = null; // 第二个摄像头
let cameraHelper = null; // 相机辅助线

// FPS
let stats = null;

let clientWidth = null; // 宽度
let clientHeight = null; // 高度
let offsetLeft = null; // 左偏移值
let offsetTop = null; // 顶偏移值
let composer = null; // 模型组合器
let raycaster = null; // 选中 发亮
let mouse = null; // 发亮位置
let outlinePass = null; // 模型外边框

// 加载模型
let entire = [];

// 详细模型的楼板
// let floors = new Array(2);

let itemList = []; // 存放raycaster检测对象

let curve = null; // 模型运动轨迹

let curveIndex = null;


// 详细模型的监控
// let context = new Array(10);


export default {
	data() {
		return {
			notHasLoadAll: true,
			percentage: 0,
			haveLoadNum: 0,
			// 总共模型
			totalModel: 11,
			loading: null,
			// 动画效果
			mixer: null,
			// 小时
			hour: new Date().getHours(),
			daytime: true, // 白天true / 黑夜 false

			moveType: false, // 模型移动
			floorModel: '',
			mainModel: [ // 主要模型 刚开始加载页面的模型
				{
					name: '整体',
					url: './static/Model/DL/DL.gltf',
					id: 0
				},
				{
					name: 'B1',
					url: './static/Model/B1/B1.gltf',
					id: 1
				},
				{
					name: 'B2',
					url: './static/Model/B2/B2.gltf',
					id: 2
				},
				{
					name: 'F2',
					url: './static/Model/F2/F2.gltf',
					id: 3
				},
				{
					name: 'F3',
					url: './static/Model/F3/F3.gltf',
					id: 4
				},
				{
					name: 'F4',
					url: './static/Model/F4/F4.gltf',
					id: 5
				},
				{
					name: 'F5',
					url: './static/Model/F5/F5.gltf',
					id: 6
				},
				{
					name: 'F6',
					url: './static/Model/F6/F6.gltf',
					id: 7
				},
				{
					name: 'F7',
					url: './static/Model/F7/F7.gltf',
					id: 8
				},
				{
					name: 'F8',
					url: './static/Model/F8/F8.gltf',
					id: 9
				},
				{
					name: 'F9',
					url: './static/Model/F9/F9.gltf',
					id: 10
				},
			],
			minorModel: [ // 次要模型   页面加载完成,加载的模型  // 如: 监控
			]
		}
	},
	mounted() {
		this.modelScene();
		this.modelLoad(this.mainModel, 'whole');

	},
	computed: {
		...mapState({ //等价于上面的写法
			floor: state => state.floor,
			reductionModel: state => state.reductionModel
		})
	},
	watch: {
		// 页面跳转 初始模型
		reductionModel(vaue) {
			entire.map(ser => ser.visible = false)
			entire[0].visible = true;
			camera.position.set(-41.84, 8.44, 114.57);
			camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向(指向的场景对象)
		},
		// 切换楼层
		floor(vaue) {
			entire.map(ser => ser.visible = false)
			if (vaue == '楼') {
				entire[0].visible = true;
				camera.position.set(-41.84, 8.44, 114.57);
			}
			if (vaue == 'B1') {
				entire[1].visible = true
				camera.position.set(-14.016, 83.24, 52.82);
			}
			if (vaue == 'B2') {
				entire[2].visible = true
				camera.position.set(-14.016, 83.24, 52.82);
			}
			if (vaue == 'F2') {
				entire[3].visible = true
				camera.position.set(-14.016, 83.24, 52.82);
			}
			if (vaue == 'F3') {
				entire[4].visible = true
				camera.position.set(-14.016, 83.24, 52.82);
			}
			if (vaue == 'F4') {
				entire[5].visible = true
				camera.position.set(-14.016, 83.24, 52.82);
			}
			if (vaue == 'F5') {
				entire[6].visible = true
				camera.position.set(-11.08, 56.56, 15.23);
			}
			if (vaue == 'F6') {
				entire[7].visible = true
				camera.position.set(-11.08, 56.56, 15.23);
			}
			if (vaue == 'F7') {
				entire[8].visible = true
				camera.position.set(-11.08, 56.56, 15.23);
			}
			if (vaue == 'F8') {
				entire[9].visible = true
				camera.position.set(-11.08, 56.56, 15.23);
			}
			if (vaue == 'F9') {
				entire[10].visible = true
				camera.position.set(-11.08, 56.56, 15.23);
			}
			camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向(指向的场景对象)
		}
	},
	methods: {
		// 相机动画效果
		animationClick() {
			 let curve = new THREE.CatmullRomCurve3([
			    new THREE.Vector3(0, 341.05, 0),
			    new THREE.Vector3(0, 250.70, 0),
			    new THREE.Vector3(-10.08, 116.09, 221.97),
			    new THREE.Vector3(-20.38, 56.04,164.6), 
				new THREE.Vector3(-68.99, 28.173,148.692), 
				new THREE.Vector3(-47.50, 14.43,111.72), 
			  ])
			
		},
		// 获取相机当前位置
		clickPosition() {
			console.log(camera.position)
		},
		// 计算 容器元素 高宽，左偏移值，顶偏移值
		updateContainerElement(containerElement) {
			clientWidth = window.innerWidth;
			clientHeight = window.innerHeight;
			const rect = containerElement.getBoundingClientRect();
			offsetLeft = rect.left;
			offsetTop = rect.top;
		},
		// three.js场景
		modelScene() {
			let containerElement = document.querySelector(".mapModel");
			this.updateContainerElement(containerElement); // 计算 容器元素 高宽，左偏移值，顶偏移值
			scene = new THREE.Scene();
			this.switchMapping(scene); // 场景 贴图更换

			stats = new Stats();
			document.body.appendChild(stats.dom);
			camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 1000000);
			camera.position.set(-41.84, 8.44, 114.57); //设置相机位置
			camera.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向(指向的场景对象)
			
			// 设置第二个摄像头
			cameraTest = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 1, 1000000);
			cameraTest.position.set(-41.84, 8.44, 114.57); //设置相机位置
			cameraTest.lookAt(new THREE.Vector3(0, 0, 0)); //设置相机方向(指向的场景对象)
			cameraHelper = new THREE.CameraHelper(cameraTest)
			scene.add(cameraTest)
			scene.add(cameraHelper)
			
			
			let renderer = new THREE.WebGLRenderer();
			// 设置与容器元素相同大小
			renderer.setSize(clientWidth, clientHeight);
			containerElement.appendChild(renderer.domElement);

			const controls = new OrbitControls(camera, renderer.domElement);
			const light = new THREE.HemisphereLight(0xffffff, 0xcccccc, 1);
			scene.add(light);

			// 效果组合器
			composer = new EffectComposer(renderer);
			const renderPass = new RenderPass(scene, camera);
			composer.addPass(renderPass);

			// 选择模型外边框
			outlinePass = new OutlinePass(new THREE.Vector2(clientWidth, clientHeight), scene, camera);
			outlinePass.edgeStrength = 5;
			outlinePass.edgeGlow = 1;
			outlinePass.pulsePeriod = 2;
			outlinePass.visibleEdgeColor.set("#0B33EC");
			outlinePass.hiddenEdgeColor.set("#3449A9");
			composer.addPass(outlinePass);

			const effectFXAA = new ShaderPass(FXAAShader);
			effectFXAA.uniforms["resolution"].value.set(1 / window.innerWidth, 1 / window.innerHeight);
			composer.addPass(effectFXAA);



			// 选中高亮
			raycaster = new THREE.Raycaster();
			mouse = new THREE.Vector2(1, 1);
			const mousePosition = {
				x: 0,
				y: 0
			};

			function onMouseMove(event) {
				event.preventDefault();
				mousePosition.x = event.clientX;
				mousePosition.y = event.clientY;

				mouse.x = ((event.clientX - offsetLeft) / clientWidth) * 2 - 1;
				mouse.y = -((event.clientY - offsetTop) / clientHeight) * 2 + 1;

			}
			containerElement.addEventListener("mousemove", onMouseMove, false);
		},
		// 加载模型
		modelLoad(allUrl, type) {
			let _this = this;
			const loader = new GLTFLoader(); // 加载 Gltf 格式的模型
			let I = 0;
			allUrl.map(ser => {
				loader.load(ser.url, function(gltf) {
					// console.log(gltf)
					let object = gltf.scene;
					// 颜色
					gltf.scene.traverse(function(child) {
						if (child.isMesh) {
							child.material.emissive = child.material.color;
							child.material.emissiveMap = child.material.map;
							child.material.transparent = true; // 开启模型透明效果
							child.material.opacity = .7; // 模型透明度
						}
					});

					object.updateMatrixWorld();
					const box = new THREE.Box3().setFromObject(object);
					const center = box.getCenter(new THREE.Vector3());
					object.position.x += object.position.x - center.x;
					object.position.y += object.position.y - center.y;
					object.position.z += object.position.z - center.z;
					object.scale.set(1, 1, 1)
					if (type == 'whole') {
						I++;
						entire[ser.id] = new THREE.Group();
						entire[ser.id].add(object)
						scene.add(entire[ser.id])
						entire[ser.id].visible = false;
						_this.progress(I);
					}
					if (type == 'floor') {
						floors[ser.id] = new THREE.Group();
						floors[ser.id].add(object)
						console.log(floors)
						scene.add(floors[ser.id])
						floors[ser.id].visible = false
					}
					if (!_this.daytime) {
						const list = [...gltf.scene.children];
						list.forEach(item => {
							_this.changeMat(item);
						});
					}

					window.scene = scene;
					scene.traverse(item => {
						if (!item.name.includes("floor")) {
							itemList.push(item);
						} else {
							item.material.wireframe = true;
							item.material.color.set(0x00ffff);
						}
					})
				})
			})
			this.animate();
		},
		// 自动刷新 模型 
		animate() {
			TWEEN.update();
			raycaster.setFromCamera(mouse, camera);
			let intersection = raycaster.intersectObjects(itemList);
			if (intersection.length > 0) {
				// console.log(intersection[0].object.name);
				outlinePass.selectedObjects = [intersection[0].object];

			} else {
				outlinePass.selectedObjects = [];
			}
			if (this.moveType) {
				scene.rotateY(0.001); //每次绕y轴旋转0.01弧度
			}
			composer.render();
			requestAnimationFrame(this.animate);
			stats.update();
		},
		// 模型 运动轨迹
		trajectory() {},
		// 模型加载进度
		format() {
			this.loading = this.$loading({
				lock: true,
				text: '加载中',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.3)'
			}); // 加载中
			return `${this.haveLoadNum}/${this.totalModel}件 -- ${this.percentage}%`; // 加载 几个模型 和 百分之多少;
		},
		// 进度条
		progress(I) {
			let a = 100 / this.totalModel; // 计算百分数
			let percentages = a * I // 已经加载完成了百分之多少
			this.percentage = Math.round(percentages);
			this.haveLoadNum = I; // 已经加载了几个
			this.loading.setText(`已经加载 ${this.percentage}%`)
			if (this.haveLoadNum === this.totalModel && this.percentage === 100) { // 加载完成
				setTimeout(() => {
					this.loading.close();
					this.notHasLoadAll = false;
					this.$emit('loadingModel', 'complete') // 子传父  模型加载完成,
					entire[0].visible = true;
					// this.modelLoad(this.minorModel, 'floor');
				}, 1000);
			}
		},

		// 夜间效果
		changeMat(object3d) {
			const vertexShader = `
			varying vec3 vNormal;
			varying vec3 vPositionNormal;
			void main() 
			{
			  vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
			  vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
			  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}
			`;

			const fragmentShader = `
			uniform vec3 glowColor;
			uniform float b;
			uniform float p;
			uniform float s;
			varying vec3 vNormal;
			varying vec3 vPositionNormal;
			void main() 
			{
			  float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
			  gl_FragColor = vec4( glowColor, a );
			}
			`;

			var customMaterial = new THREE.ShaderMaterial({
				uniforms: {
					"s": {
						type: "f",
						value: -1.0
					},
					"b": {
						type: "f",
						value: 1.0
					},
					"p": {
						type: "f",
						value: 2.0
					},
					glowColor: {
						type: "c",
						value: new THREE.Color('#169B9B')
					}
				},
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
				side: THREE.FrontSide,
				blending: THREE.AdditiveBlending,
				transparent: true
			});



			object3d.traverse(item => {
				if (item.material) {
					item.material = customMaterial;
				}
			});
		},
		// 切换贴图
		switchMapping(scene) { // 判断时间切换 贴图   7~18小时为白天 ， 19~6小时为黑夜
			let hours = 10; // 当前时间
			if (hours > 6 && hours <= 18) { //白天
				this.daytime = true
			} else if (hours > 18 && hours <= 24) { // 晚上
				this.daytime = false
			} else if (hours >= 0 && hours <= 6) { // 深夜
				this.daytime = false
			};
			if (this.daytime) {
				scene.background = new THREE.CubeTextureLoader().load( //加载模型白天贴图
					[
						// './ambient/RT.jpg', //右
						// './ambient/LF.jpg', //左
						// './ambient/UP.jpg', // 上
						// './ambient/DN.jpg', // 下
						// './ambient/BK.jpg', // 前
						// './ambient/FR.jpg' // 后
						'./ambient/px.jpg',
						'./ambient/nx.jpg',
						'./ambient/py.jpg',
						'./ambient/ny.jpg',
						'./ambient/pz.jpg',
						'./ambient/nz.jpg'
					]);
			} else {
				scene.background = new THREE.CubeTextureLoader().load( //加载模型白天贴图
					[
						'./ambient/px.jpg',
						'./ambient/nx.jpg',
						'./ambient/py.jpg',
						'./ambient/ny.jpg',
						'./ambient/pz.jpg',
						'./ambient/nz.jpg'
					]);
			}

		},
	}
}
