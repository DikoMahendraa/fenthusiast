"use client"

import { motion } from "framer-motion"
import { TrendingUp, Users, Clock, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: TrendingUp,
    title: "Karir yang Menjanjikan",
    description: "Frontend developer memiliki prospek karir yang cerah dengan gaji rata-rata 8-15 juta per bulan",
    salary: "Rp 8-15 juta/bulan",
  },
  {
    icon: Users,
    title: "Permintaan Tinggi",
    description: "Industri teknologi terus berkembang dan membutuhkan lebih banyak frontend developer",
    salary: "Demand tinggi",
  },
  {
    icon: Clock,
    title: "Fleksibilitas Kerja",
    description: "Banyak peluang remote work dan freelance dengan jam kerja yang fleksibel",
    salary: "Work-life balance",
  },
  {
    icon: Award,
    title: "Skill yang Relevan",
    description: "Teknologi frontend terus berkembang, memberikan peluang pembelajaran berkelanjutan",
    salary: "Future-proof",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">
            Kenapa harus belajar <span className="text-primary">Frontend?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Frontend development adalah salah satu skill paling dicari di industri teknologi saat ini
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2 font-space-grotesk">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                  <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {benefit.salary}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
