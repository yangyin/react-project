export const judgeRoute = (src) =>{
    switch(src) {
        case 'ERpP7VAjREGe8803fBO':
            return 'home';
        case '19hq3NvHwogqY8dTh6H':
            return 'home';
        case 'z2LTEShfwOG1t07Lf1B':
            return 'home/account';

        case 'HtzzfGqRYkvqlhlpq07':
            return 'home/user/publicUsers';
        case 'lDhMH9zon1I95cr5xDe':
            return 'home/user/publicUsers';
        case 'k1GEPfxG1RCxsTj85DL':
            return 'home/user/companyUser';
        case 'zzpTbYl2WMQum2UUKGY':
            return 'home/user/group';

        case 'kFihUA66S24yA5c8Ppj':
            return 'home/project/list';
        case 'vHmF1LKUg1UX4xntMjE':
            return 'home/project/list';

        case 'MaxGMJ32dROjtVa3uIZ':
            return 'home/saas/management';
        case '05wVjlFXp3Ow3u0ih9m':
            return 'home/saas/management';
        case 'bYXCjCh2EhBkLnaVeUk':
            return 'home/saas/monitoring';
        case '3xqNHOUKGsppIMGB8AC':
            return 'home/saas/userdata';

        case 'WOyhoYPy6D5UcAKAXVk':
            return 'home/set/Jurisdiction';
        case 'URAfPgoXytqrdKso00R':
            return 'home/set/Jurisdiction';
        case 'jb25A693J1ayMIN8X2P':
            return 'home/set/notice';
        case 'dqtJ5jtd65QzIPy1RaC':
            return 'home/set/project';
        case 'BM5BARO3EHft74FfnMo':
            return 'home/set/tasks';

        case 'jzQJjis2VNU5Oo6SSqg':
            return 'home/set/role';
        case 'VI155DHSlfujkauA769':
            return 'home/set/platform';

        case 'iMni5aa61BE3pGoKdzC':
            return 'home/set/city';
        case 'Zj43eLBmSMo5kmtvR88':
            return 'home/set/clause';
        default:
            return 'home';
    }
}

export const pathToId = (pathname) => {
    switch(pathname) {
        case '/home':
            return ['ERpP7VAjREGe8803fBO','19hq3NvHwogqY8dTh6H'];
        case '/home/account':
            return ['ERpP7VAjREGe8803fBO','z2LTEShfwOG1t07Lf1B'];

        case '/home/user/publicUsers':
            return ['HtzzfGqRYkvqlhlpq07','lDhMH9zon1I95cr5xDe'];
        case '/home/user/companyUser':
            return ['HtzzfGqRYkvqlhlpq07','k1GEPfxG1RCxsTj85DL'];
        case '/home/user/group':
            return ['HtzzfGqRYkvqlhlpq07','zzpTbYl2WMQum2UUKGY'];
           
        case '/home/project/list':
            return ['kFihUA66S24yA5c8Ppj','vHmF1LKUg1UX4xntMjE'];
        
        case '/home/saas/management':
            return ['MaxGMJ32dROjtVa3uIZ','05wVjlFXp3Ow3u0ih9m','lwEsfCjUMD92sZWZqUt'];
        case '/home/saas/monitoring':
            return ['MaxGMJ32dROjtVa3uIZ','bYXCjCh2EhBkLnaVeUk','lwEsfCjUMD92sZWZqUt'];
        case '/home/saas/userdata':
            return ['MaxGMJ32dROjtVa3uIZ','3xqNHOUKGsppIMGB8AC','DkTTFMfjHFXi9LC7mDV'];

        case '/home/set/Jurisdiction':
            return ['WOyhoYPy6D5UcAKAXVk','URAfPgoXytqrdKso00R','UUS8dkyGWYy4Shav8sz'];
        case '/home/set/notice':
            return ['WOyhoYPy6D5UcAKAXVk','jb25A693J1ayMIN8X2P','UUS8dkyGWYy4Shav8sz'];
        case '/home/set/project':
            return ['WOyhoYPy6D5UcAKAXVk','dqtJ5jtd65QzIPy1RaC','UUS8dkyGWYy4Shav8sz'];
        case '/home/set/tasks':
            return ['WOyhoYPy6D5UcAKAXVk','BM5BARO3EHft74FfnMo','UUS8dkyGWYy4Shav8sz'];

        case '/home/set/role':
            return ['WOyhoYPy6D5UcAKAXVk','jzQJjis2VNU5Oo6SSqg','TFTlktuLoYEtuGyuKqD'];    
        case '/home/set/platform':
            return ['WOyhoYPy6D5UcAKAXVk','VI155DHSlfujkauA769','TFTlktuLoYEtuGyuKqD'];

        case '/home/set/city':
            return ['WOyhoYPy6D5UcAKAXVk','iMni5aa61BE3pGoKdzC','2QguzpKq210KlaWSfJd'];
        case '/home/set/clause':
            return ['WOyhoYPy6D5UcAKAXVk','Zj43eLBmSMo5kmtvR88','2QguzpKq210KlaWSfJd'];       
        default:
            return ['ERpP7VAjREGe8803fBO','19hq3NvHwogqY8dTh6H','2QguzpKq210KlaWSfJd'];
    }
}
