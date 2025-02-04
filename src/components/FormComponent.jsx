import React from "react";
import { Form, Row, Col } from 'react-bootstrap';

const FormComponent = ({ children}) => {
  return (
    <div>
      <Form>
        {children}
        <Form.Control type="text" placeholder="Your Full Name" className="mb-2" />
        <Row>
          <Col xs={12} md={6}>
            <Form.Control type="text" placeholder="Address" className="mb-2" />
          </Col>

          <Col xs={12} md={6}>
            <Form.Control type="text" placeholder="Website" className="mb-2" />
          </Col>
        </Row>
        <Form.Control as="textarea" rows={3} placeholder="Description" />
      </Form>
    </div>
  );
};

export default FormComponent;
