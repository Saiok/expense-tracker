import { View, StyleSheet, Text } from 'react-native';

import Input from './Input';

export default function ExpenseForm(params) {
  function amountChangedHandler() {}
  function dateChangedHandler() {}

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: amountChangedHandler
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: dateChangedHandler
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          /* autoCapitalize: 'none',
          autoCorrect: false, */
          onChangeText: () => {}
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  }
});
