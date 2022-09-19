import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/ui/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses.context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';

export default function ManageExpenses({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseCtx = useContext(ExpensesContext);
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [expenseId, navigation]);

  async function deleteExpenseHandler() {
    expenseCtx.deleteExpense(expenseId);
    await deleteExpense(expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expenseCtx.addExpense({...expenseData, id});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
