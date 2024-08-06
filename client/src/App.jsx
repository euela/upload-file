import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Upload from './components/Upload';
import Header from './components/Header';
import FilesList from './components/FilesList';

const App = () => (
  <BrowserRouter>
    <div className='flex flex-col gap-2 justify-center items-center'>
      <Header />
      <div>
        <Routes>
            <Route path="/" element={<Upload/>} />
            <Route path="/list" element={<FilesList/>}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

export default App;