import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './DataPage.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from './Footer';
import Nav from './Nav';
import { FaPlus, FaMinus } from 'react-icons/fa';

const DataPage = () => {
  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    kids: 0,
    no: 0,
    maybe: 0,
    normal: 0,
    vegetarian: 0,
    vegan: 0,
    glutenFree: 0,
    glutenFreeVegan: 0
  });

  const [data, setData] = useState([]);
  const tableContainer = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://wedding-api-i272.onrender.com/api/data');
        const data = result.data;

        const arrivingGuestsAdults = data.filter((item) => item.arriving === 'כן');
        const guestsAmountAdults = arrivingGuestsAdults.reduce((acc, item) => acc + (+item.guestsAmountAdults), 0);

        const arrivingGuestsKids = data.filter((item) => item.arriving === 'כן');
        const guestsAmountKids = arrivingGuestsKids.reduce((acc, item) => acc + (+item.guestsAmountKids), 0);

        const notArrivingGuests = data.filter((item) => item.arriving === 'לא');
        const guestsAmountNo = notArrivingGuests.length;

        const maybeArrivingGuests = data.filter((item) => item.arriving === 'אולי');
        const guestsAmountMaybe = maybeArrivingGuests.length;

        const normalAmount = data.filter((item) => item.specialDishes === 'ללא מנה מיוחדת').length;
        const vegetarianAmount = data.filter((item) => item.specialDishes === 'צמחוני').length;
        const veganAmount = data.filter((item) => item.specialDishes === 'טבעוני').length;
        const glutenFreeAmount = data.filter((item) => item.specialDishes === 'ללא גלוטן').length;
        const glutenFreeVeganAmount = data.filter((item) => item.specialDishes === 'טבעוני + ללא גלוטן').length;

        setGuestCounts({
          adults: guestsAmountAdults,
          kids: guestsAmountKids,
          no: guestsAmountNo,
          maybe: guestsAmountMaybe,
          normal: normalAmount,
          vegetarian: vegetarianAmount,
          vegan: veganAmount,
          glutenFree: glutenFreeAmount,
          glutenFreeVegan: glutenFreeVeganAmount
        });

        setData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteData = async (id) => {
    try {
      Swal.fire({
        title: 'אתם בטוחים?',
        text: "בוודעות אתם מעוניינים למחוק?",
        icon: 'warning',
        padding: '2em',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ביטול',
        confirmButtonText: 'כן, מחק אותי!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('נמחק!', 'המידע נמחק בהצלחה', 'success');
          axios.delete(`https://wedding-api-i272.onrender.com/api/data/${id}`);
          const newData = data.filter((item) => item._id !== id);
          setData(newData);
        }
      });
    } catch (error) {
      console.error('Failed to delete data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const showNote = (item) => {
    Swal.fire({
      html: `<h1>${item.firstName}</h1><br/><h2>${item.notes}</h2>`,
      icon: 'info',
      padding: '2em',
      showConfirmButton: false,
      showCloseButton: true
    });
  };

  const switchH = () => {
    if (tableContainer.current) {
      const h1_1 = document.getElementById('h1-1');
      const h1_2 = document.getElementById('h1-2');
      if (h1_1.style.display === 'none') {
        h1_1.style.display = 'block';
        h1_2.style.display = 'none';
      } else {
        h1_1.style.display = 'none';
        h1_2.style.display = 'block';
      }
      tableContainer.current.style.display = tableContainer.current.style.display !== 'none' ? 'none' : 'block';
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div>
        <Nav />
        <div className="data-page">
          <ol>
            <li>
              <div className="icon"><i className="fa-regular fa-rings-wedding"></i></div>
              <div className="title">סה"כ מוזמנים:</div>
              <div className="descr">{data.length}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-sharp fa-regular fa-face-tongue-money"></i></div>
              <div className="title">סה"כ מבוגרים:</div>
              <div className="descr">{guestCounts.adults}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-sharp fa-regular fa-child"></i></div>
              <div className="title">סה"כ ילדים:</div>
              <div className="descr">{guestCounts.kids}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-regular fa-face-sad-sweat"></i></div>
              <div className="title">סה"כ לא מגיעים:</div>
              <div className="descr">{guestCounts.no}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-regular fa-hamburger"></i></div>
              <div className="title">ללא מנה מיוחדת</div>
              <div className="descr">{guestCounts.normal}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-regular fa-pizza"></i></div>
              <div className="title">צמחוני</div>
              <div className="descr">{guestCounts.vegetarian}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-regular fa-salad"></i></div>
              <div className="title">טבעוני</div>
              <div className="descr">{guestCounts.vegan}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-regular fa-egg"></i></div>
              <div className="title">ללא גלוטן</div>
              <div className="descr">{guestCounts.glutenFree}</div>
            </li>
            <li>
              <div className="icon"><i className="fa-regular fa-avocado"></i></div>
              <div className="title">טבעוני + ללא גלוטן</div>
              <div className="descr">{guestCounts.glutenFreeVegan}</div>
            </li>
          </ol>

          <div className='otterDiv'>
            <h1 id="h1-1" onClick={switchH}>לחצו על מנת לראות את רשימת המוזמנים</h1>
            <h1 id="h1-2" onClick={switchH} style={{ display: 'none' }}>לחצו על מנת להסתיר את רשימת המוזמנים</h1>
          </div>

          <div className="table-container" style={{ display: 'none' }} ref={tableContainer}>
            <div className="table-header">
              <div className="table-data-header">שם פרטי</div>
              <div className="table-data-header">שם משפחה</div>
              <div className="table-data-header">מגיע</div>
              <div className="table-data-header">מבוגרים</div>
              <div className="table-data-header">ילדים</div>
              <div className="table-data-header">הערות</div>
              <div className="table-data-header">מחיקה</div>
            </div>
            {data.map((item) => (
              <div className="table-row" key={item._id}>
                <div className="table-data">{item.firstName}</div>
                <div className="table-data">{item.lastName}</div>
                <div className="table-data">{item.arriving}</div>
                <div className="table-data">{parseInt(item.guestsAmountAdults)}</div>
                <div className="table-data">{parseInt(item.guestsAmountKids)}</div>
                <div className="table-data">{item.notes !== '' && <button onClick={() => showNote(item)}><i className="fa-regular fa-envelope fa-bounce"></i></button>}</div>
                <div className="table-data"><button onClick={() => deleteData(item._id)}><i className="fa-regular fa-trash-can"></i></button></div>
              </div>
            ))}
          </div>
        </div>

        <span>
          <br />
          <br />
          <br />
        </span>

        <Footer />
      </div>
    </>
  );
};

export default DataPage;
