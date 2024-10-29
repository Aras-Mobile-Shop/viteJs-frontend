"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Phone, Truck, HeartHandshake } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function About() {
  return (
    <>
      <Header />
      {/* <div className=" p-4 bg-tech min-h-screen text-white"> */}
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            About MobileShop
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2010, MobileShop has been at the forefront of mobile
                technology retail for over a decade. What started as a small
                local store has grown into a nationwide chain, serving thousands
                of customers with the latest smartphones, accessories, and
                repair services.
              </p>
              <p className="text-muted-foreground">
                Our passion for technology and commitment to customer
                satisfaction have been the driving forces behind our success. We
                pride ourselves on staying ahead of the curve, offering the most
                innovative products and solutions to our valued customers.
              </p>
            </div>
            <div className="relative h-64 md:h-full">
              <img
                src="https://m.media-amazon.com/images/I/71YYJ0eZvYL._AC_UF1000,1000_QL80_.jpg"
                alt="MobileShop Store"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center mb-8">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Phone,
                title: "Innovation",
                description:
                  "We stay at the cutting edge of mobile technology.",
              },
              {
                icon: HeartHandshake,
                title: "Customer First",
                description: "Your satisfaction is our top priority.",
              },
              {
                icon: Truck,
                title: "Reliability",
                description: "Fast and dependable service, every time.",
              },
              {
                icon: ShoppingBag,
                title: "Quality",
                description: "We offer only the best products in the market.",
              },
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <value.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At MobileShop, our mission is to connect people through
              technology. We strive to provide our customers with the best
              mobile devices and accessories, coupled with exceptional service
              and support. Our goal is to enhance lives by making cutting-edge
              technology accessible to everyone.
            </p>
          </div>

          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for passionate individuals to join our
              growing team. If you love technology and want to be part of an
              exciting, fast-paced industry, we want to hear from you!
            </p>
            <Button asChild>
              <Link to="/contactUs" className="text-gray-100 bg-cyan-600">
                View Open Positions
              </Link>
            </Button>
          </div>
        </main>
      </div>
      {/* </div> */}
      <Footer />
    </>
  );
}
