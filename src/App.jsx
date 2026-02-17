import React, { useState, useMemo, useEffect } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import BalanceSummary from './components/BalanceSummary'

export default function App() {
  const sample = [
    { id: 1, description: 'Salary', amount: 3000, type: 'income' },
    { id: 2, description: 'Groceries', amount: 120, type: 'expense' }
  ]

  const [transactions, setTransactions] = useState(() => {
    try {
      const raw = localStorage.getItem('transactions')
      return raw ? JSON.parse(raw) : sample
    } catch (err) {
      return sample
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('transactions', JSON.stringify(transactions))
    } catch (err) {
      // ignore write errors
    }
  }, [transactions])

  const addTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev])
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0)
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0)
    return {
      income,
      expense,
      balance: income - expense
    }
  }, [transactions])

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Expense Tracker</h1>
        <p className="tagline">Track income and expenses with style</p>
      </header>

      <main className="container">
        <section className="left">
          <BalanceSummary {...totals} />
          <TransactionForm onAdd={addTransaction} />
        </section>

        <section className="right">
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </section>
      </main>
    </div>
  )
}