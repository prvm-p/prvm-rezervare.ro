import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
// import './OTPValidation.css'; // Create this file for custom styling if needed
import Navbar from './Navbar';
import Footer from './Footer';

const OTPValidation = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    sendOtpEmail();
    // navigate('/payment-receipt'); // Navigate to the payment receipt page
  };

  const sendOtpEmail = () => {
    const templateParams = {
      otp,
    };

    emailjs.send(
        'service_e234qa4', // Replace with your service ID
      'template_f0nymc7', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });
  };

  return (
    <div>
    <Navbar />
    <div className="container d-flex justify-content-center">
      <div className="col-md-6 mt-5">
        <h2 className="mt-5">Formular de plată</h2>
        <p>Veți primi chitanța de plată după acest pas;</p>
        <p>Introduceți codul OTP corect trimis către dvs.</p>
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group">
            <input
            //   type="text"
              className="form-control"
              placeholder="Introduceți OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">URMĂTORUL</button>
        </form>
        <p className="mt-3">Veți primi codul în curând</p>
        <p class="fs-5">Chitanța de plată confirmă rezervarea dvs. Vă rugăm să o păstrați ca dovadă de platii.</p>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default OTPValidation;
