import React from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const products = [
    {
      name: 'Visiting Cards',
      description: 'Professional business cards in various styles and materials',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/visiting-cards'
    },
    {
      name: 'Pamphlets & Posters',
      description: 'Marketing materials for promotional campaigns',
      image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop',
      link: '/pamphlets-posters'
    },
    {
      name: 'Garment Tags',
      description: 'Custom tags and labels for clothing and textiles',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/garment-tags'
    },
    {
      name: 'Files',
      description: 'Document organization and filing solutions',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/files'
    },
    {
      name: 'Letter Heads',
      description: 'Professional letterhead designs for business correspondence',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/letter-heads'
    },
    {
      name: 'Envelopes',
      description: 'Various sizes and types of envelopes for mailing',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/envelopes'
    },
    {
      name: 'Digital Paper Printing',
      description: 'High-quality digital printing on various paper types',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/digital-paper-printing'
    },
    {
      name: 'ATM Pouches',
      description: 'Secure pouches for ATM cash handling',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/atm-pouches'
    },
    {
      name: 'Bill Books',
      description: 'Professional bill books for business transactions',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/bill-books'
    },
    {
      name: 'Stickers',
      description: 'Custom stickers with various cutting options',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
      link: '/stickers'
    }
  ];

  return (
    <div className="products-page">
      {/* Header Section */}
      <section className="products-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>High-quality printing products for all your business needs</p>
        </div>
      </section>

      {/* Products List */}
      <section className="products-list">
        <div className="container">
          <div className="products-grid">
            {products.map((product, index) => (
              <div key={index} className="product-item">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                </div>
                <Link to={product.link} className="product-btn">View Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;