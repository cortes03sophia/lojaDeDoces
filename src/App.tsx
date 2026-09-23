import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { ProductCatalog } from './components/ProductCatalog';
import { ProcessSection } from './components/ProcessSection';
import { AiStudioSection } from './components/AiStudioSection';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [consultationPrompt, setConsultationPrompt] = useState<string>('');

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: Product, quantity = 1, notes?: string) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                customNotes: notes || item.customNotes,
              }
            : item
        );
      }
      return [...prev, { product, quantity, customNotes: notes }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = () => {
    scrollToSection('encomenda');
  };

  const handleQuoteFromConcept = (conceptText: string, _imageUrl?: string) => {
    setConsultationPrompt(conceptText);
    scrollToSection('encomenda');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1418] flex flex-col font-sans selection:bg-[#E8C587] selection:text-[#1E1418]">
      
      {/* 1. Header with Top Bar Contract */}
      <Header
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConsultation={handleOpenConsultation}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onExploreCatalog={() => scrollToSection('colecao')}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 3. Benefits / Service Pillars */}
        <Benefits />

        {/* 4. Product Catalog / Collection with Category Filters & Modals */}
        <ProductCatalog
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />

        {/* 5. Process / How it Works Section */}
        <ProcessSection />

        {/* 6. AI Studio (Create & Edit Pastry Designs + Sommelier Photo Analysis) */}
        <AiStudioSection onQuoteFromConcept={handleQuoteFromConcept} />

        {/* 7. Testimonials / Social Proof */}
        <Testimonials />

        {/* 8. FAQ Accordion */}
        <FaqSection />

        {/* 9. Final CTA with Consultation Booking Form */}
        <CtaSection initialPrompt={consultationPrompt} />
      </main>

      {/* 10. Complete Footer */}
      <Footer />

      {/* Interactive Lightbox / Modal for Item Details */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Cart & Reservation Slide-over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
