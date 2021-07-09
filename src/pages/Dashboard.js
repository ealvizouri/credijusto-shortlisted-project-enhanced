/**
 * @author Cesar Verduzco Reyna <cesar11augusto95@hotmail.com> 
 * @description Dashboard Component where we consume 2 apis to get the value of crypto coins convert USD to MXN
 * @version 1.0
 * * Version description:
 * v1.0 Created Component and consuming apis and show them with a convert function, the exchange rate
 * that we're gonna use will be 1 dolar for 20 pesos, it's better to consume an api of these exchange rates
 * but for the test purpose it be 20 pesos by default.
 * @date Created at 16/06/2021 Last Modified at 18/06/2021 
 * @status In Used
 */

//imports sections
import React, { useState, useEffect, useCallback } from 'react';
import CryptoCard from '../components/CryptoCard';

/**
 * Function Dashboard component
 * @returns componentrender
 */
export function Dashboard(){
    //auxiliar to establish crypto coin by default its btc
    const [auxTypeCoin,setAuxTypeCoin] = useState('btc');

    // use states type object to save each crypto coin value whit the date of the retrieve data
    const [coingeckoBtc, setCoingeckoBtc] = useState({});
    const [coingeckoEth, setCoingeckoEth] = useState({});
    const [coingeckoXrp, setCoingeckoXrp] = useState({});

    const [cryptoCompareBtc, setCryptoCompareBtc] = useState({});
    const [cryptoCompareEth, setCryptoCompareEth] = useState({});
    const [cryptoCompareXrp, setCryptoCompareXrp] = useState({});

    //end section of the use states

    //list auxiliars to save the data retrieve and show it them into a table
    const [listcoingeckoBtc ,setListCoinGeckoBtc] = useState([]);
    const [listcoingeckoEth, setListCoinGeckoEth] = useState([]);
    const [listcoingeckoXrp, setListCoinGeckoXrp] = useState([]);

    const [listcryptoCompareBtc, setListCryptoBtc] = useState([]);
    const [listcryptoCompareEth, setListCryptoEth] = useState([]);
    const [listcryptoCompareXrp, setListCryptoXrp] = useState([]);

    //end of the axuliar list section

    //section of the use states that it will shows into the render component for each source

    const [auxShowCoinGecko , setAuxShowCoinGecko] = useState({});
    const [auxShowCoinCrypto , setAuxShowCoinCrypto] = useState({});

    const [listauxShowCoinGecko, setListAuxShowCoinGecko] = useState([]);
    const [listauxShowCoinCrypto, setListAuxShowCoinCrypto] = useState([]);
    //end section


    //use state where it saves the convertions of MXN to crypto coin
    const [mxnToCrypto, setmxnToCrypto] = useState('');
    const [mxnToCoingecko, setmxnToCoingecko] = useState('');
    //end section of the convertions use state

    //section to handle custom styles depending of the crypto coin that shows in the table
    const [btnCryptoClass] = useState('btn-crypto');
    const [btnBTC,setBtnBTC] = useState(`${btnCryptoClass} active`);
    const [btnETH,setBtnETH] = useState(btnCryptoClass);
    const [btnXRP,setBtnXRP] = useState(btnCryptoClass);
    //end section

    //const value of the exchange rate UDS TO MXN
    const valueRateMx = 20;

    //value of the input, use state
    const [inputValue, setInputValue] = useState(0);
    
    //handle exchangeRate to MXN, because the data retrieve is in USD 
    const exchangeRateMx = (coin) =>{
        return (valueRateMx* coin);
    }

    //handle change of the input to convert the MXN of the value input to the value of the crypto coin
    const convertMxn = useCallback((val) =>{
        setmxnToCoingecko(val/auxShowCoinGecko.valueCoin);
        setmxnToCrypto(val/auxShowCoinCrypto.valueCoin);
    }, [auxShowCoinGecko, auxShowCoinCrypto]);

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const onInputFocus = (e) => {
        e.target.select();
    }

    //handle click function of the btn to change the cryto coin
    function changeBtnValues(type) {
        setAuxTypeCoin(type);
        if(type==="btc"){
            setBtnBTC(`${btnCryptoClass} active`);
            setBtnETH(btnCryptoClass);
            setBtnXRP(btnCryptoClass);
            setAuxShowCoinGecko(coingeckoBtc);
            setAuxShowCoinCrypto(cryptoCompareBtc);
            setListAuxShowCoinGecko(listcoingeckoBtc);
            setListAuxShowCoinCrypto(listcryptoCompareBtc);
        }else if(type==='eth'){
            setBtnBTC(btnCryptoClass);
            setBtnETH(`${btnCryptoClass} active`);
            setBtnXRP(btnCryptoClass);
            setAuxShowCoinGecko(coingeckoEth);
            setAuxShowCoinCrypto(cryptoCompareEth);
            setListAuxShowCoinGecko(listcoingeckoEth);
            setListAuxShowCoinCrypto(listcryptoCompareEth);
        }else{
            setBtnBTC(btnCryptoClass);
            setBtnETH(btnCryptoClass);
            setBtnXRP(`${btnCryptoClass} active`);
            setAuxShowCoinGecko(coingeckoXrp);
            setAuxShowCoinCrypto(cryptoCompareXrp);
            setListAuxShowCoinGecko(listcoingeckoXrp);
            setListAuxShowCoinCrypto(listcryptoCompareXrp);
        }
    }

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        //creating aux list to push the data into these list, after that set state to the list where it gonna appers all the data retrieve each 15 seconds
        const auxListGeckoBTC = [];
        const auxListGeckoETH = [];
        const auxListGeckoXRP = [];
        const auxListCrytpBTC = [];
        const auxListCrytpETH = [];
        const auxListCrytpXRP = [];

        //starting an interval to consume these apis every 15 seconds, here it saves the last record into and it will push into the aux list
        //also it converts the value USD to MXN
        //then it will depend of the aux type that the user final want to see in the btn sections
        const intervalId = setInterval(
            async () => {
                const dateUpdate = Date().toLocaleString();
                const resCoingecko = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple');
                const dataCoingecko = await resCoingecko.json();
                const coingeckobtc = exchangeRateMx(dataCoingecko[0].current_price);
                const coingeckoeth = exchangeRateMx(dataCoingecko[1].current_price);
                const coingeckoxrp = exchangeRateMx(dataCoingecko[2].current_price);
                setCoingeckoBtc({valueCoin : coingeckobtc, date: dateUpdate});
                setCoingeckoEth({valueCoin : coingeckoeth, date: dateUpdate});
                setCoingeckoXrp({valueCoin : coingeckoxrp, date: dateUpdate});
                if (auxListGeckoBTC.length > 10) auxListGeckoBTC.shift();
                auxListGeckoBTC.push({valueCoin : coingeckobtc, date: dateUpdate});

                if (auxListGeckoETH.length > 10) auxListGeckoETH.shift();
                auxListGeckoETH.push({valueCoin : coingeckoeth, date: dateUpdate});

                if (auxListGeckoXRP.length > 10) auxListGeckoXRP.shift();
                auxListGeckoXRP.push({valueCoin : coingeckoxrp, date: dateUpdate});

                setListCoinGeckoBtc(auxListGeckoBTC);
                setListCoinGeckoEth(auxListGeckoETH);
                setListCoinGeckoXrp(auxListGeckoXRP);

                const resCryptoCompare = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD');
                const dataCryptoCompare = await resCryptoCompare.json();
                const cryproBtc = exchangeRateMx(dataCryptoCompare.BTC.USD);
                const cryproEth = exchangeRateMx(dataCryptoCompare.ETH.USD);
                const cryproXrp = exchangeRateMx(dataCryptoCompare.XRP.USD);
                setCryptoCompareBtc({valueCoin : cryproBtc, date: dateUpdate});
                setCryptoCompareEth({valueCoin : cryproEth, date: dateUpdate});
                setCryptoCompareXrp({valueCoin : cryproXrp, date: dateUpdate});

                if (auxListCrytpBTC.length > 10) auxListCrytpBTC.shift();
                auxListCrytpBTC.push({valueCoin : cryproBtc, date: dateUpdate});

                if (auxListCrytpETH.length > 10) auxListCrytpETH.shift();
                auxListCrytpETH.push({valueCoin : cryproEth, date: dateUpdate});

                if (auxListCrytpXRP.length > 10) auxListCrytpXRP.shift();
                auxListCrytpXRP.push({valueCoin : cryproXrp, date: dateUpdate});

                setListCryptoBtc(auxListCrytpBTC);
                setListCryptoEth(auxListCrytpETH);
                setListCryptoXrp(auxListCrytpXRP);
                let typeSetTable = auxTypeCoin;
                console.log(typeSetTable);
                if(typeSetTable === 'btc'){
                    setAuxShowCoinGecko({valueCoin : coingeckobtc, date: dateUpdate});
                    setAuxShowCoinCrypto({valueCoin : cryproBtc, date: dateUpdate});
                    setListAuxShowCoinGecko(auxListGeckoBTC);
                    setListAuxShowCoinCrypto(auxListCrytpBTC);
                }else if(typeSetTable === 'eth'){
                    setAuxShowCoinGecko({valueCoin : coingeckoeth, date: dateUpdate});
                    setAuxShowCoinCrypto({valueCoin : cryproEth, date: dateUpdate});
                    setListAuxShowCoinGecko(auxListGeckoETH);
                    setListAuxShowCoinCrypto(auxListCrytpETH);
                }else{
                    setAuxShowCoinGecko({valueCoin : coingeckoxrp, date: dateUpdate});
                    setAuxShowCoinCrypto({valueCoin : cryproXrp, date: dateUpdate});
                    setListAuxShowCoinGecko(auxListGeckoXRP);
                    setListAuxShowCoinCrypto(auxListCrytpXRP);
                }
            }, 7000
        );
        //we're gonna clear this interval to repeat the loop for unsaving all the aux types
        return () => clearInterval(intervalId); //This is important
    }, [auxTypeCoin]);

    useEffect(() => {
        convertMxn(inputValue);
    }, [convertMxn, inputValue, auxShowCoinCrypto, auxShowCoinGecko])

   //if we have data from the apis it will shows into the screen, the final value of the crypto coin will be format to the local format
   return(<>
    {Object.keys(auxShowCoinGecko).length === 0 && Object.keys(auxShowCoinCrypto).length === 0 ? (<div className="container d-flex justify-content-center align-items-center"><div className="spinner-border"></div></div>) : <>
        <div className="container">
            <div className="d-flex flex-direction-column align-items-center">
                <div className="conversion-menu d-flex mt-3">
                    <input className="text-center p-0" type="number" min={0} step="any" name="changeMXNrate" placeholder="MX pesos to.." value={inputValue} onChange={onInputChange} onFocus={onInputFocus} />
                    <button onClick={() => changeBtnValues('btc')} className={btnBTC}>BTC</button>
                    <button onClick={() => changeBtnValues('eth')} className={btnETH}>ETH</button>
                    <button onClick={() => changeBtnValues('xrp')} className={btnXRP}>XRP</button>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center flex-wrap">
                        <CryptoCard name="Gecko" valueCoin={auxShowCoinGecko.valueCoin} mxnValue={inputValue} conversion={mxnToCoingecko} cryptoUnit={auxTypeCoin} history={listauxShowCoinGecko} />
                        <CryptoCard name="CryptoCompare" valueCoin={auxShowCoinCrypto.valueCoin} mxnValue={inputValue} conversion={mxnToCrypto} cryptoUnit={auxTypeCoin} history={listauxShowCoinCrypto} />
                    </div>
                </div>
            </div>
        </div>
    </>}
</>);
    
}

export default Dashboard;