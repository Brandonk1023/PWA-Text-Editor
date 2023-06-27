import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(id);

  const result = await request;
  if (!result) {
    console.log('No data available')
  } else {
    return result.value;
  }

initdb();
