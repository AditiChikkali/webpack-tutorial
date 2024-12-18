import './App.css';
import React from 'react';
import img from '../../public/img.png';
import DashboardComponent from './Dashboard';
import ButtonComponent from '../shared/Button';
const TestComponent = lazy(() =>
  import(/* webpackChunkName: 'TestComponentChunk' */ './TestComponent.jsx')
);
const App = () => {
  console.log('test API', API_URL);
  const fetchUserDetails = () => {
    console.log('test inside function');
  };
  return (
    <div className='container'>
      <div>App component</div>
      <img src={img} />
      <ButtonComponent />
      <DashboardComponent />
      <TestComponent />
    </div>
  );
};
export default App;
