/**
 * 黑名单
 */
const Blacklist = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8'
]

const BlacklistDesc = [
    '香港特区政府、香港司法机关、香港金融管理局、香港海关等相关机构发布的恐怖组织、恐怖分子名单、通缉犯、恐怖嫌犯名单',
    '香港特别行政区政府及其有关部门、机构和立法机关，根据《立法会》制定的法律、法规，要求进行非法财物调查，并有洗钱犯罪的刑事条件清单',
    '香港海关需要注意的客户名单',
    '联合国、恐怖组织、恐怖分子名单等国际权威组织发布的制裁名单',
    '香港金融监管部门涉嫌违反法律、法规的清单',
    '监管机构、执法机构提出的关注事项清单或者权威媒体客户的重要负面新闻报道评论清单',
    '已被媒体披露有洗钱行为，或者与之有关联的个人或者机构有洗钱行为',
    '就任何行业、业务或专业而在香港或其他地方被任何专业或监管机构审查、纪律处分或取消资格',
    '本地／外地政治人物'
]

const getDesc = Blacklist.getDesc = val => BlacklistDesc[val]

Blacklist.toSelectOptions = () => {    
    return Blacklist.map(value => {
        return {
            title: getDesc(value),
            value
        }
    })
}

export default Blacklist;