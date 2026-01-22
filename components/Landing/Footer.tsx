"use client";

import React from "react";
import {
  FaShieldAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBrain,
  FaVideo,
  FaUserShield,
  FaLock,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="w-full px-4 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <FaShieldAlt className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-primary">
                  MedSecure
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  Secure Telemedicine
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              India's first secure telemedicine platform combining 
              healthcare-grade encryption with real-time AI decision 
              support for clinical excellence.
            </p>

            <div className="flex items-center gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Core Features - Updated for Problem Statement 3 */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold">
              <FaBrain className="w-5 h-5" />
              <h3 className="text-lg">Intelligent Systems</h3>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {[
                { label: "NLP Symptom Extraction", href: "/soon" },
                { label: "AI Decision Support", href: "/soon" },
                { label: "Smart Clinical Summaries", href: "/consultation/summary" },
                { label: "Specialist Matching", href: "/soon" },
                { label: "Diagnostic Analytics", href: "/soon" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Security - Mandatory Requirement */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold">
              <FaUserShield className="w-5 h-5" />
              <h3 className="text-lg">Trust & Security</h3>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {[
                { label: "End-to-End Encryption", icon: FaLock },
                { label: "Role-Based Access (RBAC)", icon: FaUserShield },
                { label: "Zero-Trust Architecture", icon: FaShieldAlt },
                { label: "HIPAA/DISHA Alignment", icon: FaShieldAlt },
                { label: "Data Sovereignty", icon: FaShieldAlt },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                   <item.icon className="w-3 h-3 text-emerald-500" />
                   {item.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours - Indian Localization */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold">
              <FaVideo className="w-5 h-5" />
              <h3 className="text-lg">Clinical Support</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-muted-foreground">
                <FaMapMarkerAlt className="w-5 h-5 text-primary shrink-0" />
                <span>
                  Sector 62, Electronic City
                  <br />
                  Noida, Uttar Pradesh
                  <br />
                  India 201309
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <FaPhone className="w-5 h-5 text-primary" />
                <a href="tel:+91-120-456-7890" className="hover:text-primary transition-colors">
                  +91-120-456-7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <FaEnvelope className="w-5 h-5 text-primary" />
                <a href="mailto:support@medsecure.in" className="hover:text-primary transition-colors">
                  support@medsecure.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-xs font-medium text-muted-foreground text-center md:text-left uppercase tracking-widest">
              © {new Date().getFullYear()} MedSecure India. Protected by Healthcare-Grade Encryption.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {["Privacy Policy", "Terms of Service", "Security Audit"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-xs uppercase tracking-widest font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 24/7 Security Banner */}
      <div className="w-full bg-primary py-2 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3">
            <FaLock className="h-3 w-3 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-[0.2em]">
              Security Objective: Zero Data Leakage • 24/7 Monitoring Enabled
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}