import BtnWithConfirm from './btnWithConfirm'

ActionPass.defaultProps = {
    type: 'primary',
    children: '通过'
}

export default function ActionPass(props) {
    return <BtnWithConfirm {...props} />
}