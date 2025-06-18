import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  return (
    <Router>
      <Header />
      <div style={{ minHeight: '80vh' }}>
        <AppRoutes />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
