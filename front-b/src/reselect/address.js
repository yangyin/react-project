import { createSelector } from 'reselect';

const addressSelector = createSelector(
    state=>state,
    (state) => {
        const {regionList,cityList,countyList} = state;
        // console.log(regionList,cityList,countyList);
        let address = [];

        if( regionList.length > 0 ) { //判断 省 是否有值
            let region = regionList.map(v=>{
                v.isLeaf = false;
                v.key    = 2;
                return v;
            })

            // console.log(region)
            if( cityList.length > 0 ) { // 判断 市 是否有值
                const { regionId } = state; //省份ID
                let regionFilter = regionList.find(v => v.regionValue == regionId); // 根据ID 找出对应的省份，添加城市
        
                let cityLists =  cityList.map(v => {
                    v.isLeaf = false;
                    v.key = 3;
                    return v;
                });
                if(regionFilter) {
                    regionFilter['children'] = cityLists; //对应省份，添加 市
                }
               

                if( countyList.length > 0 ) { // 判断 区/县 是否有值
                    if(regionFilter &&regionFilter['children'] ) {
                        const { cityId } = state;
                        let countyFilter = regionFilter['children'].find(v => v.regionValue == cityId);
                        if(countyFilter) {
                            countyFilter['children'] = countyList;
                        }
                    }
                } else { 
                    //TODO  区/县 长度为0时，应该清除 市isLeaf 字段
                    const { cityId } = state;
                    if(cityId && regionFilter && regionFilter['children']) {
                        let current_city = regionFilter['children'].find(v => v.regionValue == cityId);
                        
                        if(current_city) {
                            delete current_city.isLeaf;
                        }
                    }
                }
            }
            address = [...region]; 
        } 

        return address;
    }
)

const oldAddressSelector = createSelector(
    state=>state,
    (state) => {
        const {regionOldList,cityOldList,countyOldList} = state;
        // console.log(regionList,cityList,countyList);
        let address = [];

        if( regionOldList.length > 0 ) { //判断 省 是否有值
            let region = regionOldList.map(v=>{
                v.isLeaf = false;
                v.key    = 2;
                return v;
            })

            // console.log(region)
            if( cityOldList.length > 0 ) { // 判断 市 是否有值
                const { regionOldId } = state; //省份ID
                let regionFilter = regionOldList.find(v => v.regionValue == regionOldId); // 根据ID 找出对应的省份，添加城市
        
                let cityLists =  cityOldList.map(v => {
                    v.isLeaf = false;
                    v.key = 3;
                    return v;
                });
                if(regionFilter) {
                    regionFilter['children'] = cityLists; //对应省份，添加 市
                }
               

                if( countyOldList.length > 0 ) { // 判断 区/县 是否有值
                    if(regionFilter &&regionFilter['children'] ) {
                        const { cityOldId } = state;
                        let countyFilter = regionFilter['children'].find(v => v.regionValue == cityOldId);
                        if(countyFilter) {
                            countyFilter['children'] = countyOldList;
                        }
                    }
                } else { 
                    //TODO  区/县 长度为0时，应该清除 市isLeaf 字段
                    const { cityOldId } = state;
                    if(cityOldId && regionFilter && regionFilter['children']) {
                        let current_city = regionFilter['children'].find(v => v.regionValue == cityOldId);
                        
                        if(current_city) {
                            delete current_city.isLeaf;
                        }
                    }
                }
            }
            address = [...region]; 
        } 
        return address;
    }
)


export { addressSelector,oldAddressSelector };