import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';

const WordList = ({data}) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  // Filter only items of type 'word'
  const filteredWords = data.filter(item => item.type === 'word');

  const renderItem = ({item}) => {
    const isExpanded = expandedId === item.$id;

    return (
      <View>
        <Pressable
          onPress={() => toggleExpand(item.$id)}
          style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.word}</Text>
          <Text style={styles.itemText}>{isExpanded ? '▲' : '▼'}</Text>
        </Pressable>
        {isExpanded && (
          <View style={styles.meaningContainer}>
            <Text style={styles.meaningText}>{item.meaning}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        {filteredWords.length > 0 ? 'Words' : 'No Words Found'}
      </Text>

      <FlatList
        data={filteredWords}
        keyExtractor={(item, index) => item.$id || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{gap: 10, paddingBottom: 40}}
      />
    </View>
  );
};

export default WordList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
    marginVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#F1F8FF',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  meaningContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  meaningText: {
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
  },
});
