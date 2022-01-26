import React, {useRef, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from '../contexts/AuthContext';
import {Alert, Button, Card, Form, OverlayTrigger, Tooltip} from "react-bootstrap";

export default function ProfileUpdate() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setError('Passwords do not match!');
            return;
        }

        setError('');
        setLoading(true);

        const updatePromises = [];
        debugger;
        if (emailRef.current.value !== currentUser.email) {
            updatePromises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            updatePromises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(updatePromises).then(function (promises) {
            debugger;
            setLoading(false);
            navigate("/", {replace: true});
            // navigate.push("/");
        }).catch(function (error) {
            debugger;
            setError(`Failure during account update! ${error.message}`);
            setLoading(false);
        });
    }

    return (
        <>
            <div className="mt-5 mx-auto min-width-400 max-width-500">
                <Card>
                    <Card.Body>
                        <h4 className="text-center mb-4">Update Profile</h4>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 150, hide: 400}}
                                        overlay={
                                            <Tooltip>
                                                Unchanged email will not be updated!
                                            </Tooltip>
                                        }
                                    ><span>Email</span></OverlayTrigger>
                                </Form.Label>
                                <Form.Control ref={emailRef} type="email" required defaultValue={currentUser.email}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control ref={passwordRef} type="password" defaultValue={currentUser.PASSWORD}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control ref={passwordConfirmRef} type="password" defaultValue={''}/>
                            </Form.Group>

                            <Button disabled={loading} className="w-100 mt-3" type={"submit"}>Update</Button>

                            <Link to="/">
                                <Button disabled={loading} className="w-100 mt-3 btn-danger">Cancel</Button>
                            </Link>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}
