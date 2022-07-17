import React from 'react';
import Button from 'react-bootstrap/Button';

import Navbar from '../../components/navbar';

const Index = (): JSX.Element => {
  return (
    <section className="base-page">
      <Navbar />
      <p>Hey</p>
      <Button> Press me</Button>
    </section>
  );
};

export default Index;
