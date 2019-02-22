



import { createSelector } from 'reselect'


const addressState = state => {
    return state;
}
// 获取省 1 市区 2
export const addressSelector = createSelector(
    addressState,
    state => {
        let address = [];
        const provinceList=state.get('provinceList');
        const cityList=state.get('cityList');
        const countyList=state.get('countyList');
        if (provinceList.length > 0) { //判断 省 是否有值
            let province = provinceList.map(v => {
                v.isLeaf = false;
                v.key = 2;
                return v;
            })

            if (cityList.length > 0) { // 判断 市 是否有值
                const provinceId=state.get('provinceId'); //省份ID
                let provinceFilter = provinceList.find(v => v.regionValue == provinceId); // 根据ID 找出对应的省份，添加城市

                let cityLists = cityList.map(v => {
                    v.isLeaf = false;
                    v.key = 3;
                    return v;
                });
                if (provinceFilter) {
                    provinceFilter['children'] = cityLists; //对应省份，添加 市
                }
                if (countyList.length > 0) { // 判断 区/县 是否有值
                    if (provinceFilter && provinceFilter['children']) {
                        const cityId  = state.get('cityId');
                        let countyFilter = provinceFilter['children'].find(v => v.regionValue == cityId);
                        if (countyFilter) {
                            countyFilter['children'] = countyList;
                        }
                    }
                } else {
                    //TODO  区/县 长度为0时，应该清除 市isLeaf 字段
                    const cityId  = state.get(cityId);

                    if (cityId && provinceFilter && provinceFilter['children']) {
                        let current_city = provinceFilter['children'].find(v => v.regionValue == cityId);

                        if (current_city) {
                            delete current_city.isLeaf;
                        }
                    }
                }
            }
            address = [...province];
        }

        return address;
    }

)




