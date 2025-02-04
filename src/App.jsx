import { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer';
import Library from './components/Library';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    pages: '',
    rating: '',
  });
  const [error, setError] = useState('');

  // Load books from localStorage when the app starts
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('libraryBooks')) || [];
    setBooks(storedBooks);
  }, []);
  
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem('libraryBooks', JSON.stringify(books));
    }
  }, [books]);
  

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle adding/updating book
  const handleAddBook = () => {
    if (!formData.title || !formData.author || !formData.pages || !formData.rating) {
      setError('All fields are required!');
      return;
    }

    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = formData;
      setBooks(updatedBooks);
      setEditIndex(null);
    } else {
      setBooks([...books, formData]);
    }

    setFormData({ title: '', author: '', pages: '', rating: '' });
    setError('');
    setShowForm(false);
  };

  // Handle form cancellation
  const handleCancel = () => {
    setFormData({ title: '', author: '', pages: '', rating: '' });
    setEditIndex(null);
    setError('');
    setShowForm(false);
  };

  // Handle book deletion
  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  // Handle book editing
  const handleEdit = (index) => {
    setFormData(books[index]);
    setEditIndex(index);
    setError('');
    setShowForm(true);
  };

  return (
    <div className='app-container'>
      <div className="title-container">
        <h1>Silkamo Library</h1>
      </div>

      <button className='add-btn' onClick={() => setShowForm(true)}>Add Book</button>
      

      {showForm && (

        
        
        <form>
          <input 
            type="text" 
            name="title" 
            placeholder='Book Title' 
            value={formData.title} 
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="author" 
            placeholder='Author' 
            value={formData.author} 
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="pages" 
            placeholder='Number of Pages' 
            value={formData.pages} 
            onChange={handleChange}
          />
          <select name="rating" value={formData.rating} onChange={handleChange}>
            <option value="">Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          
          {error && <p className="error-message">{error}</p>}

          <div className='form-btns'>
            <button className='cancel-btn' type='button' onClick={handleCancel}>Cancel</button>
            <button className='done-btn' type='button' onClick={handleAddBook}>
              {editIndex !== null ? "Update" : "Done"}
            </button>
          </div>
        </form>
      )}

      <Library books={books} onDelete={handleDelete} onEdit={handleEdit} />
      <Footer />
    </div>
  
  );
}

export default App;
