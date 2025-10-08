import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Category from './pages/Category';
import CategoryView from './pages/CategoryView';
function App() {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <NavigationBar />
      <main className="flex-fill w-100">
        <Routes>
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/view/:id" element={<CategoryView />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
