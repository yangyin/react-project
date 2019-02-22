
import axios from 'axios'
import { Modal } from 'antd'

// var service=axios.create({
//     baseURL:process.env.BASE_API,
//     timeout:5000
// })

export default class Axios {

    static get(options){
        // console.log(options)
        // {url: data:{isShowLoading:,params:{}}}
        let loading;
        if (options.data && options.data.isShowLoading === true){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading === true) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    resolve(response)
                    // if (res.code == '0'){
                    //     resolve(res);
                    // }else{
                    //     let res = response.data;
                    //     Modal.info({
                    //         title:"提示",
                    //         content:res.message
                    //     })
                    // }
                }else{
                    reject(response);
                }
            })
            .catch(err => {
                if (options.data && options.data.isShowLoading === true) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                // Modal.info({
                //     title:"提示",
                //     content:err.message
                // })
                reject(err);
            })
        });
    }

    static post (options) {
        let loading;
        if (options.data && options.data.isShowLoading === true){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'post',
                data: (options.data && options.data.params) || ''
            }).then((response)=>{
                if (options.data && options.data.isShowLoading === true) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                // console.log(response)
                
                if (response.status == '200'){
                    resolve(response)
                    // if (res.success == true){
                    //     resolve(res);
                    // }else{
                    //     reject(res)
                    // }
                }else{
                    let res = response.data;
                    Modal.info({
                        title:"提示",
                        content:res.message
                    })
                    reject(response);
                }
            })
            .catch(err => {
                if (options.data && options.data.isShowLoading === true) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                // Modal.info({
                //     title:"提示",
                //     content:err.message
                // })
                reject(err);
            })
        });
    }
}