// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetail, deleteItem} = props
  const {id, incomeType, title, amount} = transactionDetail

  let newIncomeType
  if (incomeType === 'INCOME') {
    newIncomeType = 'Income'
  } else {
    newIncomeType = 'Expenses'
  }

  const onDeletingHistory = () => {
    deleteItem(id, incomeType, amount)
  }

  return (
    <li className="history-list">
      <p className="history-options">{title}</p>
      <p className="history-options">{`Rs ${amount}`}</p>
      <p className="history-options">{newIncomeType}</p>
      <button
        onClick={onDeletingHistory}
        type="button"
        className="delete-button"
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          className="delete-img"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
