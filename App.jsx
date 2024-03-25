import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {choices} from './src/data/mockData';
import {COLORS} from './src/util/constant';

const App = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [ComputerChoices, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);

  const handleUserChoice = userChoice => {
    setUserChoice(userChoice);
    randomComputerChoice(userChoice);
  };

  const randomComputerChoice = userChoice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    const ComputerChoices = choices[randomIndex];
    setComputerChoice(ComputerChoices);
    determineWinner(ComputerChoices, userChoice);
    console.log('Computer Choice:', ComputerChoices);
    console.log('User Choice:', userChoice);
  };

  <Text style={styles.resultText}>'Kazandınız'</Text>;

  const determineWinner = (user, computer) => {
    if (user.name === computer.name) {
      setResult('Berabere!!');
    } else if (
      (user?.name === 'Taş' && computer?.name === 'Makas') ||
      (user?.name === 'Kağıt' && computer?.name === 'Taş') ||
      (user?.name === 'Makas' && computer?.name === 'Kağıt')
    ) {
      setResult('Kazandın!!');
    } else {
      setResult('Kaybettin!!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <View style={styles.container}>
        <Text style={styles.title}>TAŞ KAĞIT MAKAS</Text>
        <Text style={styles.choiceText}>Kullanıcının seçimi :</Text>
        <View style={styles.choices}>
          {choices?.map(choice => (
            <TouchableOpacity
              key={`${choice.id}-choice`}
              style={
                choice?.name === userChoice?.name
                  ? [styles.button, styles.activeButton]
                  : styles.button
              }
              onPress={() => handleUserChoice(choice)}>
              <Image source={choice.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        {ComputerChoices && (
          <>
            <Text style={styles.choiceText}>Bilgisayarın Seçimi :</Text>
            <View style={styles.button}>
              <Image source={ComputerChoices?.image} style={styles.image} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    marginBottom: 20,
  },
  choiceText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white,
    marginBottom: 20,
  },
  choices: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.white,
  },
  activeButton: {
    borderWidth: 4,
    borderColor: 'red',
  },
});
