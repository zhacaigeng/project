import BtnWithConfirm from './btnWithConfirm'

ActionReject.defaultProps = {
    type: 'danger',
    children: '拒绝'
}

export default function ActionReject(props) {
    return <BtnWithConfirm {...props} />
}