// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {transactionTypeOptions, income, expenses, balance} = props
  const {optionId, displayText} = transactionTypeOptions

  let moneyImageType
  let alt
  let backgroundClass
  let updatedBalance
  let dataTestId
  if (optionId === 'INCOME') {
    moneyImageType =
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png '
    alt = 'income'
    backgroundClass = 'income-bg'
    updatedBalance = income
    dataTestId = 'incomeAmount'
  } else if (optionId === 'EXPENSES') {
    moneyImageType =
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png'
    alt = 'expenses'
    backgroundClass = 'expenses-bg'
    updatedBalance = expenses
    dataTestId = 'expensesAmount'
  } else {
    moneyImageType =
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png'
    alt = 'balance'
    backgroundClass = 'balance-bg'
    updatedBalance = balance
    dataTestId = 'balanceAmount'
  }

  return (
    <li className="money-list">
      <div className={`money-balance-card ${backgroundClass}`}>
        <img src={moneyImageType} alt={alt} className="money-image" />
        <div className="money-type-container">
          <p className="money-type">Your {displayText}</p>
          <p
            className="money-balance"
            data-testid={dataTestId}
          >{`Rs ${updatedBalance}`}</p>
        </div>
      </div>
    </li>
  )
}
export default MoneyDetails
