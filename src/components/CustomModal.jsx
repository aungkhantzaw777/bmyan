import { Modal } from 'react-bootstrap';

function CustomModal(prop) {

    const { 
        show, 
        headerText, 
        bodyText, 
        actionElement, 
        hide 
    } = prop
    
    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>{headerText}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyText}</Modal.Body>
            <Modal.Footer>
                {actionElement}
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal