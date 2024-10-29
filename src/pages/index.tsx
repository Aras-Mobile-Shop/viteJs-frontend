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

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

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
      <Header />

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
        <Footer />
      </main>
    </div>
  );
}
