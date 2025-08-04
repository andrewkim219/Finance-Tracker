import type {AccountCardtype} from "../types/AccountCardType.tsx";

export function AccountCard({ name, balance, type }: AccountCardtype) {
    return (
        <div className="flex flex-col rounded-2xl border-2 border-gray-300 bg-white shadow-md p-4">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-600">{type}</p>
            <p className="text-xl font-bold mt-2">${balance.toFixed(2)}</p>
        </div>
    );
}