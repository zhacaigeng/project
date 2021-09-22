import React, { useImperativeHandle, useRef, useEffect, useReducer } from 'react'
import { Table, message } from 'antd'
import isObject from 'lodash/isObject'
import { ListContextProvider } from './context'
import './list.scss'

function reducer(state, action) {    
    switch (action.type) {
        case 'WILL_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'DID_LOADING':
            return {             
                ...state,       
                ...action.preload,    
                loading: false
            }        
        default:
            throw new Error(`Invalid action type`)
    }
}

const List = React.forwardRef(function List(props, ref) {
    const {
        filterForm,
        pagination: defaultPagination, 
        onChange, 
        fetchData, 
        fetchDataOnMount,
        ...rest 
    } = props;
    const defaultPaginationRef = useRef(defaultPagination);
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        pagination: defaultPagination,
        list: null,
        filters: null
    });
    const autoFetchData = !onChange && fetchData;
    const handleChange = !autoFetchData 
        ? onChange 
        : async function handleChange(pagination, filters) {            
            dispatch({ type: 'WILL_LOADING' });
            let list, total;
            filters = filters || state.filters;
            try {
                ;({ list, total } = await fetchData(pagination, filters));
            } catch(e) {
                console.error(e);
                message.error(e.message || '系统异常，请重试');
            } finally {
                dispatch({ 
                    type: 'DID_LOADING',
                    preload: {                        
                        list,
                        filters,
                        pagination: isObject(pagination) 
                            ? {
                                ...pagination,
                                total,
                            }
                            : pagination
                    }
                });
            }
        };

    const reloadData = filters => {        
        if(!autoFetchData) {
            return;
        }
        // 重新加载首页数据
        handleChange(defaultPaginationRef.current, filters);
    }

    useImperativeHandle(ref, () => ({ reloadData }), [reloadData]);
    // Load data when mounted
    useEffect(() => {
        fetchDataOnMount && reloadData();
    }, [fetchDataOnMount]);
    
    const { loading, pagination, list } = state;
    return (
        <ListContextProvider value={{ reloadData }}>
            <If condition={filterForm}>
                {
                    filterForm
                }
            </If>
            <Table 
                className="vcc-table"
                onChange={pagination => handleChange(pagination)} 
                dataSource={list} 
                pagination={pagination} 
                loading={loading}
                {...rest} 
            />
        </ListContextProvider>        
    )
})

List.defaultProps = {
    fetchDataOnMount: true,
    pagination: {
        pageSize: 10,
        current: 1
    }
}

export default List;