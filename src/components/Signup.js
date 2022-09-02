import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(auth, emailRef.current.value, passwordRef.current.value)
            setError({
                message: 'Account created successfully',
                variant: 'success',
            })
            navigate('/');
            emailRef.current.value = '';
            passwordRef.current.value = '';
            passwordConfirmRef.current.value = '';
        }
        catch (error) {
            setError({
                message: 'Failed to create an account',
                variant: 'danger',
            })
            console.log(error.message)
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Signup</h2>
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
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control className="mb-3" type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type='submit'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </>
    )
}

export default Signup