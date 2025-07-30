import { useEffect } from 'react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const GithubSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const email = query.get("email");

    if (token) {
      localStorage.setItem("token", token);
      alert(`Welcome ${email}!`);
      navigate('/dashboard'); // or wherever you want to go
    } else {
      alert("GitHub login failed");
      navigate('/login');
    }
  }, []);

  return <p>Logging you in with GitHub...</p>;
};

export default GithubSuccess;
