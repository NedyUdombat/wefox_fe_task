import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import AddCity from '../../components/forms/addCity';
import ItemList from '../../components/itemlist';

import Topbar from '../../components/navbar';

const Index = (): JSX.Element => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section className="bg-warning">
      <Topbar />
      <div className="py-2 d-flex px-3">
        <Button variant="primary" className="ml-auto" onClick={handleShow}>
          Add New City
        </Button>
      </div>
      <ItemList />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add New City </Modal.Title>
          <Button variant="secondary" className="ml-auto" onClick={handleClose}>
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <AddCity handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Index;
