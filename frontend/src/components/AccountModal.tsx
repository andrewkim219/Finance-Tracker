import { useState, type FormEvent, useContext } from 'react';
import { useAddAccountApi } from '../api/accountApi';
import { AuthContext } from '../context/AuthContext';

type AccountModalProps = {
    onClose: () => void;
};

function AccountModal({ onClose }: AccountModalProps) {
    const [accountName, setAccountName] = useState('');
    const [accountType, setAccountType] = useState('CHECKING');
    const { addAccount, isLoading } = useAddAccountApi();
    const { currentUser } = useContext(AuthContext);

    // Fixed function syntax
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await addAccount({ accountName, accountType, balance: 0, userId: currentUser?.id });
            onClose(); // Close modal after successful creation
        } catch (error) {
            console.error('Failed to add account:', error);
            // Optional: show error message to the user
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Add New Account</h2>

            <form onSubmit={handleSubmit}>
                {/* Account Name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Name
                    </label>
                    <input
                        type="text"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Account Type */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type
                    </label>
                    <select
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="CHECKING">Checking</option>
                        <option value="SAVINGS">Savings</option>
                        <option value="CREDIT">Credit</option>
                        <option value="INVESTMENT">Investment</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Account'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AccountModal;
