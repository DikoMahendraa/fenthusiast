"use client"

import { motion } from "framer-motion"
import { Heart, Users, Target, Lightbulb, Code, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Learning",
      description: "Kami percaya bahwa belajar adalah perjalanan yang menyenangkan, bukan beban.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Membangun komunitas developer yang saling mendukung dan berbagi pengetahuan.",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Setiap materi dirancang dengan tujuan yang jelas dan terukur.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Menggunakan pendekatan pembelajaran yang inovatif dan up-to-date.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Siswa Aktif" },
    { number: "500+", label: "Materi Pembelajaran" },
    { number: "50+", label: "Project Praktis" },
    { number: "95%", label: "Tingkat Kepuasan" },
  ]

  const team = [
    {
      name: "Andiko Mahendra",
      role: "Founder & Frontend Engineer",
      description: "Frontend developer dengan 5+ tahun pengalaman di industri tech dalam dan luar negeri.",
    },
  ]

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-sketch-primary mb-6 font-sketch">Tentang FEnthusiast</h1>
            <p className="text-xl text-sketch-secondary max-w-2xl mx-auto leading-relaxed">
              Platform pembelajaran frontend development yang dirancang khusus untuk developer Indonesia yang ingin
              menguasai teknologi web modern.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sketch-primary mb-6 font-sketch">Misi Kami</h2>
            <p className="text-lg text-sketch-secondary max-w-3xl mx-auto leading-relaxed">
              Memberdayakan developer Indonesia dengan pengetahuan frontend development yang praktis, up-to-date, dan
              dapat langsung diterapkan di dunia kerja.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-sketch-primary/20 hover:border-sketch-accent/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-sketch-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-sketch-accent" />
                    </div>
                    <h3 className="font-semibold text-sketch-primary mb-2">{value.title}</h3>
                    <p className="text-sm text-sketch-secondary leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-sketch-primary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sketch-primary mb-4 font-sketch">Pencapaian Kami</h2>
            <p className="text-lg text-sketch-secondary">
              Angka-angka yang menunjukkan komitmen kami terhadap kualitas pembelajaran
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-sketch-accent mb-2">{stat.number}</div>
                <div className="text-sketch-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sketch-primary mb-6 font-sketch">Tim Kami</h2>
            <p className="text-lg text-sketch-secondary max-w-2xl mx-auto">
              Instruktur berpengalaman yang siap membimbing perjalanan belajar Anda
            </p>
          </motion.div>

          <div className="flex justify-center mx-auto lg:max-w-sm max-w-full">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-sketch-primary/20 hover:border-sketch-accent/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-sketch-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="w-10 h-10 text-sketch-accent" />
                    </div>
                    <h3 className="font-semibold text-sketch-primary mb-1">{member.name}</h3>
                    <p className="text-sketch-accent text-sm mb-3">{member.role}</p>
                    <p className="text-sm text-sketch-secondary leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-sketch-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sketch-primary mb-6 font-sketch">
              Siap Memulai Perjalanan Belajar?
            </h2>
            <p className="text-lg text-sketch-secondary mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan developer lainnya dan mulai kuasai frontend development hari ini juga!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="/register">
                  <Star className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Daftar Sekarang
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group bg-transparent">
                <Link href="/belajar">
                  <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Lihat Materi
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
