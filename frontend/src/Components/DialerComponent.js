import React, { useState, useEffect } from 'react';
import '../Styles/Dialer.css'; // Import your stylesheet
import { axiosInstance } from '../util/baseurl';
import Navbar from './GlobalComponent/NavbarComponent/navbarcomponent';
import { useLocation } from 'react-router-dom';

const Dialer = () => {

    const [buttonText, setButtonText] = useState('Send');
    const location = useLocation();
    const { employeeemail, employeephoneNumber } = location.state || {};
    const [message, setMessage] = useState(null);
    const [emailData, setEmail] = useState({
        email: employeeemail,
        subject: "",
        message: ""
    });

    const [phoneNumber, setPhoneNumber] = useState(employeephoneNumber || '');

    useEffect((req, res) => {
        if (message) {
            setTimeout(() => {
                setMessage(null)
            }, 3000);
        }
    })


    const handleChange = (e, field) => {
        if (field === 'phoneNumber') {
            setPhoneNumber(e.target.value);
        } else {
            setEmail((prev) => ({ ...prev, [field]: e.target.value }));
        }
    };

    const handleNumberClick = (number) => {
        setPhoneNumber((prevNumber) => prevNumber + number);
    };

    const handleBackspaceClick = () => {
        setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
    };

    const handleClearClick = () => {
        setPhoneNumber('');
    };

    const handleDialClick = () => {
        if (phoneNumber.length === 10) {
            const telLink = `tel:${phoneNumber}`;
            window.location.href = telLink;
        } else {
            setMessage("Number must have 10 digits for Call")
        }
    };

    const handleWhatsAppClick = () => {
        if (phoneNumber.length === 10) {
            const whatsappLink = `https://wa.me/${phoneNumber}`;
            window.location.href = whatsappLink;
        } else {
       
            setMessage("Number must have 10 digits for WhatsApp.")
        }
    };


    const handleEmailSend = async () => {
        const { email, subject, message } = emailData;
        setButtonText('Sending...');
        try {
            const response = await axiosInstance.post('/api/dialer', {
                email, subject, message
            });

            if (response) {
                setEmail({ email: "", subject: "", message: "" });
                setButtonText('Sended');
                setTimeout(() => {
                    setButtonText("Send")
                }, 3000);

            }
        } catch (error) {
            console.error("Error sending email:", error);
            setButtonText('Send Email');
            setButtonText("Failed to send email");
        }
    };

    const handleKeyDown = (event) => {
        const key = event.key;

        // Check if the active element is the dialer input
        const isDialerInput = document.activeElement.id === 'dialer-input';

        if (!isDialerInput) {
            // If the active element is not the dialer input, do nothing
            return;
        }

        // Handle the key event for the dialer
        if (/[0-9]/.test(key)) {
            event.preventDefault(); // Prevent the key from being entered in the email field
            setPhoneNumber((prevNumber) => prevNumber + key);
        } else if (key === 'Backspace') {
            handleBackspaceClick();
        } else if (key === 'Enter') {
            handleDialClick();
        }
    };


    useEffect(() => {
        const dialerInput = document.getElementById('dialer-input');

        const handleFocus = () => {
            document.addEventListener('keydown', handleKeyDown);
        };

        const handleBlur = () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

        dialerInput.addEventListener('focus', handleFocus);
        dialerInput.addEventListener('blur', handleBlur);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            dialerInput.removeEventListener('focus', handleFocus);
            dialerInput.removeEventListener('blur', handleBlur);
        };
    }, [phoneNumber]);


    return (
        <div>
            <Navbar />
            <div className='dialer-container'>
                <div className='dialermaincontainer'>

                    <div className='onesidedialer'>
                        <h2 className='dialertitle'>DIAL</h2>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => handleChange(e, 'phoneNumber')}
                                id="dialer-input"
                            />

                        </div>
                        <div className="number-buttons">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
                                <button className='dialerbuttons' key={number} onClick={() => handleNumberClick(String(number))}>
                                    {number}
                                </button>
                            ))}
                        </div>
                        <div className="additional-buttons">
                            <button className='dialerbuttons' onClick={handleBackspaceClick}><i className='bx bx-arrow-back '></i></button>
                            <button className='dialerbuttons' onClick={handleClearClick}><i className='bx bx-x'></i></button>
                        </div>


                        <div className="action-buttons">

                            <button className='dialerbuttons' onClick={handleDialClick}  ><i className='bx bx-phone' ></i></button>
                            <button className="whatsapp-button" onClick={handleWhatsAppClick} >
                                <i className='bx bxl-whatsapp'></i>
                            </button>

                        </div>
                        <p>{message}</p>
                    </div>

                    <div className="secondsidemailer">
                        <h2 className='dialertitle'>EMAIL</h2>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={emailData.email}
                            onChange={(e) => handleChange(e, 'email')}
                        />

                        <label>Subject:</label>
                        <input
                            type="text"
                            value={emailData.subject}
                            onChange={(e) => handleChange(e, 'subject')}
                        />
                        <label>Message:</label>
                        <textarea
                            value={emailData.message}
                            onChange={(e) => handleChange(e, 'message')}
                            rows={9}
                        ></textarea>
                        <button onClick={handleEmailSend}>{buttonText}</button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dialer;
