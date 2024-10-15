<!-- <script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js'
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      books
    };
  }
};
</script>

<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }}
      </li>
    </ul>
  </div>
</template> -->

<template>
  <div>
    <h1>Book Management</h1>
    
    <!-- Add Book Form -->
    <form @submit.prevent="addBook">
      <input v-model="newBook.isbn" type="number" placeholder="ISBN" required>
      <input v-model="newBook.name" type="text" placeholder="Book Name" required>
      <button type="submit">Add Book</button>
    </form>

    <!-- Query Controls -->
    <div>
      <input v-model="queryIsbn" type="number" placeholder="ISBN greater than">
      <input v-model="queryLimit" type="number" placeholder="Limit results">
      <select v-model="queryOrderBy">
        <option value="isbn">Order by ISBN</option>
        <option value="name">Order by Name</option>
      </select>
      <button @click="fetchBooks">Apply Filters</button>
    </div>

    <!-- Book List -->
    <ul>
      <li v-for="book in books" :key="book.id">
        <span v-if="editingBook && editingBook.id === book.id">
          <input v-model="editingBook.isbn" type="number" placeholder="ISBN">
          <input v-model="editingBook.name" type="text" placeholder="Book Name">
          <button @click="updateBook">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </span>
        <span v-else>
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="editBook(book)">Edit</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc,
  query, where, orderBy, limit, getDocs 
} from 'firebase/firestore';
import db from '../firebase/init.js';

export default {
  setup() {
    const books = ref([]);
    const newBook = reactive({ isbn: '', name: '' });
    const editingBook = ref(null);
    const queryIsbn = ref('');
    const queryLimit = ref('');
    const queryOrderBy = ref('isbn');

    const fetchBooks = async () => {
      try {
        let q = collection(db, 'books');
        
        if (queryIsbn.value) {
          q = query(q, where('isbn', '>', Number(queryIsbn.value)));
        }
        
        q = query(q, orderBy(queryOrderBy.value));
        
        if (queryLimit.value) {
          q = query(q, limit(Number(queryLimit.value)));
        }
        
        const querySnapshot = await getDocs(q);
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const capitalizeData = (data) => {
      const capitalizedData = {};
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          capitalizedData[key] = value.toUpperCase();
        } else {
          capitalizedData[key] = value;
        }
      }
      return capitalizedData;
    };

    const addBook = async () => {
      try {
        const capitalizedBook = capitalizeData({
          isbn: Number(newBook.isbn),
          name: newBook.name
        });
        await addDoc(collection(db, 'books'), capitalizedBook);
        newBook.isbn = '';
        newBook.name = '';
        fetchBooks();
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    const updateBook = async () => {
      try {
        if (!editingBook.value) return;
        
        const bookRef = doc(db, 'books', editingBook.value.id);
        const capitalizedBook = capitalizeData({
          isbn: Number(editingBook.value.isbn),
          name: editingBook.value.name
        });
        await updateDoc(bookRef, capitalizedBook);
        editingBook.value = null;
        fetchBooks();
      } catch (error) {
        console.error('Error updating book: ', error);
      }
    };

    const editBook = (book) => {
      editingBook.value = { ...book };
    };
    
    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    const cancelEdit = () => {
      editingBook.value = null;
    };

    // Initial fetch
    fetchBooks();

    return {
      books,
      newBook,
      editingBook,
      queryIsbn,
      queryLimit,
      queryOrderBy,
      fetchBooks,
      addBook,
      editBook,
      updateBook,
      deleteBook,
      cancelEdit
    };
  }
};
</script>