import { openDB } from 'idb';

const initdb = async () =>
  openDB('texteditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('texteditor')) {
        console.log('texteditor database already exists');
        return;
      }
      db.createObjectStore('texteditor', { keyPath: 'id', autoIncrement: true });
      console.log('texteditor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('texteditor', 1);
  const tx = todosDb.transaction('texteditor', 'readwrite');
  const store = tx.objectStore('texteditor');
  const request = store.put({ id: id, texteditor: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('texteditor', 1);
  const tx = todosDb.transaction('texteditor', 'readonly');
  const store = tx.objectStore('texteditor');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  // Check if a variable is defined and if it is, return it. 
  return result?.value;
};

initdb();
