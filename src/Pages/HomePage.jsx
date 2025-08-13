import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { addFeedbackApi } from "../services/allApi";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [rating, setRating] = useState("");
  const [comments, setComment] = useState("");
  console.log(rating, comments);
  const [token, setToken] = useState([])
  const [username, setUsername] = useState('');

  const handleReset = () => {
    setRating("");
    setComment("");
  };

  const handleSubmit = async () => {
    if (!rating || !comments) {
      alert('Please fill the fields completely')
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`

      };

      const reqBody = {
        rating,
        comments
      };

      try {
        const result = await addFeedbackApi(reqBody, reqHeader);
        console.log(result);

        if (result.status === 401) {
          toast.info(result.response.data);
        } else if (result.status === 200) {
          toast.success(`${result.data.sentiments}`);
          handleReset();
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        toast.error('Server error');
        console.error(error);
      }
    }
  }

   const navigate = useNavigate()
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('token')
        navigate('/')
    }

  useEffect(() => {
  const storedName = localStorage.getItem('username');
  console.log("Stored username in localStorage:", storedName); // Debug line
  if (storedName) {
    setUsername(storedName);
  }
  if (sessionStorage.getItem("token")) {
    setToken(sessionStorage.getItem("token"));
  }
}, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navbar */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center shadow-2xl py-4 px-6 sm:px-20 bg-amber-300 gap-4 sm:gap-0">
        <div className="flex items-center gap-2 font-bold text-blue-900">
          <img src="/Icon.png" alt="MindTone Logo" className="w-8 h-8" />
          <span>MindTone</span>
        </div>
        <nav className="flex gap-4">
          <div onClick={logout} className="text-gray-900 ">Sign out</div>
         
        </nav>
      </header>

      {/* Main Content */}
      <main className="mt-8 px-6 sm:px-20">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="text-lg">
          Welcome, <span className="text-blue-900 font-bold">{username}</span>
        </p>

        <div className="mt-6 flex flex-col lg:flex-row gap-6">
          {/* Add Feedback */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1 min-w-full lg:min-w-[280px]">
            <h2 className="text-xl font-semibold">Add Feedback</h2>
            <form className="mt-4">
              <label className="block mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4"
              >
                <option value="" disabled>
                  Select
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <label className="block mb-1">Comment</label>
              <textarea
                value={comments}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 h-20 mb-4"
              ></textarea>

              <button onClick={handleSubmit}
                type="button"
                className="w-full bg-yellow-300 hover:bg-yellow-200 text-gray-900 font-semibold py-2 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1 min-w-full lg:min-w-[280px]">
            <h2 className="text-xl font-semibold">Recent Feedback</h2>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</div>
                <p className="mt-1">The sign-up process was easy and quick.</p>
                <span className="text-green-600 font-semibold">Positive</span>
              </div>
              <hr />
              <div>
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐</div>
                <p className="mt-1">The interface is quite user-friendly and intuitive.</p>
                <span className="text-gray-500 font-semibold">Neutral</span>
              </div>
              <hr />
              <div>
                <div className="text-yellow-400 text-lg">⭐⭐⭐</div>
                <p className="mt-1">
                  I'm <span className="font-semibold">very</span> disappointed with the recent changes.
                </p>
                <span className="text-red-600 font-semibold">Negative</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ToastContainer theme="colored" position="top-center" autoClose={2000} />
    </div>

  );
}

export default HomePage;
