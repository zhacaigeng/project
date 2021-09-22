import { useCallback } from 'react';
import FormItemSelect from './formItemSelect'
import {getSubjectList} from '$api/accountManager'
/**
 * 枚举
 * @param {*} props 
 * @returns 
 */

 Comp.defaultProps = {
    label: '科目',
    name: 'subjectId',
    showSearch: true,
    filterOption: (inputVal, option) => {
        const { value } = option.props;
        const regExp = new RegExp(`^${inputVal}`, 'i');
        return regExp.test(value);
    }
}

export default function Comp(props) {    
    const getOptFun = useCallback(async e => {
        let {data}  = await getSubjectList({});
        let subjectList = data && data.map(v=>({
            label: v.subjectName||'',
            value: v.subjectId ||''
        }))||[];
        props.getOpts && props.getOpts(subjectList)
        return subjectList
    }, [])
    return <FormItemSelect options={getOptFun} {...props} />
}