import axios from 'axios'
import {URL} from './apiHttp.js'
// console.log(URL)
// 数字地标
export const landmark = () => {
	// console.log(params)
	return axios({
		method: 'get',
		url: URL +'/engineering/landmark/getLargeScreen',
	}).then(res => res.data);
};
