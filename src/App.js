import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import HomePage from './components/HomePage';
import Products from './components/Products';
import VisitingCards from './components/VisitingCards';
import PamphletsPosters from './components/PamphletsPosters';
import GarmentTags from './components/GarmentTags';
import Files from './components/Files';
import LetterHeads from './components/LetterHeads';
import Stickers from './components/Stickers';
import Envelopes from './components/Envelopes';
import DigitalPaperPrinting from './components/DigitalPaperPrinting';
import ATMPouches from './components/ATMPouches';
import BillBooks from './components/BillBooks';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <NotificationProvider>
          <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={
            <>
              <Header />
              <main className="main-content">
                <Products />
              </main>
            </>
          } />
          <Route path="/visiting-cards" element={
            <>
              <Header />
              <main className="main-content">
                <VisitingCards />
              </main>
            </>
          } />
          <Route path="/pamphlets-posters" element={
            <>
              <Header />
              <main className="main-content">
                <PamphletsPosters />
              </main>
            </>
          } />
          <Route path="/garment-tags" element={
            <>
              <Header />
              <main className="main-content">
                <GarmentTags />
              </main>
            </>
          } />
          <Route path="/files" element={
            <>
              <Header />
              <main className="main-content">
                <Files />
              </main>
            </>
          } />
          <Route path="/letter-heads" element={
            <>
              <Header />
              <main className="main-content">
                <LetterHeads />
              </main>
            </>
          } />
          <Route path="/stickers" element={
            <>
              <Header />
              <main className="main-content">
                <Stickers />
              </main>
            </>
          } />
          <Route path="/envelopes" element={
            <>
              <Header />
              <main className="main-content">
                <Envelopes />
              </main>
            </>
          } />
          <Route path="/digital-paper-printing" element={
            <>
              <Header />
              <main className="main-content">
                <DigitalPaperPrinting />
              </main>
            </>
          } />
          <Route path="/atm-pouches" element={
            <>
              <Header />
              <main className="main-content">
                <ATMPouches />
              </main>
            </>
          } />
          <Route path="/bill-books" element={
            <>
              <Header />
              <main className="main-content">
                <BillBooks />
              </main>
            </>
          } />
          <Route path="/about" element={
            <>
              <Header />
              <main className="main-content">
                <AboutUs />
              </main>
            </>
          } />
          <Route path="/contact" element={
            <>
              <Header />
              <main className="main-content">
                <Contact />
              </main>
            </>
          } />
        </Routes>
              </div>
        </Router>
    </NotificationProvider>
  );
}

export default App;