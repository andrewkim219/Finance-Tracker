import {useLocation, useParams} from "react-router-dom";
import {useGetAllTransactionsForUserApi} from "../../api/transactionApi.ts";
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import type {TransactionType} from "../../types/TransactionType.ts";
import {useEffect, useState, useContext} from "react";
import {TransactionItem} from "../../components/TransactionItem.tsx";
import {useModal} from "../../context/ModalContext.tsx";
import TransactionModal from "../../components/TransactionModal.tsx";
import {useGetAllCategoriesForUserApi} from "../../api/categoryApi.ts";
import type {CategoryType} from "../../types/CategoryType.ts";
import {AuthContext} from "../../context/AuthContext.tsx";

export function Transactions() {
    const id = useParams().id;
    const {fetchAllTransactionsForUserApi} = useGetAllTransactionsForUserApi();
    const {fetchAllCategoriesForUserApi} = useGetAllCategoriesForUserApi();
    const location = useLocation()
    const [transactions, setTransactions] = useLocalStorage("transactions", []);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const {openModal, closeModal} = useModal();
    const {currentUser} = useContext(AuthContext);

    useEffect(() => {
        if (id) {
            async function loadTransactions() {
                await refreshData();
            }
            loadTransactions();
        }
    }, [location.key])

    async function refreshData() {
        try {
            const transactionData = await fetchAllTransactionsForUserApi(Number(id));
            {transactionData && setTransactions(transactionData)}
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    }

    async function handleAddTransaction() {
        try {
            if (currentUser?.id) {
                const categoriesData = await fetchAllCategoriesForUserApi(currentUser.id);
                setCategories(categoriesData);
                openModal(
                    <TransactionModal
                        onClose={handleCloseModal}
                        categories={categories}
                    />
                );
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    }

    function handleCloseModal() {
        closeModal();
        refreshData(); 
    }

    return (
        <>
            <button
                onClick={handleAddTransaction}
                className="px-4 py-2 mt-4 mb-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
                Add Transaction
            </button>
            <div>
                {transactions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {transactions.map((transaction: TransactionType) => (
                            <TransactionItem
                                key={transaction.id}
                                description={transaction.description}
                                amount={transaction.amount}
                                date={transaction.date}
                                type={transaction.type}
                                account={transaction.account}
                                category={transaction.category}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No transactions found.</p>
                )}
            </div>
        </>
    );
}
