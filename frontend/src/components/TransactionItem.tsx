import type {TransactionType} from "../types/TransactionType.ts";

export function TransactionItem({description, amount, date, type, category} : TransactionType) {
    return (
        <div className="transaction-item">
            <div className="transaction-description">{description}</div>
            <div className="transaction-amount">{amount.toFixed(2)} {type === 'EXPENSE' ? '-' : '+'}</div>
            <div className="transaction-date">{new Date(date).toLocaleDateString()}</div>
            {category && <div className="transaction-category">{category.name}</div>}
        </div>
    );
}