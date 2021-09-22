import FormItemCheckboxGroup from './formItemCheckboxGroup'
import BlacklistEnum from '$src/enums/blacklist'

/**
 * 风险交易
 * @param {*} props 
 * @returns 
 */
 FormItemBlackList.defaultProps = {
    name: 'blacklist',
    label: '黑名单',
    vertical: true,
    options: BlacklistEnum
        .toSelectOptions()
        .map(({ title: label, value }) => ({ value, label }))
}

export default function FormItemBlackList(props) {
    return <FormItemCheckboxGroup {...props} />
}