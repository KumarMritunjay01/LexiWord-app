import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';

const PhraseList = ({data}) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = id => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredPhrases = data.filter(item => item.type === 'phrase');

  const renderItem = ({item}) => {
    const isExpanded = expandedId === item.$id;

    return (
      <View>
        <Pressable onPress={() => toggleExpand(item.$id)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.word}</Text>
            <Text style={styles.itemText}>{isExpanded ? '▲' : '▼'}</Text>
          </View>
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
      {filteredPhrases.length > 0 ? (
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Phrases</Text>
          <Text style={styles.headingText}>Tap for Meaning</Text>
        </View>
      ) : (
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>No Phrases Found</Text>
        </View>
      )}

      <FlatList
        data={filteredPhrases}
        keyExtractor={(item, index) => item.$id || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{gap: 10, paddingBottom: 40}}
      />
    </View>
  );
};

export default PhraseList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '500',
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
