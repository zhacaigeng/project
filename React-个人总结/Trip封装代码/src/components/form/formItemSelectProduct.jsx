import { useState, useEffect } from 'react'
import { useFormikContext } from 'formik'
import { Tree } from 'antd'
import FormItem from './formItem'
import { queryDict } from "$api/kyc"

const { TreeNode } = Tree;

/**
 * 产品选择
 * @param {*} props 
 * @returns 
 */
export default function FormItemSelectProduct(props) {    
    return (
        <FormItem {...props} >
            {
                props => <ProductTree {...props} />
            }
        </FormItem>
    )
}

function ProductTree(props) {
    const { name } = props;
    const [productList, setProductList] = useState();
    const { values, setFieldValue } = useFormikContext();
    const { checkedKeys } = values[name] || {};    

    useEffect(() => {
        let unmount = false;
        ;(async () => {
            const { code, message, result } = await queryDict();
            let productList = result && result.dict && result.dict.productList;
            productList = parseProductList(productList);
            if(!unmount) {
                setProductList(productList);
            }
        })();

        return () => {
            unmount = true;
        }
    }, [])

    function handleCheck(checkedKeys, e) {        
        const { halfCheckedKeys } = e;
        setFieldValue(name, { checkedKeys, halfCheckedKeys }, false);
    }

    return (
        <Tree 
            checkable 
            selectable={false}
            checkedKeys={checkedKeys}
            onCheck={handleCheck}
            treeData={productList}>           
        </Tree>
    )
}

function parseProductList(productList) {
    return productList && productList.map(product => {
        const { code, name, children } = product;
        return {
            key: code,
            title: name,
            children: parseProductList(children)
        }
    })
}