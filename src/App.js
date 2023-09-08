import { RouterProvider } from 'react-router-dom';
import routers from './lib/Router';

function App() {
  return (
      <RouterProvider router={routers}></RouterProvider>
  );
}

export default App;
