import React, { useState } from 'react'

export default function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('income')

  const submit = (e) => {
    e.preventDefault()
    const a = parseFloat(amount)
    if (!description.trim()) return alert('Please enter a description')
    if (!a || a <= 0) return alert('Amount must be a positive number')

    const tx = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      description: description.trim(),
      amount: Math.round(a * 100) / 100,
      type
    }
    onAdd(tx)
    setDescription('')
    setAmount('')
    setType('income')
  }

  return (
    <div className="card form-card">
      <h2>Add Transaction</h2>
      <form onSubmit={submit} className="tx-form">
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Salary, Groceries"
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </label>

        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn primary">Add Transaction</button>
        </div>
      </form>
    </div>
  )
}