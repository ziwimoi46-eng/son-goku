import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { Lightbox } from "@/components/lightbox";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  UtensilsCrossed,
  ChefHat,
  Star,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// --- Static Data ---
const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Menu", href: "#menu" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const MENU_IMAGES = [
  { src: "/images/menu_board.jpg", alt: "Main Menu Board" },
  { src: "/images/menu_prices.jpg", alt: "Menu Prices" },
  { src: "/images/menu_extras.jpg", alt: "Extras & Drinks" },
];

const GALLERY_IMAGES = [
  { src: "/images/food_burger_ad.jpg", alt: "Signature Zinger Burger", span: "col-span-1 md:col-span-2 row-span-2" },
  { src: "/images/food_fried_chicken.jpg", alt: "Crispy Fried Chicken", span: "col-span-1 row-span-1" },
  { src: "/images/food_fries_real.jpg", alt: "Peri Peri Fries", span: "col-span-1 row-span-1" },
  { src: "/images/brand_fried_chicken.jpg", alt: "Our Special Fried Chicken", span: "col-span-1 row-span-1" },
  { src: "/images/food_burger.jpg", alt: "Zinger Burger", span: "col-span-1 row-span-1" },
  { src: "/images/interior_seating.jpg", alt: "Restaurant Seating", span: "col-span-1 md:col-span-2 row-span-1" },
];

const REVIEWS = [
  {
    name: "Yaser Khan",
    rating: 5,
    text: "Love this place, most tasty fried chicken you can find right now in Aurangabad. The quality and taste are unmatched.",
    date: "3 years ago"
  },
  {
    name: "Sumaiya Siddiqui",
    rating: 5,
    text: "Beautiful crispy chicken and fries. The best in Aurangabad. Very clean and hygienic place for family.",
    date: "1 year ago"
  },
  {
    name: "Majroddin Sayyad",
    rating: 5,
    text: "A delightful treat for chicken lover. This place is really very awesome. Value for money and great service.",
    date: "1 year ago"
  },
  {
    name: "Ahmad Raza Chishti",
    rating: 5,
    text: "Best food in Overall Aurangabad. Must visit here anytime. The grilled chicken is a must-try!",
    date: "1 year ago"
  },
  {
    name: "Sameer Ali Sayyed",
    rating: 5,
    text: "Tried Spicy chicken kulcha and makhani chicken kulcha. Both were impressively well. Creamy mayonnaise and honey chilli sauce.",
    date: "2 years ago"
  }
];

// --- Components ---

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="container-custom h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-wider">
            RIZ<span className="text-primary">FC</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-white/80 hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#book"
            className="bg-primary text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors uppercase text-sm tracking-wide"
          >
            Book Table
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-2">
            <span className={`block w-8 h-0.5 bg-current transition-transform ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`block w-8 h-0.5 bg-current transition-opacity ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block w-8 h-0.5 bg-current transition-transform ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-black border-t border-white/10"
        >
          <div className="flex flex-col p-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold uppercase tracking-widest text-white/80 hover:text-primary"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-black font-bold px-6 py-3 rounded text-center uppercase tracking-wide"
            >
              Book A Table
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-black">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="/images/store_front.jpg"
          alt="Riz Fried Chicken Storefront"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
          style={{ animationDuration: '20s' }}
        />
      </div>

      <div className="container-custom relative z-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="text-primary font-bold text-lg md:text-xl uppercase tracking-[0.2em] mb-4 block">
            Premium Fast Food
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white leading-[0.9] mb-6">
            HOT.<br />
            CRISPY.<br />
            <span className="text-primary-foreground text-stroke-primary">GRILLED.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-xl mb-10 leading-relaxed">
            Experience the perfect crunch and juicy tenderness. 
            Freshly prepared, 100% Halal, and crafted with passion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#menu" className="btn-primary text-center">
              View Our Menu
            </a>
            <a 
              href="#book" 
              className="px-8 py-4 rounded-full border-2 border-white text-white font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 text-center"
            >
              Book a Table
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  const features = [
    { icon: ChefHat, title: "Freshly Prepared", desc: "Never frozen, always fresh chicken prepared daily in our kitchen." },
    { icon: Star, title: "Premium Quality", desc: "We use only the finest ingredients and authentic spice blends." },
    { icon: UtensilsCrossed, title: "100% Halal", desc: "Strictly Halal certified meat and preparation processes." },
    { icon: Users, title: "Family Friendly", desc: "A warm, welcoming atmosphere for friends and families." },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-subtitle">Our Story</span>
            <h2 className="section-title text-left mb-6 text-black">
              PASSION FOR <span className="text-primary">PERFECTION</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              At Riz Fried Chicken, we believe fast food should feel premium. Our journey began with a simple mission: to serve the crispiest fried chicken and the most succulent grilled dishes without compromising on quality.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Every piece of chicken is marinated in our secret blend of spices, battered by hand, and cooked to golden perfection. Whether you're here for a quick bite or a family dinner, we promise a meal that hits the spot every time.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{f.title}</h4>
                    <p className="text-sm text-gray-500 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 transform rotate-3 rounded-2xl" />
            <img 
              src="/images/interior_wall.jpg" 
              alt="Restaurant Interior" 
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[600px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MenuSection({ onOpenLightbox }: { onOpenLightbox: (src: string) => void }) {
  return (
    <section id="menu" className="py-20 bg-secondary text-white relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-subtitle">Discover Our Flavors</span>
          <h2 className="section-title text-white">OUR <span className="text-primary">MENU</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            From our signature buckets to grilled delights, explore our diverse menu. Click on any menu card to view details.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {MENU_IMAGES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onOpenLightbox(item.src)}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[3/4] border border-white/10 shadow-xl bg-black/50">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <UtensilsCrossed className="w-8 h-8 text-black" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mt-4 text-center group-hover:text-primary transition-colors">{item.alt}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title text-black">WHAT OUR <span className="text-primary">CUSTOMERS SAY</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 flex-grow">"{review.text}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                <span className="font-bold text-black">{review.name}</span>
                <span className="text-xs text-gray-400 uppercase">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery({ onOpenLightbox }: { onOpenLightbox: (src: string) => void }) {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">Visual Feast</span>
          <h2 className="section-title text-black">FOOD <span className="text-primary">GALLERY</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${img.span}`}
              onClick={() => onOpenLightbox(img.src)}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-white font-bold font-display text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  const { mutate, isPending } = useCreateBooking();
  
  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      guests: 2,
      date: new Date().toISOString().split('T')[0],
      time: "19:00",
    },
  });

  function onSubmit(data: InsertBooking) {
    mutate(data);
  }

  return (
    <section id="book" className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-black">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">
              BOOK A <br />TABLE NOW
            </h2>
            <p className="text-xl font-medium mb-8 max-w-md">
              Skip the wait! Reserve your spot and enjoy our premium chicken with friends and family.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-primary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold uppercase text-sm opacity-70">Call Us</p>
                  <p className="text-2xl font-display font-bold">+91 85529 97625</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black text-primary rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold uppercase text-sm opacity-70">Email Us</p>
                  <p className="text-xl font-display font-bold">rizwanrhan124@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-gray-50 border-gray-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" className="bg-gray-50 border-gray-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" className="bg-gray-50 border-gray-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guests</FormLabel>
                        <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value.toString()}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border-gray-200 h-12">
                              <SelectValue placeholder="Select guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Person" : "People"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" className="bg-gray-50 border-gray-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" className="bg-gray-50 border-gray-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Request (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Allergies, high chair needed, etc." 
                          className="bg-gray-50 border-gray-200 min-h-[100px]" 
                          {...field} 
                          value={field.value || ''} // Handle null value
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold bg-black text-white hover:bg-gray-800"
                  disabled={isPending}
                >
                  {isPending ? "Sending Request..." : "Confirm Booking"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFooter() {
  return (
    <footer id="contact" className="bg-black text-white pt-20 pb-10 border-t border-white/10">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-display font-bold tracking-wider">
                RIZ<span className="text-primary">FC</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We serve the best fried and grilled chicken in town. 
              Always fresh, always Halal, and always delicious.
              Visit us today for a premium fast-food experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className="text-gray-400">
                  Riz Fried Chicken<br />
                  Main Market Road,<br />
                  City Center
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:8552997625" className="text-gray-400 hover:text-white transition-colors">
                  +91 85529 97625
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:rizwanrhan124@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  rizwanrhan124@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-gray-400">
                  Mon - Sun: 11:00 AM - 11:00 PM
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">Find Us</h3>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-white/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.893144133423!2d79.08815531488654!3d21.15663798592925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a3a3a3a3%3A0x3a3a3a3a3a3a3a3a!2sRiz%20Fried%20Chicken!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Riz Fried Chicken. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <MenuSection onOpenLightbox={setLightboxSrc} />
      <Gallery onOpenLightbox={setLightboxSrc} />
      <Testimonials />
      <BookingSection />
      <ContactFooter />
      
      <Lightbox 
        src={lightboxSrc} 
        onClose={() => setLightboxSrc(null)} 
      />
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/8552997625"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
