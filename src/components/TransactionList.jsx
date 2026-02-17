import React from 'react'
import { formatCurrency } from '../utils/format'

export default function TransactionList({ transactions, onDelete }) {
  return (
    <div className="card list-card">
      <h2>Transactions</h2>
      <ul className="tx-list">
        {transactions.length === 0 && <li className="empty">No transactions yet</li>}
        {transactions.map((t) => (
          <li key={t.id} className={`tx-item ${t.type}`}>
            <div className="tx-info">
              <div className="tx-desc">{t.description}</div>
              <div className="tx-amt">{t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}</div>
            </div>
            <button className="btn danger" onClick={() => onDelete(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}