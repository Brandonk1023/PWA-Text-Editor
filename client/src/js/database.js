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
export const putDb = async (id, content) => {
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, content: content });
  const result = await request;
  if (res === 1) {
    console.log("Saved data to DB")
  } else {
    console.log("error with saving data to db")
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const editorDb = await openDB('jate', 1);
  const tx = editorDb.transaction('jate', 'readonly')
  const store = tx.objectStore('jate')
  const request = store.getAll()
  const result = await request;
  if(!result) {
    console.log("No data content")
  } else {
    return result.content;
  }
}

initdb();
