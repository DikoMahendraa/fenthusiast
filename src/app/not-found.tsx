"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Home, BookOpen, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="text-[120px] md:text-[180px] font-bold text-sketch-primary/20 leading-none">404</div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Search className="w-16 h-16 text-sketch-secondary" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl md:text-4xl font-bold text-sketch-primary font-sketch"
            >
              Halaman Tidak Ditemukan
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-sketch-secondary max-w-md mx-auto leading-relaxed"
            >
              Sepertinya halaman yang kamu cari sudah pindah atau tidak ada. Mari kembali ke pembelajaran!
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button asChild size="lg" className="group">
              <Link href="/">
                <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group bg-transparent">
              <Link href="/belajar">
                <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Lihat Materi Belajar
              </Link>
            </Button>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-8 border-t border-sketch-primary/20"
          >
            <p className="text-sm text-sketch-secondary mb-4">Atau coba halaman lainnya:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/about"
                className="text-sketch-accent hover:text-sketch-primary transition-colors hover:underline"
              >
                Tentang Kami
              </Link>
              <Link
                href="/profile"
                className="text-sketch-accent hover:text-sketch-primary transition-colors hover:underline"
              >
                Profil Saya
              </Link>
              <Link
                href="/goals"
                className="text-sketch-accent hover:text-sketch-primary transition-colors hover:underline"
              >
                Target Belajar
              </Link>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-sketch-secondary hover:text-sketch-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Halaman Sebelumnya
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
