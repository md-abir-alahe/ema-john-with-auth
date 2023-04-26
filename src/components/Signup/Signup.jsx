import React, { useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [error, setError] = useState('');

    const handleSignUp = (event) =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirmPass.value;
        console.log(email, password, confirmPass)

        if(password !== confirmPass){
            setError('confirm password did not match');
            return;
        }
        else if(password.length < 6){
            setError('password must be 6 characters or longer');
            return;
        }
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Please Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirmPass" id="" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to={`/login`}>Login</Link></small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default Signup;