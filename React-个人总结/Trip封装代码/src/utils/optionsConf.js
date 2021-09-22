export const channelOpt = [
    {value: -1 , label: '创建中'},
    {value:  0, label: '付款中'},
    {value:  1, label: '已汇出'},
    {value:  2, label: '付款失败'},
    {value:  3, label: '退票'},
    {value:  4, label: '退票中'}
]
export const transactionPurposeOpt = [
    {value: 'RP002', label: '赡家款'},
    {value: 'RP003', label: '教育相关的学生开支'},
    {value: 'RP004', label: '医疗费'},
    {value: 'RP005', label: '酒店费用'},
    {value: 'RP006', label: '航旅费用'},
    {value: 'RP007', label: '公共事业缴费'},
    {value: 'RP008', label: '归还借款'},
    {value: 'RP009', label: '支付税款'},
    {value: 'RP010', label: '购买住宅'},
    {value: 'RP011', label: '支付房屋租金'},
    {value: 'RP012', label: '保险预付'},
    {value: 'RP013', label: '产品保险'},
    {value: 'RP014', label: '支付保费'},
    {value: 'RP015', label: '共同基金投资'},
    {value: 'RP016', label: '股权投资'},
    {value: 'RP017', label: '捐赠'},
    {value: 'RP018', label: '信息服务费'},
    {value: 'RP019', label: '广告或公关费用'},
    {value: 'RP020', label: '忠诚服务费、商标费、专利费以及著作权费用'},
    {value: 'RP021', label: '交易费、担保费、保理费'},
    {value: 'RP022', label: '咨询费、技术服务、学术费、专家费'},
    {value: 'RP023', label: '办公室开支'},
    {value: 'RP024', label: '建筑建设费用'},
    {value: 'RP025', label: '商品转移费'},
    {value: 'RP026', label: '电商平台货款支付'},
    {value: 'RP027', label: '货物物流费'},
    {value: 'RP028', label: '线下一般货物贸易'},
    {value: 'RP029', label: '其他服务贸易支出'},
    {value: 'RP030', label: '工资或佣金支付'},
    {value: 'RP031', label: '定期维护费用'},
    {value: 'RP032', label: '其他费用（请详述)'},
]
export const backListStatusOpt =[
    {value: 0 , label: '处理中'},
    {value: 1 , label: '已处理'},
    {value: 2 , label: '已拒绝'},
]
export const chargeWayOpt = [
    {label: '固定手续费', value: 'FIX_MODEL'},
    {label: '百分比手续费', value: 'SCALE_MODE'},
    {label: '固定手续费加百分比手续费', value: 'FIX_MODEL_ADD_SCALE_MODEL'},
    {label: '固定费和比例费较高者', value: 'FIX_MODEL_AND_SCALE_MODEL_MAX'},
    {label: '固定费和比例费较低者', value: 'FIX_MODEL_AND_SCALE_MODEL_MIN'},
]
export const subjectTypeOpt = [
    // {label: '个人', value: 'P'},
    {label: '公司', value: 'C'},
]
export const settleModeOpt = [
    // {label: '实收', value: 0},
    {label: '月结', value: 1},
]
export const billStatusOpt=[
    {value: 0 , label: '未入账'},
    {value: 1 , label: '已入账'},
    {value: 2 , label: '入账中'},
]
export const paymentOpt=[
    {value: '-1' , label: '创建中'},
    {value: '0' , label: '待审批'},
    {value: '1' , label: '处理中'},
    {value: '2' , label: '已汇出'},
    {value: '3' , label: '审核拒绝'},
    {value: '4' , label: '汇款拒绝'},
    {value: '5' , label: '汇款异常'},
    {value: '6' , label: '已退票'}
]
export const payoutTypeOpt = ['SWIFT', 'LOCAL']
export const chargeTypeOpt =  ['SHA', 'OUR', 'BEN']
export const orderTypeOpt = [
    {value:"1001", label: "充值申请"},
    {value:"1002", label: "充值成功"},
    {value:"1003", label: "充值撤销"},
    {value:"1101", label: "实时换汇申请"},
    {value:"1102", label: "实时换汇渠道交割"},
    {value:"1103", label: "实时换汇成功"},
    {value:"1104", label: "实时换汇失败"},
    {value:"1201", label: "锁汇申请"},
    {value:"1202", label: "锁汇渠道交割"},
    {value:"1203", label: "锁汇换汇成功"},
    {value:"1204", label: "锁汇换汇失败"},
    {value:"1301", label: "提现申请"},
    {value:"1302", label: "提现成功"},
    {value:"1303", label: "提现失败"},
    {value:"1304", label: "提现退票"},
    {value:"1401", label: "付款申请"},
    {value:"1402", label: "付款成功"},
    {value:"1403", label: "付款拒绝"},
    {value:"1404", label: "付款失败"},
    {value:"1501", label: "授信充值申请"},
    {value:"1502", label: "授信充值成功"},
    {value:"1503", label: "授信充值撤销"},
    {value:"1601", label: "手续费入账"},
    {value:"1701", label: "退款申请"},
    {value:"1702", label: "退款成功"},
    {value:"1703", label: "退款失败"},
]

export const cardTypeOpt = [
    'GWTTP',
    'GWTTP-MBA',
    'GWTTP-MBG',
    'GWTTP-MBH',
    'GWTTP-MBI',
    'GWTTP-MBJ',
    'MCO',
]
export const subjectIdOpt = [	
    {label: '银行存款', value: '1002'},
    {label: '应收账款', value: '1122'},
    {label: '应收账款-客户结算账户', value: '112201'},
    {label: '应收账款-客户结算账户手续费', value: '112202'},
    {label: '客户结算账户', value: '2203'},
    {label: '客户结算账户-基本户', value: '220301'},
    {label: '客户结算账户-保证金账户', value: '220302'},
    {label: '应付账款', value: '2202'},
    {label: '应付账款-待清算充值款项', value: '220201'},
    {label: '应付账款-待清算换汇款项', value: '220202'},
    {label: '应付账款-待清算出款款项', value: '220203'},
    {label: '应付账款-待清算退单款项', value: '220204'},
    {label: '应付账款-待清算出款手续费', value: '220205'},
    {label: '应付账款-渠道出款', value: '220206'},
    {label: '主营业务收入', value: '6001'},
    {label: '主营业务收入-出款手续费', value: '600101'},
    {label: '主营业务收入-换汇markup', value: '600102'},
    {label: '主营业务收入-锁汇取消markup', value: '600103'},
    {label: '主营业务收入-锁汇取消手续费', value: '600104'},
    {label: '主营业务收入-其他', value: '600105'},
    {label: '主营业务成本', value: '6401'},
    {label: '主营业务成本-其他成本', value: '640101'},
    {label: '主营业务成本-出款成本', value: '640102'},
    {label: '主营业务成本-出款退票成本', value: '640103'},
    {label: '主营业务成本-锁汇取消markup', value: '640104'},
]
export const requestTypeOpt = [
    {value: 'create', label: '开卡'},
    {value: 'precancel', label: '预销卡'},
    {value: 'update', label: '更新卡'},
    {value: 'cancel', label: '销卡'},
]
export const cycleTypeOpt = [
    { label: '月度', value: 'MONTH' },
    { label: '季度', value: 'QUARTER' },
]
