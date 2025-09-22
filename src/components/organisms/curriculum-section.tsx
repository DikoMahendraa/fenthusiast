"use client"

import { motion } from "framer-motion"
import { GitBranch, Code, Palette, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const topics = [
  {
    icon: GitBranch,
    title: "Git & Version Control",
    description: "Pelajari dasar-dasar Git untuk mengelola kode dan berkolaborasi dengan tim",
    items: ["Git basics", "GitHub workflow", "Branching & merging", "Collaboration"],
  },
  {
    icon: Code,
    title: "HTML & Semantic Web",
    description: "Membangun struktur web yang solid dengan HTML semantik dan accessible",
    items: ["HTML5 elements", "Semantic markup", "Forms & validation", "Accessibility"],
  },
  {
    icon: Palette,
    title: "CSS & Styling",
    description: "Menguasai CSS untuk membuat tampilan web yang menarik dan responsif",
    items: ["CSS fundamentals", "Flexbox & Grid", "Responsive design", "Animations"],
  },
  {
    icon: Zap,
    title: "Modern CSS Tools",
    description: "Menggunakan tools modern seperti SCSS dan TailwindCSS untuk efisiensi",
    items: ["SCSS/Sass", "TailwindCSS", "CSS-in-JS", "Design systems"],
  },
]

export function CurriculumSection() {
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
            Apa yang <span className="text-primary">dipelajari?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Kurikulum lengkap yang dirancang untuk membangun fondasi frontend development yang kuat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                      whileHover={{ rotate: 5 }}
                    >
                      <topic.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <CardTitle className="font-space-grotesk">{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{topic.description}</p>
                  <ul className="space-y-2">
                    {topic.items.map((item, itemIndex) => (
                      <motion.li
                        key={item}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {item}
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
