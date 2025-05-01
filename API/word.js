import {databases} from './appwriteConfig';

const databaseId = '6810f4f600065a2a610c'; // Replace with your Database ID
const collectionId = '6810f50f0028899d355a'; // Replace with your Collection ID

// Create a new word
const createWord = async (word, meaning) => {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()', // Use 'unique()' to automatically generate an ID for the document
      {word, meaning},
    );
    console.log('Word Created: ', response);
  } catch (error) {
    console.error('Error creating word:', error);
  }
};

// Fetch all words
const getWords = async () => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    console.log('Words List: ', response);
  } catch (error) {
    console.error('Error fetching words:', error);
  }
};

// Delete a word by ID
const deleteWord = async documentId => {
  try {
    const response = await databases.deleteDocument(
      databaseId,
      collectionId,
      documentId,
    );
    console.log('Word Deleted: ', response);
  } catch (error) {
    console.error('Error deleting word:', error);
  }
};
