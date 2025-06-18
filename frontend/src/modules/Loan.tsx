import React, { useState } from 'react';

interface Loan {
  id: number;
  from: string;
  to: string;
  amount: number;
  status: 'pending' | 'approved' | 'repaid' | 'expired';
}

export default function LoanModule() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');

  const requestLoan = () => {
    if (!amount || !to) return;
    setLoans([
      ...loans,
      { id: Date.now(), from: 'me', to, amount: parseFloat(amount), status: 'pending' },
    ]);
    setAmount('');
    setTo('');
  };

  const approveLoan = (id: number) => {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'approved' } : l));
  };
  const repayLoan = (id: number) => {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'repaid' } : l));
  };

  return (
    <div className="bg-black border border-green-700 rounded p-4 text-green-400 font-mono">
      <h2 className="text-xl mb-2">Credit & Loan</h2>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 bg-black border border-green-700 p-2 text-green-400 rounded"
          value={to}
          onChange={e => setTo(e.target.value)}
          placeholder="To (user)"
        />
        <input
          className="w-24 bg-black border border-green-700 p-2 text-green-400 rounded"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Amount"
          type="number"
        />
        <button
          className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-black font-bold"
          onClick={requestLoan}
        >
          Request
        </button>
      </div>
      <ul>
        {loans.map(loan => (
          <li key={loan.id} className="mb-2 flex items-center gap-2">
            <span>{loan.from} → {loan.to}: {loan.amount} [{loan.status}]</span>
            {loan.status === 'pending' && (
              <button className="text-green-400 hover:text-green-200 text-xs" onClick={() => approveLoan(loan.id)}>Approve</button>
            )}
            {loan.status === 'approved' && (
              <button className="text-green-400 hover:text-green-200 text-xs" onClick={() => repayLoan(loan.id)}>Repay</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
