import { useGetAllAccountsForUserApi } from "../../api/accountApi.ts";
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import { useEffect } from "react"; // Removed useState since it's unused
import { AccountCard } from "../../components/AccountCard.tsx";
import type { AccountType } from "../../types/AccountType.ts";
import { useLocation } from "react-router-dom";
import { useModal } from "../../context/ModalContext.tsx";
import AccountModal from "../../components/AccountModal.tsx";

export function Accounts() {
    const { fetchAllAccountsForUserApi } = useGetAllAccountsForUserApi();
    const [accounts, setAccounts] = useLocalStorage("accounts", []);
    const location = useLocation();
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        async function loadAccounts() {
            await fetchAccounts();
        }
        loadAccounts();
    }, [location.key]);

    async function fetchAccounts() {
        try {
            const accountsData = await fetchAllAccountsForUserApi();
            if (accountsData) {
                setAccounts(accountsData);
            }
        } catch (error) {
            console.error("Failed to fetch accounts:", error);
        }
    }

    async function handleCloseModal() {
        closeModal();
        await fetchAccounts(); // Refresh accounts after closing modal
    }


    const handleAddAccount = () => {
        openModal(
            <div>
                <AccountModal onClose={handleCloseModal} />
            </div>
        );
    };

    return (
        <>
            <h1 className="text-red-600">Accounts</h1>
            <p>This is the accounts page.</p>
            <p>Here you can manage your accounts.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {accounts && accounts.length > 0 ? (
                    accounts.map((account: AccountType) => (
                        <AccountCard
                            key={account.id}
                            name={account.accountName}
                            balance={account.balance ?? 0}
                            type={account.accountType}
                        />
                    ))
                ) : (
                    <p>No Accounts Available</p>
                )}
            </div>

            <button
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddAccount}
            >
                Add Account +
            </button>
        </>
    );
}