import { useState, useEffect } from 'react';
import usd from './assets/usd.jpg';
import cad from './assets/cad.jpg';
import eur from './assets/eur.jpg';
import gbp from './assets/gbp.jpg';
import aed from './assets/aed.jpg';
import cbe from './assets/cbelogo.png'
import abyss from './assets/abyss.png'
import dashen from './assets/dashen.png'
import awash from './assets/awash.png'

const App = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  const [comData, setComData] = useState([]);
  const [dashenData, setDashenData] = useState([]);
  const [awashData, setAwashData] = useState([]);
  const [abyssData, setAbyssData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const [comResponse, dashenResponse, awashResponse, abyssResponse] = await Promise.all([
          fetch('http://localhost:3000/getCom'),
          fetch('http://localhost:3000/getDashen'),
          fetch('http://localhost:3000/getAwash'),
          fetch('http://localhost:3000/getAbyss'),
        ]);

        if (!comResponse.ok || !dashenResponse.ok || !awashResponse.ok || !abyssResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const comData = await comResponse.json();
        const dashenData = await dashenResponse.json();
        const awashData = await awashResponse.json();
        const abyssData = await abyssResponse.json();

        setComData(comData);
        setDashenData(dashenData);
        setAwashData(awashData);
        setAbyssData(abyssData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  // Check if data is available before rendering
  const isDataAvailable = comData.length > 0 &&  dashenData.length > 0 && awashData.length > 0 && abyssData.length > 0;

  return (
    <div className="table-container">
      <h1 className="table-title">Daily Exchange Rates</h1>
      <p className="table-date">Date: {formattedDate}</p>
      <table className="exchange-table">
        <thead>
          <tr>
            <th rowSpan="2" >Currency</th>
            <th colSpan="2" className='col1'> <img className="logo" src={cbe} alt="" />CBE</th>
            <th colSpan="2" className='col2'> <img className="logo" src={dashen} alt="" />Dashen</th>
            <th colSpan="2" className='col3'> <img className="logo" src={awash} alt="" />Awash</th>
            <th colSpan="2" className='col4' > <img className="logo" src={abyss} alt=""/>Abyssinia</th>
          </tr>
          <tr>
            <th className='col1'>Buying</th>
            <th className='col1'>Selling</th>
            <th className='col2'>Buying</th>
            <th className='col2'>Selling</th>
            <th className='col3'>Buying</th>
            <th className='col3'>Selling</th>
            <th className='col4'>Buying</th>
            <th className='col4'>Selling</th>
          </tr>
        </thead>
        <tbody>
          {isDataAvailable ? (
            <>
              <tr>
                <td><img src={usd} alt="USD" /> USD</td>
                <td className='col1'>{comData[0].USD.buying}</td>
                <td className='col1'>{comData[0].USD.selling}</td>
                <td className='col2'>{dashenData[0].USD.buying}</td>
                <td className='col2'>{dashenData[0].USD.selling}</td>
                <td className='col3'>{awashData[0].USD.buying}</td>
                <td className='col3'>{awashData[0].USD.selling}</td>
                <td className='col4'>{abyssData[0].USD.buying}</td> {/* Corrected from selling to buying */}
                <td className='col4'>{abyssData[0].USD.selling}</td>
              </tr>
              <tr>
                <td><img src={gbp} alt="GBP" /> GBP</td>
                <td className='col1'>{comData[0].GBP.buying}</td>
                <td className='col1'>{comData[0].GBP.selling}</td>
                <td className='col2'>{dashenData[0].GBP.buying}</td>
                <td className='col2'>{dashenData[0].GBP.selling}</td>
                <td className='col3'>{awashData[0].GBP.buying}</td>
                <td className='col3'>{awashData[0].GBP.selling}</td>
                <td className='col4'>{abyssData[0].GBP.buying}</td> {/* Corrected from selling to buying */}
                <td className='col4'>{abyssData[0].GBP.selling}</td>
              </tr>
              <tr>
                <td><img src={eur} alt="EUR" /> EUR</td>
                <td className='col1'>{comData[0].EUR.buying}</td>
                <td className='col1'>{comData[0].EUR.selling}</td>
                <td className='col2'>{dashenData[0].EUR.buying}</td>
                <td className='col2'>{dashenData[0].EUR.selling}</td>
                <td className='col3'>{awashData[0].EUR.buying}</td>
                <td className='col3'>{awashData[0].EUR.selling}</td>
                <td className='col4'>{abyssData[0].EUR.buying}</td> {/* Corrected from GBP to EUR */}
                <td className='col4'>{abyssData[0].EUR.selling}</td>
              </tr>
              <tr>
                <td><img src={cad} alt="CAD" /> CAD</td>
                <td className='col1'>{comData[0].CAD.buying}</td>
                <td className='col1'>{comData[0].CAD.selling}</td>
                <td className='col2'>{dashenData[0].CAD.buying}</td>
                <td className='col2'>{dashenData[0].CAD.selling}</td>
                <td className='col3'>{awashData[0].CAD.buying}</td>
                <td className='col3'>{awashData[0].CAD.selling}</td>
                <td className='col4'>{abyssData[0].CAD.buying}</td> {/* Corrected from GBP to CAD */}
                <td className='col4'>{abyssData[0].CAD.selling}</td>
              </tr>
              <tr>
                <td><img src={aed} alt="AED" /> AED</td>
                <td className='col1'>{comData[0].AED.buying}</td>
                <td className='col1'>{comData[0].AED.selling}</td>
                <td className='col2'>{dashenData[0].AED.buying}</td>
                <td className='col2'>{dashenData[0].AED.selling}</td>
                <td className='col3'>{awashData[0].AED.buying}</td>
                <td className='col3'>{awashData[0].AED.selling}</td>
                <td className='col4'>{abyssData[0].AED.buying}</td> {/* Corrected from GBP to AED */}
                <td className='col4'>{abyssData[0].AED.selling}</td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="9">Loading...</td> {/* Show loading message if data is not available */}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
