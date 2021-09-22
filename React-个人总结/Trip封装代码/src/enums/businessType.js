/**
 * 业务性质
 */
const BusinessType = {
    importExportEcommerce:          '0',
    internationalServicesTrading:   '1',
    internationalTradeGoods:        '2',
    internationalAirTravelService:  '3',
    other:                          '4'
}

const BusinessTypeDesc = {
    [BusinessType.importExportEcommerce]:           '进出口电子商务',
    [BusinessType.internationalServicesTrading]:    '国际服务贸易',
    [BusinessType.internationalTradeGoods]:         '国际货物贸易',
    [BusinessType.internationalAirTravelService]:   '国际航旅服务',
    [BusinessType.other]:                           '其他'
}

const getDesc = BusinessType.getDesc = val => BusinessTypeDesc[val]

BusinessType.toSelectOptions = () => {    
    return Object.keys(BusinessTypeDesc).map(value => {
        return {
            title: getDesc(value),
            value
        }
    })
}

export default BusinessType;
