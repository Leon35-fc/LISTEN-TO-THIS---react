import { Row, Col, Tabs, Tab, Form, Button } from 'react-bootstrap';

const Login = () => {
  return (
    <>
      <Row className="border border-2 mt-3 pb-3 justify-content-center">
        {/* <h3>Login</h3> */}
        <Tabs>
          <Tab eventKey="registration" title="Registration">
              <Form className="text-start ">
                <Form.Group>
                  <Form.Label className="my-2">Username</Form.Label>
                  <Form.Control type="text" placeholder="username" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-2">E-mail</Form.Label>
                  <Form.Control type="email" placeholder="name@domain.com" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-2">Password</Form.Label>
                  <Form.Control type="password" placeholder="password" />
                </Form.Group>
                <Button className='mt-3'>Register</Button>
              </Form>
          </Tab>
          <Tab eventKey="login" title="Login">
              <Form className="text-start">
                <Form.Group>
                  <Form.Label className="my-2">Username</Form.Label>
                  <Form.Control type="text" placeholder="username" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="my-2">Password</Form.Label>
                  <Form.Control type="password" placeholder="password" />
                </Form.Group>
                 <Button className='mt-3'>Login</Button>
              </Form>
          </Tab>
        </Tabs>
      </Row>
    </>
  );
};

export default Login;
