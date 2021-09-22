import { useState, useEffect } from 'react'

export default function useSupportPreview(url) {    
    const [support, setSupport] = useState();

    useEffect(() => {
        let unmount = false;
        const extName = url && url.split('.').pop();
        // TODO a better way ?
        const supportPreview = /^jpg|jpeg|gif|png|bmp|webp$/i.test(extName);
        if(!unmount) {
            setSupport(supportPreview);
        }
        return () => {
            unmount = true;
        }
    }, [url])
    
    return support;
}