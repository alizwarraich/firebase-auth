import React, { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState({
        message: '',
        variant: '',
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(auth, emailRef.current.value)
            setError({
                message: 'Check your inbox for a reset link',
                variant: 'success',
            })
            emailRef.current.value = '';
        }
        catch (error) {
            setError({
                message: 'Failed to reset password',
                variant: 'danger'
            })
            // console.log(error.message)
        }
        setLoading(false)
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {/* {auth.currentUser && <h2 className='text-center'>{auth.currentUser.email}</h2>} */}
                    {error.message && <Alert onClose={() => setError({ message: '', variant: '' })} dismissible variant={error.variant}>{error.message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-3" type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type='submit'>Reset Password</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        Back to <Link to='/login'>Login</Link> page
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to='/signup'>Signup</Link>
            </div>
        </>
    )
}
