import Axios from "axios";
import utils from "../utils.js";

var axios = Axios.create();
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
    config => {
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'Access-Control-Allow-Origin'
        };

        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
/**
 * GET 方法
 * @param {string} url 
 * @param {any} params 
 * @return Promise
 */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axiox.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/**
 * POST 请求
 * @param {string} url 
 * @param {Object} data 
 * @returns Promise
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        utils.log(`request<<<${url}`, data);
        axios.post(url, data)
            .then(response => {
                utils.log(`response>>>${url}`, response)
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}
/**
 * patch 方法封装
 * @param {string} url 
 * @param {Object} data 
 * @returns Promise
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}
/**
 * put 方法封装
 * @param {string} url 
 * @param {Object} data 
 * @returns Promise
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
    })
}