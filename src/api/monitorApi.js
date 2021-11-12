// 监控
import axios from 'axios'
import {URL} from './apiHttp.js'

// 运维监控 工程列表
export const monitorList = () => {
	return axios({
		method: 'get',
		url: URL +'/engineering/info/listTree',
	}).then(res => res.data);
}


// 运维监控 修改
export const updateInfo = (params) => {
	return axios({
		method: 'post',
		url: URL +'/engineering/info/updateInfo',
		data: params,
	}).then(res => res.data);
}


// 运营监控 视频列表
export const monitorPageInfo = (params) =>{
	return axios({
		method: 'get',
		url: URL +'/engineering/device/pageInfo',
		params: params,
	}).then(res => res.data);
}


// 监控 详情 视频
export const monitorVideo = (params) =>{
	return axios({
		method: 'get',
		url: URL +'/engineering/device/getRTMPUrlAndStartTranscode',
		params: params,
	}).then(res => res.data);
}