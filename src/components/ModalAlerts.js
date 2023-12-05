import { Button, Modal } from 'flowbite-react';

const ModalAlerts = (props) => {
  const heading = props.heading;
  const message = props.message;

  return (
    <Modal show={true} onClose={props.onClose}>
      <Modal.Header>{heading}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {message}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className='flex flex-row-reverse'>
          <Button className="bg-sky-500" onClick={props.onClose}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAlerts;