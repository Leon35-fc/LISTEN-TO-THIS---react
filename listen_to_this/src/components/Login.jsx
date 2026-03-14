import { Row, Col, Tabs, Tab, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const Login = () => {
  const [registrationInput, setRegistrationInput] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loginInput, setLoginInput] = useState({ username: '', password: '' });

  const handleRegistrationInput = function (e) {
    setRegistrationInput({...registrationInput,[e.target.name]: e.target.value});
    console.log('valore registrato', e.target.value);
  };

  const handleRegistrationSubmit = function (e) {
    e.preventDefault();
    const registration = {
      username: registrationInput.username,
      email: registrationInput?.email,
      password: registrationInput.password
    };

    setRegistrationInput({
      username: '',
      email: '',
      password: ''
    });

    console.log('Dati registrazione inviati.', registration);

    return registration
  };

  const handleLoginSubmit = function(e) {
    e.preventDefault();
    const login = {
        username: loginInput.username,
        password: loginInput.password
    };
    console.log('Dati di accesso inviati.');

    setRegistrationInput({
      username: '',
      email: '',
      password: ''
    });

    return login
  }

  return (
    <>
      <Row className="border border-2 mt-3 pb-3">
        <Tabs>
          <Tab eventKey="registration" title="Registration">
            <Form className="text-start" onSubmit={handleRegistrationSubmit}>
              <Form.Group>
                <Form.Label className="my-2" htmlFor="username">
                  Username
                </Form.Label>
                <Form.Control
                  id="username"
                  type="text"
                  placeholder="username"
                  name="username"
                  value={registrationInput.username}
                  required
                  onChange={handleRegistrationInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="my-2" htmlFor="email">
                  E-mail
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  placeholder="name@domain.com"
                  name="email"
                  value={registrationInput.email}
                  required
                  onChange={handleRegistrationInput}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="my-2" htmlFor="password">
                  Password
                </Form.Label>
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="password"
                  name="password"
                  value={registrationInput.password}
                  required
                  onChange={handleRegistrationInput}
                />
              </Form.Group>
              <Button type="submit" className="mt-3">
                Register
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="login" title="Login">
            <Form className="text-start" onSubmit={handleLoginSubmit}>
              <Form.Group>
                <Form.Label className="my-2" htmlFor="username">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  value={loginInput.username}
                  required
                  onChange={(e) =>
                    setLoginInput({
                      ...loginInput,
                      [e.target.name]: e.target.value
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="my-2" htmlFor="password">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={loginInput.password}
                  required
                  onChange={(e) => {
                    setLoginInput({
                      ...loginInput,
                      [e.target.name]: e.target.value
                    });
                  }}
                />
              </Form.Group>
              <Button type="submit" className="mt-3">
                Login
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Row>
    </>
  );
};

export default Login;
