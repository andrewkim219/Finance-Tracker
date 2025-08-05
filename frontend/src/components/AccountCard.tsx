import type {AccountCardtype} from "../types/AccountCardType.tsx";
import {useNavigate} from "react-router-dom";

export function AccountCard({ id, name, balance, type }: AccountCardtype) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/app/transactions/${id}`);
    }

    return (
        <div className="flex flex-col rounded-2xl border-2 border-gray-300 bg-white shadow-md p-4" onClick={handleClick}>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{type}</p>
            <p className="text-xl font-bold mt-2">${balance.toFixed(2)}</p>
        </div>
    );
}