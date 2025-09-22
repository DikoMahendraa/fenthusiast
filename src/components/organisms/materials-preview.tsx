"use client"

import { motion } from "framer-motion"
import { Play, FileText, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const materials = [
  {
    id: "git-basics",
    title: "Git Fundamentals",
    description: "Pelajari dasar-dasar version control dengan Git",
    duration: "45 menit",
    type: "video",
    slug: "git-fundamentals",
  },
  {
    id: "html-semantic",
    title: "HTML Semantik",
    description: "Membangun struktur web yang bermakna",
    duration: "30 menit",
    type: "text",
    slug: "html-semantic",
  },
  {
    id: "css-flexbox",
    title: "CSS Flexbox Layout",
    description: "Menguasai layout modern dengan Flexbox",
    duration: "60 menit",
    type: "video",
    slug: "css-flexbox",
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description: "Membuat website yang responsif di semua device",
    duration: "50 menit",
    type: "text",
    slug: "responsive-design",
  },
  {
    id: "tailwind-intro",
    title: "Pengenalan TailwindCSS",
    description: "Framework CSS utility-first untuk development cepat",
    duration: "40 menit",
    type: "video",
    slug: "tailwind-intro",
  },
  {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    description: "Dasar-dasar pemrograman JavaScript",
    duration: "90 menit",
    type: "video",
    slug: "javascript-basics",
  },
]

export function MaterialsPreview() {
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
            Preview <span className="text-primary">Materi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Lihat sekilas materi pembelajaran yang tersedia dalam platform kami
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="font-space-grotesk text-lg mb-2">{material.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mb-3">{material.description}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        {material.type === "video" ? (
                          <Play className="w-3 h-3 mr-1" />
                        ) : (
                          <FileText className="w-3 h-3 mr-1" />
                        )}
                        {material.duration}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full group-hover:border-primary/50 bg-transparent">
                        Pilih Format
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      <DropdownMenuItem asChild>
                        <Link href={`/learn/${material.slug}?type=video`} className="flex items-center">
                          <Play className="mr-2 h-4 w-4" />
                          Lihat Video
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/learn/${material.slug}?type=text`} className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Lihat Materi (Text)
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button size="lg" asChild>
            <Link href="/learn">Lihat Semua Materi</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
