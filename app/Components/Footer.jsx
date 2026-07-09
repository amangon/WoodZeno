"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Github,
} from "lucide-react";

const socialLinks = [
  {
    name: "Github",
    href: "https://www.github.com/ritesh025",
    Icon: Github,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mr_raja_018",
    Icon: Instagram,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/mrraja018",
    Icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/riteshbafna25/",
    Icon: Linkedin,
  },
];


const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* MAIN FOOTER */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* BRAND */}
          <div className="pb-2">
            <h3 className="text-2xl font-extrabold inline">
              <span
                className="bg-linear-to-b from-[#914402] via-[#c9a36a] to-[#b96d03] 
                   bg-clip-text text-transparent shadow-lg"
              >
                Wood
              </span>
              <span
                className="ml-1 bg-linear-to-r from-[#eaeaea] via-[#b8b8b8] to-[#bababa]
                   bg-clip-text text-transparent drop-shadow-lg "
              >
                Zeno
              </span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 mt-2">
              Thoughtfully crafted furniture and interior solutions designed to
              elevate modern living spaces with comfort, durability, and style.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-4 mt-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="
        w-10 h-10 rounded-full
        bg-white/10
        flex items-center justify-center
        transition
        hover:bg-rose-500 hover:scale-110 hover:-translate-y-2
      "
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Home",
                "Shop",
                "Interior Design",
                "About Us",
                "Testimonials",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-rose-400 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Custom Furniture",
                "Interior Planning",
                "Space Optimization",
                "3D Visualization",
                "Installation",
                "After Sales Support",
              ].map((service) => (
                <li key={service}>
                  <span className="hover:text-rose-400 transition cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin size={18} className="text-rose-500" />
                <span>Chhattisgarh, India</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-rose-500" />
                <span>+91 70XXX XXXXX</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-rose-500" />
                <span>support@woodzeno.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-[15px] text-gray-400">
          <p>
            © {new Date().getFullYear()} WoodZeno | Ritesh Bafna. All rights
            reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-rose-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-rose-400 transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-rose-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
