import moment from "moment";

export default function CryptoCard ({name, valueCoin, mxnValue, cryptoUnit, conversion, history}) {
    return (<div className="card m-2">
        <div className="card__header d-flex justify-content-between align-items-center p-1 border-bottom-1 border-bottom-solid">
            <div>
                <strong>{name}</strong>
            </div>
            <div>
                ${Intl.NumberFormat().format(valueCoin)} MXN
            </div>
        </div>
        <div className="p-1 border-bottom-1 border-bottom-solid">
            <p className="text-center">
                <strong>${Intl.NumberFormat().format(mxnValue)}</strong> MXN are <strong>{Intl.NumberFormat().format(conversion)}</strong> {cryptoUnit.toUpperCase()}
            </p>
        </div>
        <div className="d-flex flex-direction-column">
            {history.map((crypto,index) => {if(crypto.valueCoin){
                return (( 
                    <div className="d-flex justify-content-between my-1 p-1 border-bottom-1 border-bottom-solid" key={index}>
                        <div className="mr-2">{Intl.NumberFormat().format(crypto.valueCoin)}</div>
                        <div className="text-right">{moment(crypto.date).format("k:m:ss a")}</div>
                    </div>
                ));
            }
            return null;})}
            <div className="mb-1 text-center">
                <small>{moment().format("DD-MM-YYYY")}</small>
            </div>
        </div>
    </div>);
}