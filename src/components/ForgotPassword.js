import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';
import {Alert, Button, Card, Form} from "react-bootstrap";

export default function ForgotPassword() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
        } catch (e) {
            setError('Failure during password reset!');
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mt-5 mx-auto min-width-400 max-width-500">
                <Card>
                    <Card.Body>
                        <h4 className="text-center mb-4">Password Reset</h4>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {/*{message && <Alert variant="success">{message}</Alert>}*/}


                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control ref={emailRef} type="email" required/>
                            </Form.Group>
                            <Button disabled={loading} className="w-100 mt-3" type="submit">Reset Password</Button>
                        </Form>

                        <div className="w-100 text-center mt-3">
                            <Link to="/login">Login</Link>
                        </div>
                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
            </div>
        </>
    );
}
