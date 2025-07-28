import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      navigate('/dashboard'); // or homepage
    }
  }, []);

  return <p>Logging you in...</p>;
}

export default GoogleSuccess;
