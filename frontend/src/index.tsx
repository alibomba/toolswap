import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

declare global {
  interface Window {
    Pusher: any;
    Echo: Echo
  }
}
window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_KEY,
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  wsHost: process.env.REACT_APP_PUSHER_HOST,
  wsPort: process.env.REACT_APP_PUSHER_PORT,
  forceTLS: false,
  disableStats: true
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);