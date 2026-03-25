import { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownButton,
  DropdownToggle,
  Image
} from 'react-bootstrap/';

const UserProfile = (props) => {
  //PROPS
  const token = props.token
  const onLogout = props.onLogout
  //USESSTATE
  const [user, setUser] = useState({});

  console.log(token, user);

  const fetchUserProfile = (token) => {
    fetch('http://localhost:3001/users/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Errore nel recupero del profilo');
      }
      return response.json();
    })
    .then(userData => {
      console.log("Dati utente ricevuti:", userData);
      setUser(userData)
    })
    .catch(error => {
      console.error("Si è verificato un problema:", error);
    });
  }

  useEffect(() => {
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => 
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
        setUser(JSON.parse(jsonPayload));
      } catch (e) {
        console.error("Token non valido", e);
      }
    }
  }, [token]);

  useEffect(() => fetchUserProfile(token), [])

  console.log(user.sub);
  
  return (
    <>
      <Dropdown>
        <DropdownToggle
          id="user-profile"
          title="Dropdown button"
          className="bg-transparent border border-0"
        >
          <Image
            src={user.profileImage}
            height={60}
            roundedCircle
            className=" border border-3 border-primary p-1"
          />
        </DropdownToggle>
        <Dropdown.Menu className="">
          <Dropdown.Item >{user.username}</Dropdown.Item>
          <Dropdown.Item >{user.email}</Dropdown.Item>
          <Dropdown.Item onClick={onLogout} className='text-light bg-danger'>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default UserProfile;
