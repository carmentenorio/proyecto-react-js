import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Task from './pages/Task';
import Category from './pages/Category';
import Tag from './pages/Tag';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <NavigationBar />
      <main className="flex-fill w-100">
        <Routes>
          <Route path="/task" element={<Task />} />
          <Route path="/category" element={<Category />} />
          <Route path="/tag" element={<Tag />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
