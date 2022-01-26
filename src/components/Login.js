import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';
import {Alert, Button, Card, Form} from "react-bootstrap";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);

            setLoading(false);
            navigate("/", {replace: true});
        } catch (e) {
            setError(`Failure during signing in! ${e.message}`);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mt-5 mx-auto min-width-400 max-width-500">
                <Card>
                    <Card.Body>
                        <h4 className="text-center mb-4">Login</h4>

                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required/>
                            </Form.Group>

                            <Button disabled={loading} className="w-100 mt-3" type="submit">Log In</Button>
                        </Form>

                        <div className="w-100 text-center mt-3">
                            <Link to="/forgot-password">Forgot password?</Link>
                        </div>

                    </Card.Body>
                </Card>

                <div className="w-100 text-center mt-2">Don't have an account? <Link to="/signup">Sign up</Link></div>
            </div>
        </>
    );
}
