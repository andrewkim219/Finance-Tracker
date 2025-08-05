import {useParams} from "react-router-dom";

export function Transactions() {
    const id = useParams().id;
    return (
        <>
            <p>Transactions Page for {id}</p>
        </>
    );
}