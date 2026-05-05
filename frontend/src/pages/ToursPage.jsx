import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ToursPage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tours');
      setTours(response.data.data);
    } catch (err) {
      setError('Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <p>Loading tours...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>🌏 Tours</h2>
        <div>
          <span>Welcome, {user?.name}! </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {tours.length === 0 ? (
        <p>No tours available</p>
      ) : (
        tours.map((tour) => (
          <div
            key={tour.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '8px',
            }}
          >
            <h3>{tour.title}</h3>
            <p>{tour.description}</p>
            <p>💰 Price: {tour.price} THB</p>
            <p>
              🪑 Available Seats: {tour.available_seats}/{tour.max_seats}
            </p>
            <p>📅 Type: {tour.type}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ToursPage;
