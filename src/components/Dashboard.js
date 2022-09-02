import React, { useState, useEffect } from 'react'
import { Card, Alert, Button } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const { currentUser, logout } = useAuth()

    useEffect(() => {
        if (!currentUser) {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [currentUser])

    const [error, setError] = useState({
        message: '',
        variant: '',
    })

    async function handleLogout() {
        try {
            await logout()
            navigate('/login')
        } catch (error) {
            setError({
                message: 'Failed to logout',
                variant: 'danger'
            })
            console.log(error)
        }
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error.message && <Alert onClose={() => setError({ message: '', variant: '' })} dismissible variant={error.variant}>{error.message}</Alert>}
                    <strong>Email: </strong>{currentUser && currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
            </div>
        </>
    )
}

export default Dashboard