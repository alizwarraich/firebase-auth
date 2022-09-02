import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState({
        message: '',
        variant: '',
    })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(auth, emailRef.current.value, passwordRef.current.value)
            setError({
                message: 'Signed in successfully',
                variant: 'success',
            })
            navigate('/')
            emailRef.current.value = '';
            passwordRef.current.value = '';
        }
        catch (error) {
            setError({
                message: 'Failed to sign in',
                variant: 'danger'
            })
            console.log(error.message)
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {/* {auth.currentUser && <h2 className='text-center'>{auth.currentUser.email}</h2>} */}
                    {error.message && <Alert onClose={() => setError({ message: '', variant: '' })} dismissible variant={error.variant}>{error.message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-3" type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-3" type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button disabled={loading} className="w-100 mt-3" type='submit'>Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'>Signup</Link>
            </div>
        </>
    )
}

export default Login