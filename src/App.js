import logo from './logo.svg';
import './App.css';
import SignInPage from "../src/lesson14/SignInPage"
import ExistingMemberRegistrationPage from "../src/lesson14/ExistingMemberRegistrationPage"
import NewRequestPage from "../src/lesson14/NewRequestPage"
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import TableOfMinyans from "../src/lesson14/tableOfMinyans"
import MinyanTable from "../src/lesson14/MinyanTable"
import ReduxSlice from '../src/redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
function App() {
  const store = configureStore({
    reducer: {
      slices: ReduxSlice,
    },
  });
  return (
    <Provider store={store}>

    <Router>
    <div >
  
    <Routes>
          <Route exact path='/' element={< SignInPage />}></Route>
          <Route exact path='/existingMember' element={< ExistingMemberRegistrationPage />}></Route>
          <Route exact path='/newRequest' element={< NewRequestPage />}></Route>
          <Route exact path='/table' element={< TableOfMinyans />}></Route>
          <Route exact path="/minyanTable/:codeRow" element={<MinyanTable />} />
          <Route exact path='/tableOfMinyans' element={<TableOfMinyans />} />  
   </Routes>
   </div>
</Router>
</Provider>
);
}

export default App;
