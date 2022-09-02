import React, { useEffect, useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { changePassword } = useAuth()
    const [error, setError] = useState({
        message: '',
        variant: '',
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError({ message: 'Passwords do not match', variant: 'warning' })
        }
        else {
            if (passwordRef.current.value.length === 0) {
                navigate('/')
            }
        }
        if (passwordRef.current.value === currentUser.password) {
            return setError({ message: 'New password must be different from old password', variant: 'warning' })
        }
        try {
            setError('')
            setLoading(true)
            await changePassword(currentUser, passwordRef.current.value)
            setError({
                message: 'Password updated successfully',
                variant: 'success',
            })
            navigate('/');
            emailRef.current.value = '';
            passwordRef.current.value = '';
            passwordConfirmRef.current.value = '';
        }
        catch (error) {
            setError({
                message: 'Failed to update password',
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
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {error.message && <Alert onClose={() => setError({ message: '', variant: '' })} dismissible variant={error.variant}>{error.message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className="mb-3" type="email" ref={emailRef} required defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-3" type="password" ref={passwordRef} placeholder="Leave blank to keep the password same" />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control className="mb-3" type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the password same" />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type='submit'>Confirm Changes</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Link to='/'>Cancel Changes</Link>
            </div>
        </>
    )
}
