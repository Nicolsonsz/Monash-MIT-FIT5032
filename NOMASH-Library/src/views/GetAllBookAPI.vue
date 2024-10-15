<script>
import axios from 'axios';

export default {
  data() {
    return {
      allBooks: null,
      error: null
    };
  },
  mounted() {
    this.getAllBooks();
  },
  methods: {
    async getAllBooks() {
      try {
        const response = await axios.get('https://getallbooks-e3r7pycfsa-uc.a.run.app');
        this.allBooks = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching all books:', error);
        this.error = error;
        this.allBooks = null;
      }
    },
  },
};
</script>

<template>
  <div>
    <h2>All Books</h2>
    <div v-if="error">Error: {{ error.message }}</div>
    <pre v-else>{{ JSON.stringify(allBooks, null, 2) }}</pre>
  </div>
</template>