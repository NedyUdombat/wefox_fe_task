import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { ResponseData, useData } from '../../context/auth';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPenToSquare,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import AddCity from '../../components/forms/addCity';

interface ItemCardProps {
  item: ResponseData;
}

const ItemCard = (props: ItemCardProps) => {
  const [show, setShow] = useState(false);
  const { removeData } = useData();
  const { item } = props;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Card className="mb-2">
      <Card.Body className="d-lg-flex d-md-block">
        <div
          style={{
            flex: 1,
            minHeight: '168px',
            minWidth: '248px',
            maxHeight: '168px',
            maxWidth: '248px',
            overflow: 'hidden',
          }}
        >
          <Image
            fluid={true}
            src={item.image_url ? item.image_url : ''}
            alt={`A photo of ${item.title}`}
          />
        </div>
        <div
          style={{ flex: 3 }}
          className="d-flex flex-column p-2 justify-content-center"
        >
          <div className="d-flex">
            <Card.Title>{item.title}</Card.Title>
            <div className="d-flex ml-2 small">
              (<Card.Text className="mr-2">Lat: {item.lat} </Card.Text>
              <Card.Text>Long: {item.long} </Card.Text>)
            </div>
          </div>
          <Card.Text>{item.content}</Card.Text>
        </div>

        <div style={{ flex: 1 }} className="d-flex justify-content-end">
          <Button className="bg-transparent border-0 text-primary" disabled>
            <FontAwesomeIcon icon={faEye} className="fa-xl" />
          </Button>
          <Button
            className="bg-transparent border-0 text-secondary"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="fa-xl" />
          </Button>
          <Button
            className="bg-transparent border-0 text-danger"
            onClick={() => removeData(item.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="fa-xl" />
          </Button>
        </div>
      </Card.Body>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Your City </Modal.Title>
          <Button variant="secondary" className="ml-auto" onClick={handleClose}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <AddCity handleClose={handleClose} item={item} />
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default ItemCard;
