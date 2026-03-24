import { Row, Col, Tabs, Tab, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate()

  const [registrationInput, setRegistrationInput] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });

  const handleRegistrationInput = function (e) {
    setRegistrationInput({...registrationInput,[e.target.name]: e.target.value});
    console.log('valore registrato', e.target.value);
  };

  const regLoginFetch = function(endpoint, method, data) {
    fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error during registration.')
      }
      return response.json();
    })
    .then(data => {
      if (data.accessToken) {
        const token = data.accessToken;
        localStorage.setItem('token', token);
        console.log("Login completed.", token);
        navigate('/home')
    } else {
      console.log("Registration completed.", data);
    }})
    .catch(error => {console.error(error);
    })
  }
  

  const handleRegistrationSubmit = async function (e) {
    e.preventDefault();
    const registration = {
      username: registrationInput.username,
      email: registrationInput?.email,
      password: registrationInput.password

    };

    regLoginFetch('http://localhost:3001/auth/registration', 'POST', registration);
    
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
        username: '',
        email: loginInput.email,
        password: loginInput.password
    };

    regLoginFetch('http://localhost:3001/auth/login', 'POST', login)
    
    setLoginInput({
      username: '',
      email: '',
      password: ''
    });
    
    console.log('Dati di accesso inviati.');
    
    return login
  }


  return (
    <Container className="d-flex justify-content-center row-cols-1 row-cols-md-2 flex-wrap p-0 m-0">
      <Row className="border border-3 rounded rounded-3 shadow mt-3 py-1 pb-3">
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
                <Form.Label className="my-2" htmlFor="email">
                  E-mail
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="E-mail"
                  name="email"
                  value={loginInput.email}
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
    </Container>
  );
};

export default Login;
