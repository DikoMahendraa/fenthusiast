"use client"

import { motion } from "framer-motion"
import { Play, FileText, Bot, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const systems = [
  {
    icon: Play,
    title: "Video Interaktif",
    description: "Pembelajaran melalui video berkualitas tinggi dengan penjelasan step-by-step",
    features: ["HD Quality", "Subtitle Indonesia", "Playback Speed Control", "Progress Tracking"],
  },
  {
    icon: FileText,
    title: "Materi Teks",
    description: "Dokumentasi lengkap dalam format teks yang mudah dipahami dan dicari",
    features: ["Searchable Content", "Code Examples", "Interactive Demos", "Downloadable"],
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Dukungan AI 24/7 untuk menjawab pertanyaan dan membantu debugging",
    features: ["Instant Answers", "Code Review", "Personalized Tips", "Learning Path"],
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Bergabung dengan komunitas developer untuk diskusi dan networking",
    features: ["Telegram Group", "Code Reviews", "Project Showcase", "Mentorship"],
  },
]

export function LearningSystem() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">
            Sistem <span className="text-primary">Pembelajaran</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Berbagai metode pembelajaran yang disesuaikan dengan gaya belajar Anda
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                <CardContent className="p-8">
                  <motion.div
                    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <system.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 font-space-grotesk">{system.title}</h3>

                  <p className="text-muted-foreground mb-6">{system.description}</p>

                  <ul className="space-y-3">
                    {system.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
