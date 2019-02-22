var hash = {
    'qq.com': 'https://mail.qq.com',
    'gmail.com': 'https://mail.google.com',
    'sina.com': 'https://mail.sina.com.cn',
    '163.com': 'https://mail.163.com',
    '126.com': 'https://mail.126.com',
    'yeah.net': 'https://www.yeah.net/',
    'sohu.com': 'https://mail.sohu.com/',
    'tom.com': 'https://mail.tom.com/',
    'sogou.com': 'https://mail.sogou.com/',
    '139.com': 'https://mail.10086.cn/',
    'hotmail.com': 'https://www.hotmail.com',
    'live.com': 'https://login.live.com/',
    'live.cn': 'https://login.live.cn/',
    'live.com.cn': 'https://login.live.com.cn',
    '189.com': 'https://webmail16.189.cn/webmail/',
    'yahoo.com.cn': 'https://mail.cn.yahoo.com/',
    'yahoo.cn': 'https://mail.cn.yahoo.com/',
    'eyou.com': 'https://www.eyou.com/',
    '21cn.com': 'https://mail.21cn.com/',
    '188.com': 'https://www.188.com/',
    'foxmail.coom': 'https://www.foxmail.com',
};

export default {
    // 验证手机号码
    validFhone: (rule, value, callback) => {
        var telReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
        value
            ? telReg.test(value) == true ? callback() : callback('请输入正确的手机号码')
            : callback();
    },
    // 隐藏手机号中间4位
    formatPhone(phone) {
        phone += '';
        return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
    },
    // 隐藏身份证号中11位
    formatIdentity(number) {
        number += '';
        return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
    },
    findEmail(email) {
        let url = email.split('@')[1];
        for (let j in hash) {
            return hash[url] ? hash[url] : null;
        }
    },
    //验证50个字以内，支持数字、字母、汉字
    validName: (rule, value, callback) => {
        var telReg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,50}$/;
        value
            ? telReg.test(value) == true ? callback() : callback('只支持输入数字、字母、汉字且最多50字')
            : callback();
    },
    //分页
    pagination(data, callback) {
        return {
            onChange: current => {
                callback(current);
            },
            current: data.pageNum,
            pageSize: data.pageSize || 10,
            total: data.total,
            showTotal: () => {
                // return `共${data.total}条`;
            },
            showQuickJumper: data.showQuickJumper === false ? false : true,
            showSizeChanger: false,
            // showSizeChanger:data.showSizeChanger === false?false:true,
            hideOnSinglePage: true,
        };
    },
    //过去了多少天
    getBeforeDate(obj) {
        //计算现在时间 距离 过去一时间 相差多少天
        var today = new Date();
        var timerToday = today.getTime(); //获取现在 距离 标准时间 多少毫秒
        // console.log("现在时间:"+today+"<br />");

        //以 时间日期字符串 作为Date的参数
        var birthday = new Date(obj);
        var timerBirthday = birthday.getTime(); //得到那天 距离 标准时间 多少毫秒

        //要是深究的话，1990/1/1 没有写 时分秒，那么计算机的默认是什么呢？不知道诶
        //不知道怎么办呢？ 测试一下即可.
        // console.log("指定时间:" + birthday + "<br />");

        var dayNum = (timerToday - timerBirthday) / 1000 / 3600 / 24;
        // console.log("现在时间与指定时间距离:"+dayNum.toFixed(1)+" 天");
        return dayNum.toFixed(1);
    },
    /**
       *json转换为数组
       */
    jsonToMap(jsonStr) {
        const jsonObj = JSON.parse(jsonStr);
        let arr = [];
        for (let i in jsonObj) {
            arr.push({
                key: i,
                value: jsonObj[i],
            });
        }
        return arr;
    },
    /**
       *判断字符串是图片地址
       */
    checkIsImg(url) {
        let flag = false;
        if (url.match(/\.(jpeg|jpg|gif|png)/) != null) {
            flag = true;
        }
        return flag;
    },
    // 验证百分比0-99.99
    validPercent: (rule, value, callback) => {
        var telReg = /^([0-9][0-9]?)(\.\d{1,2})?$/;
        value
            ? telReg.test(value) == true ? callback() : callback('请输入正确的分值')
            : callback();
    },
    // 过滤文本中全部输入空格情况
    validSpace: (rule, value, callback) => {

        if (value && value.length > 0) {
            let valStr = value ? value.replace(/\s+/g, '') : '';
            valStr ? callback() : callback('请输入有效字符!');
        } else {
            callback();
        }
    },
    /**
     * 过滤文本中的所有空格
     */
    replaceSpace: (str) => {
        return str ? str.replace(/\s+/g, '') : '';
        // console.log(str.replace(/\s+/g, ''));
    },
    //获取当前日期
    getCurrentData: () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        let nowDate = year + "-" + month + "-" + day;
        return nowDate;
    },
     // link方式传参 字符串转对象
     linkParamsToObj: (searchParams) => {
        const paramsString = searchParams.split('?');
        const paramsArr = paramsString[1].split("&");
        let resLink = {};
        paramsArr.map(item => {
            let itemString = item.split('=');
            resLink[itemString[0]] = itemString[1];
        })
        return resLink;
    }
};
