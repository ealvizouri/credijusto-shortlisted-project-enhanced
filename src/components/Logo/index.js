import { useCallback  } from "react";
import { useHistory } from "react-router-dom";

export default function Logo({redirect = "/welcome"}) {
    const history = useHistory();

    const onClick = useCallback(() => {
        history.push(redirect);
    }, [history, redirect]);

    return (<h1 className="logo noselect" onClick={onClick}>
        Cryptter
    </h1>);
}
