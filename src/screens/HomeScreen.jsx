import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import WordList from './WordList';
import CreateScreen from './CreateScreen';
import PhraseList from './PhraseList';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collect, Learn & Speak</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0 ? {backgroundColor: 'green'} : null,
          ]}
          onPress={() => setView(0)}>
          <Text style={[styles.btnText, view === 0 ? {color: 'white'} : null]}>
            Words
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1 ? {backgroundColor: 'green'} : null,
          ]}
          onPress={() => setView(1)}>
          <Text style={[styles.btnText, view === 1 ? {color: 'white'} : null]}>
            Phrases
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2 ? {backgroundColor: 'green'} : null,
          ]}
          onPress={() => setView(2)}>
          <Text style={[styles.btnText, view === 2 ? {color: 'white'} : null]}>
            Create
          </Text>
        </Pressable>
      </View>

      {/* Removed ScrollView, let FlatList handle scrolling */}
      {view === 0 && <WordList data={data} />}
      {view === 1 && <PhraseList data={data} />}
      {view === 2 && <CreateScreen data={data} setData={setData} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: '4%',
  },
  title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333',
    margin: 8,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    width: '28%',
    height: 32,
    paddingVertical: 3.5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
  btnText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'green',
    fontSize: 14,
    fontWeight: '800',
  },
});
