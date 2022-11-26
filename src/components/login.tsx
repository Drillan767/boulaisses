import { Col, Button, Row, Container, Card, Form, Alert } from 'react-bootstrap'
import React, { useState } from 'react'
import useAuthStore from '../stores/auth'

const Login = () => {

    const [login, loginError] = useAuthStore((state) => [state.login, state.loginError])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('coucou')
        e.preventDefault()
        login({email, password})
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
                                    <Form onSubmit={submit}>
                                        {
                                            loginError !== '' && 
                                                <Alert variant="danger" className='mt-4'>
                                                    {loginError}
                                                </Alert>
                                        }

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
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
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
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