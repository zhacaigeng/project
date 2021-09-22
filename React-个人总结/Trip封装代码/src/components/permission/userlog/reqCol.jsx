
export default function ReqCol({ req }) {    
    return (
        <div style={{ maxHeight: 200, overflowY: 'scroll' }}>
            {
                req
            }
        </div>        
    )
}