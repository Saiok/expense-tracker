import { useContext } from 'react';

import ExpenssesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses.context';

export default function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpenssesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found." />
  );
}
