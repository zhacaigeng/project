ReqBeauty.defaultProps = {
    space: 2
}

export default function ReqBeauty({ req, space }) {    
    req = JSONFormat(req, space);
    return (
        <pre>
            {
                req
            }
        </pre>             
    )
}

function JSONFormat(text, space) {
    let beauty;
    try {
        beauty = text && JSON.stringify(JSON.parse(text), null, space);
    } catch(e) {
        beauty = text;
    }
    return beauty
}