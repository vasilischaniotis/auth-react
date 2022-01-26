import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';
import {Alert, Button, Card, Form} from "react-bootstrap";

export default function Signup() {
    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    let {signup} = useAuth() || {};
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        debugger;

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Passwords do not match!');
            return;
        }

        try {
            setError('');
            setLoading(true);
            await signup({
                name: nameRef.current.value,
                surname: surnameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            debugger;
            setLoading(false);
            navigate("/", {replace: true});
        } catch (e) {
            setError(`Failure during account creation! ${e.message}`);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mt-5 mx-auto min-width-400 max-width-500">
                <Card>
                    <Card.Body>
                        <h4 className="text-center mb-4">Sign up</h4>

                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control ref={nameRef} type="text" required defaultValue={''}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Surname</Form.Label>
                                <Form.Control ref={surnameRef} type="text" required defaultValue={''}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control ref={emailRef} type="email" required defaultValue={''}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={passwordRef} type="password" defaultValue={''}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control ref={passwordConfirmRef} type="password" defaultValue={''}/>
                            </Form.Group>

                            <Button disabled={loading} className="w-100 mt-3" type="submit">Sign up</Button>
                        </Form>

                        <div className="w-100 text-center mt-3">
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>

        </>
    );
}
