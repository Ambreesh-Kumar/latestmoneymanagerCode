import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    balance: 0,
    incomeType: 'INCOME',
    title: '',
    amount: '',
    transactionList: [],
  }

  onSubmitingForm = event => {
    const {
      income,
      expenses,
      balance,
      incomeType,
      title,
      amount,
      transactionList,
    } = this.state
    console.log(incomeType)
    event.preventDefault()
    const newTransaction = {
      id: v4(),
      incomeType,
      title,
      amount,
    }
    const newBalance =
      incomeType === 'INCOME'
        ? parseInt(balance) + parseInt(amount)
        : parseInt(balance) - parseInt(amount)
    const newIncome =
      incomeType === 'INCOME'
        ? parseInt(income) + parseInt(amount)
        : parseInt(income)
    const newExpences =
      incomeType === 'EXPENSES'
        ? parseInt(expenses) + parseInt(amount)
        : parseInt(expenses)
    this.setState({
      income: newIncome,
      expenses: newExpences,
      balance: newBalance,
      transactionList: [...transactionList, newTransaction],
      title: '',
      amount: '',
    })
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeAmountType = event => {
    this.setState({incomeType: event.target.value})
  }

  deleteHistoryItem = (id, incomeType, amount) => {
    const {transactionList, income, expenses, balance} = this.state
    const filteredTransactionList = transactionList.filter(
      eachItem => eachItem.id !== id,
    )

    const newBalance =
      incomeType === 'INCOME'
        ? parseInt(balance) - parseInt(amount)
        : parseInt(balance) + parseInt(amount)
    const newIncome =
      incomeType === 'INCOME'
        ? parseInt(income) - parseInt(amount)
        : parseInt(income)
    const newExpences =
      incomeType === 'EXPENSES'
        ? parseInt(expenses) - parseInt(amount)
        : parseInt(expenses)

    this.setState({
      transactionList: filteredTransactionList,
      expenses: newExpences,
      income: newIncome,
      balance: newBalance,
    })
  }

  render() {
    const {
      income,
      expenses,
      balance,
      incomeType,
      title,
      amount,
      transactionList,
    } = this.state
    console.log(incomeType)
    return (
      <div className="main-container">
        <div className="money-manager-header">
          <h1 className="header-name">Hi, Richard</h1>
          <p className="welcomeSays">
            Welcome back to your{' '}
            <span className="money-manage-span">Money Manager</span>
          </p>
        </div>
        <ul className="unordered-money-details-list">
          <MoneyDetails
            transactionTypeOptions={{
              optionId: 'BALANCE',
              displayText: 'Balance',
            }}
            income={income}
            expenses={expenses}
            balance={balance}
            key="BALANCE"
          />

          {transactionTypeOptions.map(eachItem => (
            <MoneyDetails
              transactionTypeOptions={eachItem}
              income={income}
              expenses={expenses}
              balance={balance}
              key={eachItem.optionId}
            />
          ))}
        </ul>
        <div className="form-history-main-container">
          <form className="transaction-form" onSubmit={this.onSubmitingForm}>
            <h1 className="form-heading">Add Transaction</h1>
            <div className="form-title-container">
              <label className="form-title" htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                className="input-element"
                placeholder="TITLE"
                value={title}
                onChange={this.onChangeTitle}
              />
            </div>

            <div className="form-title-container">
              <label className="form-title" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className="input-element"
                placeholder="AMOUNT"
                value={amount}
                onChange={this.onChangeAmount}
              />
            </div>

            <div className="form-title-container">
              <label className="form-title" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className="input-element select-element"
                onChange={this.onChangeAmountType}
                value={incomeType}
              >
                <option className="income-type" value="INCOME">
                  Income
                </option>
                <option className="income-type" value="EXPENSES">
                  Expenses
                </option>
              </select>
            </div>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>

          <div className="history-form">
            <h1 className="form-heading">History</h1>
            <ul className="unordered-history-list">
              <div className="history-header">
                <p className="history-title">Title</p>
                <p className="history-title">Amount</p>
                <p className="history-title">Type</p>
              </div>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  transactionDetail={eachTransaction}
                  deleteItem={this.deleteHistoryItem}
                  key={eachTransaction.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
