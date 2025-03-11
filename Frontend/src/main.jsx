import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { store } from './Redux/Store.js'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-tooltip/dist/react-tooltip.css";
import { ToastContainer } from 'react-toastify';
import './App.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <App />
  <ToastContainer />
</Provider>,
)
