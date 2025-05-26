import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import './RegistrationForm.css';
import weddingsIcon from '../images/weddingsIcon.png';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import waze from "../images/waze.png";
import { FaMapMarkedAlt } from "react-icons/fa";
import Footer from './Footer';
import Loader from './Loader';
import invitation from '../images/logo.webp';
import pcBg from '../images/logo.webp';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Skeleton from '@mui/material/Skeleton';



const RegistrationForm = () => {
  const [imgLoading, setImgLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    phoneNumber: '',
    lastName: '',
    arriving: 'כן',
    guestsAmountAdults: 1,
    guestsAmountKids: 0,
    specialDishes: 'ללא מנה מיוחדת',
    notes: '',
  });

  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5400);
  }, []);





  const openMap = () => {
    Swal.fire({
      title: "מפה",
      html: `
        <div>
          <div className="waze-navigation">
            <a href="https://www.waze.com/ul?ll=32.5008331158544, 34.89141508322681&navigate=yes&zoom=17" target="_blank">
              <img src=${waze} alt="Waze" />
              <span>נווט עם וייז</span>
            </a>
          </div>
          <div id="mapSkeleton" class="skeleton-animation" style="background-color: #f0f0f0; width: 600px; height: 400px;"></div>
          <iframe
            id="mapFrame"
            width="600"
            height="400"
            src="https://maps.google.com/maps?q=32.5008331158544, 34.89141508322681&z=17&output=embed"
            style="display: none;"
            onLoad="document.getElementById('mapSkeleton').style.display = 'none'; document.getElementById('mapFrame').style.display = 'block';"
          ></iframe>
        </div>
      `,
      width: 700,
      padding: "1em",
      showConfirmButton: false,
      showCloseButton: true,
      didOpen: () => {
        const mapSkeleton = document.getElementById('mapSkeleton');
        mapSkeleton.style.display = 'block';
      }
    });
  };
  
  
  
  
  // navigate to thank you page
  const navigate = useNavigate();

  const Navigation = () => {
    navigate('/thankyouPage');
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    localStorage.setItem('firstName', formData.firstName);
    e.preventDefault();
  
    if (
      formData.firstName.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.phoneNumber.trim() === ''
    ) {
      // Display an error message if any required field is empty
      Swal.fire({
        html: '<h1>אנא מלאו את כל השדות</h1>',
        icon: 'error',
        confirmButtonText: 'אישור',
      });
      return;
    }
  
    setIsSubmitting(true); // set loading state to true
  
    try {
      const response = await axios.post('https://wedding-api-i272.onrender.com/api/register', {
        firstName: formData.firstName,
        phoneNumber: formData.phoneNumber,
        lastName: formData.lastName,
        arriving: formData.arriving,
        guestsAmountAdults: formData.guestsAmountAdults,
        guestsAmountKids: formData.guestsAmountKids,
        specialDishes: formData.specialDishes,
        notes: formData.notes,
      });
  
      console.log(response.data);
  
      if (formData.arriving === 'כן' && response.data.message === 'Registration successful') {
        Navigation();
      } else if (formData.arriving === 'לא' && response.data.message === 'Registration successful') {
        Swal.fire({
          html: `<h1>תודה רבה ${formData.firstName}</h1>
          <br/>
          <h2>כמה חבל שאתם לא מגיעים
          אבל זכרו שתמיד תוכלו לגשת שוב להזמנה ולעדכן הגעה</h2>`,
          icon: 'success',
          confirmButtonText: 'אישור',
        });
      } else if (response.data.message === 'Registration failed') {
        Swal.fire({
          html: `<h1>ההרשמה נכשלה</h1>
          <br/>
          <h2>אנא נסו שוב</h2>`,
          icon: 'error',
          confirmButtonText: 'אישור',
        });
      }
  
      // Reset form fields
      setFormData({
        firstName: '',
        phoneNumber: '',
        lastName: '',
        arriving: 'כן',
        guestsAmountAdults: 1,
        guestsAmountKids: 1,
        specialDishes: 'ללא מנה מיוחדת',
        notes: '',
      });
    } catch (error) {
      console.log('err' + error);
      Swal.fire({
        html: `<h1>ההרשמה נכשלה</h1>
        <br/>
        <h2>אנא נסו שוב</h2>`,
        icon: 'error',
        confirmButtonText: 'אישור',
      });
    } finally {
      setIsSubmitting(false); 
    }
  };



  
  
const pcBgImage = <img src={pcBg} className="App-logo" alt="Invitation" onLoad={() => setImgLoading(false)}/>;

const mobileBgImage = <img src={invitation} className="App-logo" alt="Invitation" onLoad={() => setImgLoading(false)}/>;

  return (
    <>
      {loading ? (
        <Loader /> 
      ) : (
    
      <div className="background">
                <div className="invitationContainer">
                    <div className="invitation pcBg">
                    {
                      imgLoading ? (
                        <Skeleton variant="rectangular" animation="wave">
                          {pcBgImage}
                        </Skeleton>
                      ) : (
                        pcBgImage
                      )
                    }     
                    </div>
                  <div className="invitation mobileBg">
                  {
                      imgLoading ? (
                        <Skeleton variant="rectangular" animation="wave">
                          {mobileBgImage}
                        </Skeleton>
                      ) : (
                        mobileBgImage
                      )
                    }
                  </div>
              </div>

              <div className="container" onClick={scrollToForm}>
                <div className="field">
                  <div className="scroll"></div>
                </div>
              </div>
              
              <form className="Form" ref={formRef}>
                <div className="segment">
                  <h1 className="mainHeader">אישור הגעה</h1>
                  <h2>נשמח לראותכם בין אורחינו</h2>
                </div>
                <br />
                <section className="formSection">
                  <label className="firstName">
                    <input
                      className="firstName"
                      placeholder="שם פרטי"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <br />
                  <label className="lastName">
                    <input
                      className="lastName"
                      placeholder="שם משפחה"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <br />
                </section>
                <label className="phoneNumber">
                  <input
                    placeholder="מספר נייד"
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  מגיעים לאירוע?
                  <select
                  className='unit'
                    name="arriving"
                    value={formData.arriving}
                    onChange={handleChange}
                  >
                    <option value="כן">כן</option>
                    <option value="לא">לא</option>
                  </select>
                </label>
                <br />





                <div className="guestsAmountAdults">
                  <label htmlFor="guestsAmountAdults">כמה מבוגרים?</label>
                  <div className="guestsControls">
                    <button
                      className="unit"
                      type="button"
                      onClick={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          guestsAmountAdults: parseInt(prevData.guestsAmountAdults) + 1,
                        }))
                      }
                    >
                      <FaPlus />
                    </button>
                    <input
                      id="guestsAmountAdults"
                      name="guestsAmountAdults"
                      value={formData.guestsAmountAdults}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="unit"
                      type="button"
                      onClick={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          guestsAmountAdults: Math.max(parseInt(prevData.guestsAmountAdults) - 1, 1),
                        }))
                      }
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <br />





                <div className="guestsAmountKids">
                  <label htmlFor="guestsAmountKids">כמה ילדים?</label>
                  <div className="guestsControls">
                    <button
                      className="unit"
                      type="button"
                      onClick={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          guestsAmountKids: parseInt(prevData.guestsAmountKids) + 1,
                        }))
                      }
                    >
                      <FaPlus />
                    </button>
                    <input
                      id="guestsAmountKids"
                      name="guestsAmountKids"
                      value={formData.guestsAmountKids}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="unit"
                      type="button"
                      onClick={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          guestsAmountKids: Math.max(parseInt(prevData.guestsAmountKids) - 1, 0),
                        }))
                      }
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <br />

                <label>
                  מנה מיוחדת?
                  <br />
                  <select
                  className='unit specialDishes'
                    name="specialDishes"
                    value={formData.specialDishes}
                    onChange={handleChange}
                  >
                    <option value="ללא מנה מיוחדת">ללא מנה מיוחדת</option>
                    <option value="צמחוני">צמחוני</option>
                    <option value="טבעוני">טבעוני</option>
                    <option value="ללא גלוטן">ללא גלוטן</option>
                    <option value="טבעוני + ללא גלוטן">טבעוני + ללא גלוטן</option>
                  </select>
                </label>
                <br />


                
                

                <br />

                

                <label className='heart-logo'>
                ברכה לכלה והחתן          
                <span className="heart ">❤️</span>
                </label>
                <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                <div className="moreInfo">
                <LoadingButton 
                    sx={{
                      borderRadius: '100px',
                      textShadow: '1px 1px 0 #FFF',
                      backgroundColor: '#EBECF0',
                      '& .MuiLoadingButton-loadingIndicator': { 
                        color: '#cf4f4f',
                        position: 'inherit'
                      }
                    }}
                    onClick={handleSubmit} 
                    loading={isSubmitting} 
                    loadingPosition="start" 
                    startIcon={<SendIcon />} 
                    className='red'
                    id="submitBtn" 
                    type="button" 
                  >
                    שלח
                  </LoadingButton>


                    <LoadingButton
                      sx={{
                        borderRadius: '100px',
                        textShadow: '1px 1px 0 #FFF',
                        backgroundColor: '#EBECF0',
                      }}

                    onClick={openMap}
                     className='red'
                      id="submitBtn"
                       type="button"
                       >

                      <FaMapMarkedAlt />
                      מפת הגעה
                    </LoadingButton>
                    
                    
                  </div>

              

              </form>
            
                 
          

              <Footer />
      </div>
    
      )}
    </>
  );
};



export default RegistrationForm;