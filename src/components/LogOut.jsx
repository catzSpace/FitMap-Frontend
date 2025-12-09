import './css/LogOut.css'

function LogOut() {
    const handleLogout = async () => {

        const token = localStorage.getItem('token');

        if (!token) {
            setMessage('No hay sesión activa');
            return;
        }

        try {
            localStorage.removeItem('token');
            localStorage.removeItem('rol');
            localStorage.removeItem('user');
            localStorage.removeItem('selectedSport');

            window.location.href = '/login';
        } catch (error) {
            alert('Error al cerrar sesión');
        }
    };

  return (
        <button className="logout-btn" onClick={() => handleLogout()}>
            <p>Cerrar Sesion</p>
        </button>
  );
};

export default LogOut;