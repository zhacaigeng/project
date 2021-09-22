const ProcessStratus = {
    ING:    '0',
    DONE:   '1'
}
const ProcessStratusDesc = {
    [ProcessStratus.ING]:   '处理中',
    [ProcessStratus.DONE]:  '已完成'
}

ProcessStratus.getDesc = val => ProcessStratusDesc[val];

export default ProcessStratus