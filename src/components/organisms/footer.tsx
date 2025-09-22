"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Logo } from "@/components/atoms/logo"
import { Github, Twitter, Instagram, Mail } from "lucide-react"

const footerLinks = {
  Pembelajaran: [
    { href: "/learn", label: "Semua Materi" },
    { href: "/goals", label: "Learning Goals" },
    { href: "/profile", label: "Progress Saya" },
  ],
  Tentang: [
    { href: "/about", label: "Tentang FEnthusiast" },
    { href: "/mentor", label: "Tim Mentor" },
    { href: "/karir", label: "Karir" },
  ],
  Dukungan: [
    { href: "/faq", label: "FAQ" },
    { href: "/kontak", label: "Kontak" },
    { href: "/bantuan", label: "Bantuan" },
  ],
}

const socialLinks = [
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Mail, label: "Email" },
]

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground mb-6 max-w-md text-pretty">
              Platform pembelajaran frontend yang menyenangkan untuk membantu Anda menguasai teknologi web modern dari
              dasar hingga mahir.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 font-space-grotesk">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 FEnthusiast. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
