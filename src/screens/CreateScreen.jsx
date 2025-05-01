import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Client, Databases} from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('6810f216001532c2bf1d');

const databases = new Databases(client);
const collectionId = '681106350033904e44c3';
const databaseId = '6810f4f600065a2a610c';

const CreateScreen = ({data, setData}) => {
  const [term, setTerm] = useState('');
  const [meaning, setMeaning] = useState('');
  const [type, setType] = useState('word');
  const [isEditing, setIsEditing] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const addItemHandler = async () => {
    if (!term || !meaning) {
      Alert.alert('Error', 'Please provide both term and meaning.');
      return;
    }

    const newItem = {
      word: term,
      meaning: meaning,
      type: type,
    };

    try {
      const response = await databases.createDocument(
        databaseId,
        collectionId,
        'unique()',
        newItem,
      );
      setData(prevData => [...prevData, response]);
      resetForm();
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'An error occurred while adding the item.');
    }
  };

  const updateItemHandler = async () => {
    if (!term || !meaning) {
      Alert.alert('Error', 'Please provide both term and meaning.');
      return;
    }

    const updatedItem = {
      word: term,
      meaning: meaning,
      type: type,
    };

    try {
      await databases.updateDocument(
        databaseId,
        collectionId,
        editItemId,
        updatedItem,
      );
      setData(
        data.map(item =>
          item.$id === editItemId
            ? {...item, word: term, meaning: meaning, type: type}
            : item,
        ),
      );
      resetForm();
    } catch (error) {
      console.error('Error updating item:', error);
      Alert.alert('Error', 'An error occurred while updating the item.');
    }
  };

  const handleDeleteItem = async id => {
    try {
      await databases.deleteDocument(databaseId, collectionId, id);
      setData(data.filter(item => item.$id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'An error occurred while deleting the item.');
    }
  };

  const handleEditItem = item => {
    setIsEditing(true);
    setTerm(item.word);
    setMeaning(item.meaning);
    setEditItemId(item.$id);
    setType(item.type);
  };

  const resetForm = () => {
    setTerm('');
    setMeaning('');
    setIsEditing(false);
    setEditItemId(null);
  };

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId,
        );
        setData(response.documents);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, [setData]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder={`Enter a ${type}`}
          value={term}
          onChangeText={text => setTerm(text)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Enter meaning"
          value={meaning}
          onChangeText={text => setMeaning(text)}
        />

        <View style={styles.typeButtons}>
          <Pressable
            style={[
              styles.typeButton,
              type === 'word' && styles.typeButtonActive,
            ]}
            onPress={() => setType('word')}>
            <Text
              style={type === 'word' ? styles.typeTextActive : styles.typeText}>
              Word
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.typeButton,
              type === 'phrase' && styles.typeButtonActive,
            ]}
            onPress={() => setType('phrase')}>
            <Text
              style={
                type === 'phrase' ? styles.typeTextActive : styles.typeText
              }>
              Phrase
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.btn}
          onPress={() => (isEditing ? updateItemHandler() : addItemHandler())}>
          <Text style={styles.btnText}>
            {isEditing ? 'UPDATE' : 'ADD'} {type.toUpperCase()}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.headingText}>
        Your {type === 'word' ? 'Words' : 'Phrases'}
      </Text>

      <FlatList
        data={data.filter(item => item.type === type)}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({item}) => (
          <View>
            <Pressable onPress={() => toggleExpand(item.$id)}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.word}</Text>
                <Text style={styles.toggleText}>
                  {expandedId === item.$id ? '▲' : '▼'}
                </Text>
              </View>
            </Pressable>

            {expandedId === item.$id && (
              <View style={styles.meaningContainer}>
                <Text style={styles.meaningText}>{item.meaning}</Text>

                <View style={styles.actionButtons}>
                  <Pressable
                    style={styles.smallBtn}
                    onPress={() => handleEditItem(item)}>
                    <Text style={styles.smallBtnText}>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.smallBtn, {backgroundColor: '#cc0000'}]}
                    onPress={() => handleDeleteItem(item.$id)}>
                    <Text style={styles.smallBtnText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#E8F0FE',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6A5ACD',
  },
  meaningContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  meaningText: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
    gap: 10,
  },
  inputField: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    height: 40,
    color: '#333',
  },
  btn: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  smallBtn: {
    backgroundColor: '#6A5ACD',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 4,
  },
  smallBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  typeButton: {
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  typeButtonActive: {
    backgroundColor: '#6A5ACD',
  },
  typeText: {
    color: '#000',
    fontWeight: '500',
  },
  typeTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});
