import React, {useRef, useState} from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try{
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
        }
        catch(error){
            setError('Failed to create an account')
        }
        setLoading(false)
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Signup</h2>
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
                        <Form.Control className="mb-3" type="password" ref={passwordConfirmRef} required placeholder="Reenter password" />
                    </Form.Group>
                    <Button className="w-100 mt-3" type='submit'>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>   
        <div className='w-100 text-center mt-2'>
            Already have an account? <a href='/login'>Login</a>
        </div>
    </>
  )
}

export default Signup