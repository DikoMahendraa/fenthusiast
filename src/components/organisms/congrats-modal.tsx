"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Star, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CongratsModalProps {
  isOpen: boolean
  onClose: () => void
  onBackToHome: () => void
}

export function CongratsModal({ isOpen, onClose, onBackToHome }: CongratsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="w-full max-w-md border-2 border-primary/20">
              <CardContent className="p-8 text-center">
                {/* Animated Trophy */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <Trophy className="w-10 h-10 text-white" />
                </motion.div>

                {/* Floating Stars */}
                <div className="relative mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${Math.random() * 40}px`,
                      }}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 180, 360],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.1,
                      }}
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                <motion.h2
                  className="text-2xl font-bold mb-4 font-space-grotesk text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Hore! 🎉
                </motion.h2>

                <motion.p
                  className="text-lg mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Kamu sudah menyelesaikan materi!
                </motion.p>

                <motion.p
                  className="text-muted-foreground mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Selamat! Kamu telah berhasil menyelesaikan semua materi pembelajaran. Terus semangat belajar dan
                  kembangkan skill frontend mu!
                </motion.p>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button onClick={onBackToHome} size="lg" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Kembali ke Beranda
                  </Button>

                  <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
                    Tutup
                  </Button>
                </motion.div>

                {/* Achievement Badge */}
                <motion.div
                  className="mt-6 p-3 bg-primary/10 rounded-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-sm font-medium text-primary">🏆 Achievement Unlocked</div>
                  <div className="text-xs text-muted-foreground">Frontend Fundamentals Complete</div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
