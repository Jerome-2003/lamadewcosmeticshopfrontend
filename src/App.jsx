// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import Shop from './pages/Shop';
// import Cart from './pages/Cart';

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './Store';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import CartPage from './pages/Cart';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;