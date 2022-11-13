import { Col, Button, Row, Container, Card, Form, Alert } from "react-bootstrap";
import React, { useState, useCallback } from "react";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { firebase } from "../config";

const Login = () => {
    const [error, setError] = useState('')
    const [credentials, setCredentials] = useState({email: '', password: ''})
    const updateCredentials = useCallback(
        (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setCredentials({...credentials, [type]: event.target.value})
        }, [credentials]
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        const auth = getAuth(firebase)
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .catch((e) => {
                
                switch (e.code) {
                    case 'auth/wrong-password':
                        setError('I am 4 parallel universes ahead of you.')
                        break

                    case 'auth/user-not-found':
                        setError('New phone who dis')
                        break
                }
            })
    }

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4 mb-2">
                                <h2 className="fw-bold mb-2 text-uppercase text-center">
                                    💸 B O U L A I S S E S 💸
                                </h2>
                                <div className="mb-3">
                                    <Form onSubmit={handleSubmit}>
                                        {
                                            error !== '' && 
                                            <Alert variant="danger">
                                                {error}
                                            </Alert>

                                        }
                                        
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                onChange={updateCredentials('email')}
                                                value={credentials.email}
                                            />
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control 
                                                type="password"
                                                placeholder="Password"
                                                onChange={updateCredentials('password')}
                                                value={credentials.password}
                                            />
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" type="submit">
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login