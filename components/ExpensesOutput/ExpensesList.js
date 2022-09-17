import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

function renderExpenseItem({ item }) {
  return <ExpenseItem {...item} />;
}

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={renderExpenseItem}
    />
  );
}
