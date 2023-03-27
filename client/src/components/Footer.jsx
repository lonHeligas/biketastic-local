import { Container, Row, Col } from 'react-bootstrap';
import { useAppCtx } from "../utils/AppContext";





const Footer = () => {
  const { user, logout } = useAppCtx();
  return (
    <footer className="text-white pt-2">
      <div className="container">
        <div className="row">


        {!user ? (
         <>
          <div className="col-3">
            <a href="https://www.termsfeed.com/live/08ebf8e5-8114-459e-914c-1e2c3ed4b2d1" className="text-white">Privacy Policy</a>
          </div>
          <div className="col-3">
            <a href="#" className="text-white">Terms and Conditions</a>
          </div>
          <div className="col-3">
            <a href="/login" className="text-white">Login</a>
          </div>
          <div className="col-3">
            <a href="/signup" className="text-white">Sign Up</a>
          </div>
          </>
        ) : (
          <>
          <div className="col-4">
            <a href="https://www.termsfeed.com/live/08ebf8e5-8114-459e-914c-1e2c3ed4b2d1" className="text-white">Privacy Policy</a>
          </div>
          <div className="col-4">
            <a href="#" className="text-white">Terms and Conditions</a>
          </div>
          <div className="col-4">
            <a href="/" onClick={logout} className="text-white">Logout</a>
          </div>
          </> 
        )}
        </div>

        <div className="row mt-2">
          <p className="text-center">&copy; Biketastic 2023. All rights reserved.</p>
        </div>

      </div>

    </footer>

  );

}

export default Footer;