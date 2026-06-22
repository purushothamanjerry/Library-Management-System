import { useState, useEffect } from 'react';
import { booksAPI, borrowingAPI } from '../services/api';
import { useToast } from '../components/Toast';
import { BookOpen, Search, BookmarkPlus, Calendar } from 'lucide-react';
import './Books.css';

const GENRES = ['FICTION', 'HISTORY', 'SCIFI', 'FANTASY', 'ROMANCE', 'THRILLER', 'MYSTERY', 'DRAMA'];

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('FICTION');
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchBooks(selectedGenre);
    setSelectedYear(''); // Reset year filter when genre changes
  }, [selectedGenre]);

  const fetchBooks = async (genre) => {
    setLoading(true);
    try {
      const res = await booksAPI.getAvailableByGenre(genre);
      setBooks(res.data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to load books', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (book) => {
    try {
      await borrowingAPI.myBorrow(book.id);
      addToast(`Successfully borrowed ${book.title}`, 'success');
      // Refresh the book list to update available copies
      fetchBooks(selectedGenre);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to borrow book', 'error');
    }
  };

  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
      
    // If selectedYear is not empty, check if it matches the book's year
    const matchesYear = !selectedYear || book.year.toString().includes(selectedYear);
    
    return matchesSearch && matchesYear;
  });

  return (
    <div className="books-page">
      <div className="page-header">
        <h1>Browse Books</h1>
        <p>Explore available books by genre, title, author, or year</p>
      </div>

      <div className="search-bar-container" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search-input-wrapper" style={{ flex: 1, minWidth: '250px' }}>
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="search-input form-input"
            placeholder="Search by book title or author name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="search-input-wrapper" style={{ width: '150px' }}>
          <Calendar className="search-icon" size={18} />
          <input
            type="number"
            className="search-input form-input"
            placeholder="Year..."
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
      </div>

      <div className="genre-tabs">
        {GENRES.map((genre) => (
          <button
            key={genre}
            className={`genre-tab ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state glass-card">
          <Search size={48} />
          <h3>No books found</h3>
          <p>
            {searchQuery || selectedYear
              ? 'No books match your current search and filters.'
              : `No available books in the ${selectedGenre} genre.`}
          </p>
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-card glass-card">
              <div className="book-cover">
                <BookOpen size={32} />
              </div>
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <div className="book-meta">
                  <span className="book-year">{book.year}</span>
                  <span className={`badge ${book.availableCopies > 0 ? 'badge-success' : 'badge-danger'}`}>
                    {book.availableCopies} / {book.totalCopies} available
                  </span>
                </div>
                <button
                  className="btn-primary w-full borrow-btn"
                  onClick={() => handleBorrow(book)}
                  disabled={book.availableCopies <= 0}
                  style={{ marginTop: '0.75rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <BookmarkPlus size={16} />
                  Borrow Book
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
