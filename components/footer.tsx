"use client";

import Link from "next/link";
import { Facebook, Linkedin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1F2937] text-[#F9FAFB] py-8 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold mb-3">NETO </h4>
            <p className="text-sm leading-relaxed">
              Committed to delivering accessible financial services to empower
              individuals and communities across Cambodia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#E11D48] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#E11D48] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-[#E11D48] transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#E11D48] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <div className="text-sm space-y-2">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" /> +855 23 999 888
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" /> info@NETO.com.kh
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 hover:text-[#E11D48] transition-colors" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 hover:text-[#E11D48] transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-4 text-center text-xs text-white/50">
          © {new Date().getFullYear()} NETO Testing. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
