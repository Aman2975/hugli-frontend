import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
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

// -----------------------------


function About() {
return (
<section>
<Meta
title={`About Hugli Printing Solutions`}
description={`Hugli Printing Solutions delivers high-quality digital and paper printing services. Learn about our mission, experience, and commitment to premium printing.`}
canonical={`https://hugli.org/about`}
/>
<h1>About Hugli</h1>
<p>Our mission is to deliver excellent print quality with fast turnaround.</p>
</section>
);
}


function Contact() {
return (
<section>
<Meta
title={`Contact Hugli Printing Solutions`}
description={`Get in touch with Hugli for all kinds of printing services including digital and paper printing. Fast response and quality service guaranteed.`}
canonical={`https://hugli.org/contact`}
/>
<h1>Contact</h1>
<p>Email: contact@hugli.org</p>
</section>
);
}




/*
-----------------------------
Quick deployment notes:


1) Install dependencies:
npm install react-router-dom react-helmet-async


2) Place generated files in your /public folder:
- robots.txt (example: "User-agent: *\nAllow: /\nSitemap: https://hugli.org/sitemap.xml")
- sitemap.xml (put the sitemap content you previously received)


3) Important for indexing:
- Ensure each page has a unique canonical URL in Meta component
- If your app is client-side rendered (CRA), Google can index most pages but for best results
consider server-side rendering (Next.js) or prerendering key pages.


4) How to request indexing:
- Verify domain in Google Search Console (hugli.org) using TXT record on Hostinger
- Use URL Inspection -> Request Indexing for each important route (/, /services, /digital-printing, /paper-printing, /about, /contact)


-----------------------------
*/

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