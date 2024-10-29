"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  ChevronRight,
  Star,
  Phone,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Phone {
  id: string;
  model: string;
  price: number;
  image: string;
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredPhones, setFeaturedPhones] = useState<Phone[]>([]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await fetch("https://nodejs-939i.onrender.com/phones");
        const allPhones = await response.json();
        setFeaturedPhones(allPhones.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch phones:", error);
      }
    };

    fetchPhones();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-md text-stone-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl ">Aras-Mobiles</span>
          </Link>
          <nav className="hidden md:flex space-x-4 text-yellow-400">
            <Link to="/" className="hover:underline">
              Shop
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="md:hidden bg-primary text-primary-foreground py-2"
          >
            <nav className="flex flex-col items-center space-y-2">
              <Link to="/" className="hover:underline" onClick={toggleMenu}>
                Shop
              </Link>
              <Link
                to="/about"
                className="hover:underline"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:underline"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary to-primary-foreground text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to MobileShop
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover the latest and greatest in mobile technology
            </p>
            <Button size="lg" asChild>
              <Link to="/shop">
                Shop Now <ChevronRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Featured products */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPhones.map((phone) => (
                <motion.div
                  key={phone.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={phone.image}
                    alt={phone.model}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{phone.model}</h3>
                    <p className="text-muted-foreground mb-4">${phone.price}</p>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Latest Models</h3>
                <p className="text-muted-foreground">
                  We offer the newest and most advanced mobile devices.
                </p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  All our products come with a full warranty and support.
                </p>
              </div>
              <div className="text-center">
                <Truck className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get your new phone delivered to your doorstep in no time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
            <blockquote className="text-xl italic max-w-2xl mx-auto">
              "MobileShop provided me with an excellent shopping experience.
              Their selection is unbeatable, and the customer service is
              top-notch!"
            </blockquote>
            <div className="mt-4 flex justify-center">
              <Star className="text-yellow-400 fill-current" />
              <Star className="text-yellow-400 fill-current" />
              <Star className="text-yellow-400 fill-current" />
              <Star className="text-yellow-400 fill-current" />
              <Star className="text-yellow-400 fill-current" />
            </div>
            <p className="mt-2 font-semibold">- Sarah Johnson</p>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-slate-300 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Upgrade Your Phone?
            </h2>
            <p className="text-xl mb-8">
              Browse our collection and find your perfect match today!
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/shop">Explore Our Collection</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/shop" className="hover:underline">
                  Shop
                </Link>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
                <Link to="/terms" className="hover:underline">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p>1234 Mobile Street</p>
              <p>Phoneville, PH 56789</p>
              <p>Email: info@mobileshop.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Newsletter</h3>
              <p className="mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" className="rounded-l-none bg-slate-400">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} MobileShop. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
