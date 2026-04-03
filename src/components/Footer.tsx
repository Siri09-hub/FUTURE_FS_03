import { Coffee, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary">
    <div className="container mx-auto px-6 py-16">
      <div className="grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="h-6 w-6 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">BlueWave Café & Bistro</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Bhimavaram's favourite spot for premium coffee, gourmet bites, and good vibes.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-foreground font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-3">
            {[{ to: "/", label: "Home" }, { to: "/menu", label: "Menu" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map(l => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-foreground font-semibold mb-4">Get In Touch</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Main Road, Bhimavaram, AP 534201</span>
            <span className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 88855 51234</span>
            <span className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@bluewavecafe.in</span>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BlueWave Café & Bistro. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
