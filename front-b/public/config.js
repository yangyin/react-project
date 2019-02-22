var systemBaseConfig = {
    api:"http://b.benefitech.cn/",//请求地址
    urldown:'http://210.b.benefitech.cn/',//文件下载地址
    toAsystem:'http://a.benefitech.cn', //返回A端
    iconUrl:'https://at.alicdn.com/t/font_773249_tbe22pzmtwf.js',//iconJS地址
    loginPortal:"B",
    menuDefaultUserList:[
        {name:'安全设置',checked: true, id: '0001',children: [],url: '/securitySetting',icon: 'dashboard'},
        {name:'基本资料',checked: false,id:'0002',children: [],url: '/basicData',icon: 'database'},
        {name:'实名认证',checked: false,id:'0003',children: [],url: '/realnameAuthentication',icon: 'form'},
        {name: '企业认证',checked: false,id: '0004',children: [],url: '/corporateCertification',icon: 'warning'}
    ]
}