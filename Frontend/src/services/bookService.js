import axiosInstance from '../config/api';

const bookService = {
  getAllBooks: async (category = 'all', sort = 'new', page = 1, limit = 12) => {
    try {
      let url = `/books?page=${page}&limit=${limit}&sort=${sort}`;

      if (category && category !== 'all') {
        url += `&category=${category}`;
      }

      const response = await axiosInstance.get(url);

      return {
        success: response.data.success,
        books: response.data.data || [],
        pagination: response.data.pagination,
      };
    } catch (error) {
      console.error('getAllBooks error:', error.response?.data || error);

      return {
        success: false,
        books: [],
        message:
          error.response?.data?.message || 'Failed to fetch books',
      };
    }
  },

  getBookById: async (id) => {
    try {
      const response = await axiosInstance.get(`/books/${id}`);
      return {
        success: response.data.success,
        book: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch book',
      };
    }
  },

  searchBooks: async (query) => {
    try {
      const response = await axiosInstance.get(
        `/books/search?q=${encodeURIComponent(query)}`
      );

      return {
        success: response.data.success,
        books: response.data.data || [],
      };
    } catch (error) {
      return {
        success: false,
        books: [],
        message: 'Search failed',
      };
    }
  },

  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/categories');

      return {
        success: response.data.success,
        categories: response.data.data || [],
      };
    } catch (error) {
      return {
        success: false,
        categories: [],
        message: 'Failed to fetch categories',
      };
    }
  },

  addReview: async (bookId, rentalId, rating, comment) => {
    try {
      const response = await axiosInstance.post('/reviews', {
        bookId,
        rentalId,
        rating,
        comment,
      });

      return response.data;
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || 'Failed to add review',
      };
    }
  },

  getReviews: async (bookId) => {
    try {
      const response = await axiosInstance.get(`/reviews/${bookId}`);
      return response.data;
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch reviews',
      };
    }
  },
};

export default bookService;