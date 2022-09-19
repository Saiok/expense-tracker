import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../components/ui/IconButton';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses.context';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/ui/loadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function ManageExpenses({ route, navigation }) {
  const [error, setError] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    try {
      expenseCtx.deleteExpense(expenseId);
      await deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense. Please, try again later');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    if (isEditing) {
      try {
        expenseCtx.updateExpense(expenseId, expenseData);
        await updateExpense(expenseId, expenseData);
        navigation.goBack();
      } catch (error) {
        setError('Could not update expense. Please, try again later');
        setIsSubmitting(false);
      }
    } else {
      try {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id });
        navigation.goBack();
      } catch (error) {
        setError('Could not create expense. Please, try again later');
        setIsSubmitting(false);
      }
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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
