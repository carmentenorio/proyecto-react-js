import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer';
import Task from './pages/TaskPage';
import Category from './pages/CategoryListPage';
import CategoryView from './pages/CategoryViewPage';
import CategoryCreate from './pages/CategoryCreatePage';
import CategoryUpdate from './pages/CategoryUpdate';
import Tag from './pages/TagListPage';
import TagView from './pages/TagViewPage';
import TagUpdate from './pages/TagUpdate';
import TagCreate from './pages/TagCreatePage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <NavigationBar />
      <main className="flex-fill w-100">
        <Routes>
          <Route path="/task" element={<Task />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/:id/view" element={<CategoryView />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/edit/:id" element={<CategoryUpdate />} />
          <Route path="/tags" element={<Tag />} />
          <Route path="/tags/:id/view" element={<TagView />} />
          <Route path="/tags/create" element={<TagCreate />} />
          <Route path="/tags/:id/edit" element={<TagUpdate />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
