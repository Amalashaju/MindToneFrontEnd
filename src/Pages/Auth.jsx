import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginApi, registerApi } from '../services/allApi';


function Auth({ register }) {

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: ""
    })
    console.log(userDetails);
    const navigate = useNavigate()

    const handleRegister = async () => {
        console.log("inside register function");

        const { username, email, password } = userDetails
        if (!username || !email || !password) {
            toast.info('please fill the details')
        }
        else {
            const result = await registerApi({ username, email, password })
            console.log(result);
            if (result.status == 200) {
                toast.success('Register successful')
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else if (result.status == 409) {
                toast.warning(result.response.data)
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
            else {
                toast.error('Something went wrong')
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
            }
        }

    }

    const handleLogin = async () => {
        const { email, password } = userDetails
        if (!email || !password) {
            toast.info('please enter the complete details')
        }
        else {
            const result = await loginApi({ email, password })
            console.log(result);

            if (result.status == 200) {
                toast.success('login successfull')
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token", result.data.token)
                navigate('/home-page')

            }
            else if (result.status == 401) {
                toast.warning(result.response.data);
                setUserDetails({
                    username: "",
                    email: "",
                    password: "",
                });
            }

            else if (result.status == 404) {
                toast.warning(result.response.data);
                setUserDetails({
                    username: "",
                    email: "",
                    password: "",
                });
            }

            else {
                toast.error("Something went wrong");
                setUserDetails({
                    username: "",
                    email: "",
                    password: "",
                });
            }
        }
    }
    return (
        <>
            <nav className="flex justify-between items-center p-6 shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">💭</span>
                    </div>
                    <h1 className="text-xl font-semibold text-blue-900">MindTone</h1>
                </div>
                <div className="flex items-center justify-between gap-6 text-gray-700">
                    <div className="flex gap-8">
                       <Link to={'/'}> <div className="hover:text-blue-700">Home</div></Link>
                    </div>
                    <Link to={'/login'}>
                        <button className="px-4 py-1 border border-blue-700 text-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition">
                            Sign in
                        </button>
                    </Link>
                </div>
            </nav>
            <div
                className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-blue-50 "
            >
                <div className=' md:w-full max-w-md shadow-md bg-white p-8  rounded-xl'>
                    <div className='flex justify-center items-center'>
                        <img src="/Icon.png" alt="" width={"50px"} height={"50px"} />
                        <h1 className='text-center font-bold text-2xl mb-4 mt-4' style={{ color: '#1E3A8A' }}> MindTone</h1>
                    </div>
                    {register ? <h1 className='text-gray-600 text-center font-semibold  text-3xl mb-4 mt-4 ' >Registration</h1> :
                        <h1 className='text-gray-600 text-center font-semibold text-3xl mb-4 mt-4' >Login</h1>}
                    {register && <div className='m-3'>
                        <label className='text-gray-600 text-sm font-semibold'>Username</label>
                        <input type="text" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} className='w-full border rounded-lg focus:outline-none focus:ring-2  px-4 py-2 ' />
                    </div>}
                    <div className='m-3'>
                        <label className='text-gray-600 text-sm font-semibold'>Email</label>
                        <input type="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className='w-full border rounded-lg focus:outline-none focus:ring-2  px-4 py-2' />
                    </div>
                    <div className='m-3'>
                        <label className='text-gray-600 text-sm font-semibold'>Password</label>
                        <input type="password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className='w-full border rounded-lg focus:outline-none focus:ring-2  px-4 py-2' />
                    </div>

                    <div className='m-3 '>
                        {register ? <button onClick={handleRegister} className=' w-full rounded-lg text-white px-4 py-2' style={{ backgroundColor: '#1E3A8A' }}>Register</button> :
                            <button onClick={handleLogin} className=' w-full rounded-lg text-white px-4 py-2' style={{ backgroundColor: '#1E3A8A' }}>Login</button>}
                    </div>

                    {register ? <h3 className='text-center'>Already have an account? <Link to={'/login'}><span className=' font-bold ' style={{ color: '#1E3A8A' }} >Login</span></Link></h3> :
                        <h3 className='text-center'>Are you a new user? <Link to={'/register'}><span className=' font-bold' style={{ color: '#1E3A8A' }}>Register</span></Link></h3>
                    }
                </div>


            </div>
            <ToastContainer theme="colored" position="top-center" autoClose={2000} />

        </>
    )
}

export default Auth
