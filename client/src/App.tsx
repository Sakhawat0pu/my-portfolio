import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ChangePassword from './pages/admin/ChangePassword';
import MyProfile from './pages/admin/MyProfile';
import UpdateProfile from './pages/admin/UpdateProfile';
import Register from './pages/admin/Register';
import ProjectDetails from './pages/ProjectDetails';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<AdminDashboard />} />
              <Route path="register" element={<Register />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="update-profile" element={<UpdateProfile />} />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;