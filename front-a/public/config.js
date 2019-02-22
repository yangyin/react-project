var systemBaseConfig = {
    api:"http://a.benefitech.cn/",
    urldown:'http://devb.benefitech.cn/',
    iconUrl:'https://at.alicdn.com/t/font_773249_tbe22pzmtwf.js',
    toBsystem:'http://b.benefitech.cn', // 代管到b端
    loginPortal:"A",
    menuDefaultUserList:[
        {name:'安全设置',checked: true, id: '0001',children: [],url: '/securitySetting',icon: 'dashboard'},
        {name:'基本资料',checked: false,id:'0002',children: [],url: '/basicData',icon: 'database'},
        {name:'实名认证',checked: false,id:'0003',children: [],url: '/realnameAuthentication',icon: 'form'},
        {name: '企业认证',checked: false,id: '0004',children: [],url: '/corporateCertification',icon: 'warning'}
    ]
}