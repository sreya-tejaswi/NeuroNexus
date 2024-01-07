import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate,Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [isActive, setIsActive] = useState('');

    console.log(email);
    console.log(password1);
    console.log(password2);

    function registerUser(e) {

        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
        //fetch('http://localhost:4000/users/checkEmail', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        })
        .then(res => res.json())
        .then(data => {

            console.log(data);

            if(data === true){

                Swal.fire({
                    title: 'Duplicate email found',
                    icon: 'error',
                    text: 'Please provide a different email.'   
                });

            } else {

                fetch(`${ process.env.REACT_APP_API_URL }/users/register`, {
                //fetch('http://localhost:4000/users/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        mobileNo: mobileNo,
                        password: password1
                    })
                })
                .then(res => res.json())
                .then(data => {

                    console.log(data);

                    if(data === true){

                        // Clear input fields
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setMobileNo('');
                        setPassword1('');
                        setPassword2('');

                        Swal.fire({
                            title: 'Registration successful',
                            icon: 'success',
                            text: 'Thank you for registering!'
                        });

                        navigate("/products");

                    } else {

                        Swal.fire({
                            title: 'Something wrong',
                            icon: 'error',
                            text: 'Please try again.'   
                        });

                    };

                })
            };

        })

    }

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if((firstName !== '' && lastName !== '' && email !== '' && password1 !== '' && password2 !== '') && (password1 === password2)){
            setIsActive(true);
        } else {
            setIsActive(false);
        }

    }, [firstName, lastName, email, mobileNo, password1, password2]);

    return (
        (user.id !== null) ?
            <Navigate to="/products" />
        :
            <Form onSubmit={(e) => registerUser(e)}>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter first name"
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter last name"
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="mobileNo">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Mobile Number"
                        value={mobileNo} 
                        onChange={e => setMobileNo(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password1} 
                        onChange={e => setPassword1(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password2">
                    <Form.Label>Verify Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Verify Password"
                        value={password2} 
                        onChange={e => setPassword2(e.target.value)}
                        required
                    />
                </Form.Group>

                { isActive ? 
                    <Button variant="primary" type="submit" id="submitBtn">
                        Submit
                    </Button>
                    : 
                    <Button variant="danger" type="submit" id="submitBtn" disabled>
                        Submit
                    </Button>
                }
            </Form>
    )
    
}
