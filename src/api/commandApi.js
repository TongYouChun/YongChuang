// 应急指挥
import axios from 'axios'
import {URL} from './apiHttp.js'

// 应急指挥 人员名单
export const companyUserList = () => {
	return axios({
		method: 'get',
		url: URL +'/engineering/bigScreen/companyUserList',
		headers:{
			satoken: '8d240089-48d8-4e5a-88a3-d2bdbc7a976c'
		},
	}).then(res => res.data);
}


// 应急指挥 发起会议
export const meeting = (params) => {
	return axios({
		method: 'get',
		url: URL +`/engineering/bigScreen/${params.personnelIds}?theme=${params.theme}`,
		headers:{
			satoken: '8d240089-48d8-4e5a-88a3-d2bdbc7a976c'
		},
		// params: params,
	}).then(res => res.data);
}

// 应急指挥 左公司菜单列表
export const companyList = (params) => {
	return axios({
		method: 'get',
		url: URL + '/engineering/bigScreen/companyList',
		headers:{
			satoken: '8d240089-48d8-4e5a-88a3-d2bdbc7a976c'
		},
		// params: params,
	}).then(res => res.data);
}

