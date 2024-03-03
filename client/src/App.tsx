import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Register from './pages/Register';
import Layout from './components/Layout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import UpdateUser from './pages/UpdateUser';

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Login />} />
          <Route path='/userDashboard' element={<UserDashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/update' element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
