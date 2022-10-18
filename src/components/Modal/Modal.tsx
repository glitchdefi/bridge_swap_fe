import ReactModal, { Props as ReactModalProps } from 'react-modal'
import ModalHeader from './Header'
import ModalContent from './Content'

ReactModal.setAppElement('#__next')

const baseStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    border: 'none',
    background: 'transparent',
    maxWidth: '500px',
    width: '100%',
    borderRadius: 0,
    overflow: 'unset',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
}

interface ModalProps extends ReactModalProps {
  children: React.ReactNode
}

interface CompoundedComponent {
  Header: typeof ModalHeader
  Content: typeof ModalContent
}

const Modal: React.FC<ModalProps> & CompoundedComponent = (props) => {
  const { children, style, ...rest } = props
  const modalStyles = { ...baseStyles, ...style }
  return (
    <ReactModal style={modalStyles} {...rest}>
      {children}
    </ReactModal>
  )
}

Modal.Header = ModalHeader
Modal.Content = ModalContent

export default Modal
