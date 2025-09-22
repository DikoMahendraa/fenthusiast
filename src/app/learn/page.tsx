"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Play, FileText, Clock, Tag, Grid, List } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/molecules/navbar"

// Mock materials data
const allMaterials = [
  {
    id: "git-fundamentals",
    title: "Git Fundamentals",
    description: "Pelajari dasar-dasar version control dengan Git untuk mengelola kode dan berkolaborasi dengan tim",
    duration: "45 menit",
    type: "video",
    category: "Git",
    level: "Beginner",
    tags: ["version-control", "collaboration", "basics"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=Git+Fundamentals",
    slug: "git-fundamentals",
    completed: false,
  },
  {
    id: "html-semantic",
    title: "HTML Semantik",
    description: "Membangun struktur web yang bermakna dengan HTML semantik dan accessible",
    duration: "30 menit",
    type: "text",
    category: "HTML",
    level: "Beginner",
    tags: ["html", "semantic", "accessibility"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=HTML+Semantic",
    slug: "html-semantic",
    completed: true,
  },
  {
    id: "css-flexbox",
    title: "CSS Flexbox Layout",
    description: "Menguasai layout modern dengan Flexbox untuk membuat tata letak yang responsif",
    duration: "60 menit",
    type: "video",
    category: "CSS",
    level: "Intermediate",
    tags: ["css", "flexbox", "layout", "responsive"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=CSS+Flexbox",
    slug: "css-flexbox",
    completed: true,
  },
  {
    id: "responsive-design",
    title: "Responsive Web Design",
    description: "Membuat website yang responsif di semua device dengan teknik modern",
    duration: "50 menit",
    type: "text",
    category: "CSS",
    level: "Intermediate",
    tags: ["responsive", "mobile-first", "media-queries"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=Responsive+Design",
    slug: "responsive-design",
    completed: false,
  },
  {
    id: "tailwind-intro",
    title: "Pengenalan TailwindCSS",
    description: "Framework CSS utility-first untuk development yang cepat dan efisien",
    duration: "40 menit",
    type: "video",
    category: "TailwindCSS",
    level: "Beginner",
    tags: ["tailwind", "utility-first", "framework"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=TailwindCSS",
    slug: "tailwind-intro",
    completed: false,
  },
  {
    id: "javascript-basics",
    title: "JavaScript Fundamentals",
    description: "Dasar-dasar pemrograman JavaScript untuk interaktivitas web",
    duration: "90 menit",
    type: "video",
    category: "JavaScript",
    level: "Beginner",
    tags: ["javascript", "programming", "fundamentals"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=JavaScript+Basics",
    slug: "javascript-basics",
    completed: false,
  },
  {
    id: "css-grid",
    title: "CSS Grid Layout",
    description: "Sistem layout 2D yang powerful untuk membuat tata letak kompleks",
    duration: "55 menit",
    type: "text",
    category: "CSS",
    level: "Advanced",
    tags: ["css", "grid", "layout", "2d"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=CSS+Grid",
    slug: "css-grid",
    completed: false,
  },
  {
    id: "scss-advanced",
    title: "Advanced SCSS Techniques",
    description: "Teknik lanjutan SCSS untuk CSS yang lebih maintainable",
    duration: "65 menit",
    type: "video",
    category: "SCSS",
    level: "Advanced",
    tags: ["scss", "sass", "preprocessor", "advanced"],
    thumbnail: "/placeholder.svg?height=200&width=300&text=Advanced+SCSS",
    slug: "scss-advanced",
    completed: false,
  },
]

const categories = ["Semua", "Git", "HTML", "CSS", "TailwindCSS", "SCSS", "JavaScript"]
const levels = ["Semua Level", "Beginner", "Intermediate", "Advanced"]

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [selectedLevel, setSelectedLevel] = useState("Semua Level")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("all")

  const filteredMaterials = useMemo(() => {
    let filtered = allMaterials

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (material) =>
          material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          material.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((material) => material.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== "Semua Level") {
      filtered = filtered.filter((material) => material.level === selectedLevel)
    }

    // Filter by tab
    if (activeTab === "video") {
      filtered = filtered.filter((material) => material.type === "video")
    } else if (activeTab === "text") {
      filtered = filtered.filter((material) => material.type === "text")
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLevel, activeTab])

  const stats = {
    total: allMaterials.length,
    video: allMaterials.filter((m) => m.type === "video").length,
    text: allMaterials.filter((m) => m.type === "text").length,
    completed: allMaterials.filter((m) => m.completed).length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">
            Semua <span className="text-primary">Materi</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Jelajahi koleksi lengkap materi pembelajaran frontend dari dasar hingga mahir
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Materi</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.video}</div>
              <div className="text-sm text-muted-foreground">Video</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.text}</div>
              <div className="text-sm text-muted-foreground">Text</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Selesai</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Cari materi, topik, atau tag..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Pilih level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="all" className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Semua ({stats.total})</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Video ({stats.video})</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Text ({stats.text})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${searchQuery}-${selectedCategory}-${selectedLevel}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredMaterials.length === 0 ? (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <div className="text-muted-foreground mb-4">
                          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg">Tidak ada materi yang ditemukan</p>
                          <p className="text-sm">Coba ubah filter atau kata kunci pencarian</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSearchQuery("")
                            setSelectedCategory("Semua")
                            setSelectedLevel("Semua Level")
                          }}
                        >
                          Reset Filter
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <div
                      className={
                        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
                      }
                    >
                      {filteredMaterials.map((material, index) => (
                        <motion.div
                          key={material.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          {viewMode === "grid" ? (
                            <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 group">
                              <div className="relative overflow-hidden rounded-t-lg">
                                <img
                                  src={material.thumbnail || "/placeholder.svg"}
                                  alt={material.title}
                                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-3 left-3">
                                  <Badge variant={material.type === "video" ? "default" : "secondary"}>
                                    {material.type === "video" ? (
                                      <Play className="w-3 h-3 mr-1" />
                                    ) : (
                                      <FileText className="w-3 h-3 mr-1" />
                                    )}
                                    {material.type}
                                  </Badge>
                                </div>
                                <div className="absolute top-3 right-3">
                                  <Badge variant="outline" className="bg-background/80">
                                    {material.level}
                                  </Badge>
                                </div>
                                {material.completed && (
                                  <div className="absolute bottom-3 right-3">
                                    <Badge className="bg-green-500">✓ Selesai</Badge>
                                  </div>
                                )}
                              </div>
                              <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                  <CardTitle className="font-space-grotesk text-lg line-clamp-2">
                                    {material.title}
                                  </CardTitle>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {material.duration}
                                  <span className="mx-2">•</span>
                                  <Badge variant="outline" className="text-xs">
                                    {material.category}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                  {material.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {material.tags.slice(0, 3).map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <Button asChild className="w-full">
                                  <Link href={`/learn/frontend/${material.slug}?type=${material.type}`}>
                                    Mulai Belajar
                                  </Link>
                                </Button>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                              <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                  <img
                                    src={material.thumbnail || "/placeholder.svg"}
                                    alt={material.title}
                                    className="w-24 h-16 object-cover rounded-lg flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                      <h3 className="font-semibold text-lg font-space-grotesk line-clamp-1">
                                        {material.title}
                                      </h3>
                                      <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                                        <Badge variant={material.type === "video" ? "default" : "secondary"}>
                                          {material.type === "video" ? (
                                            <Play className="w-3 h-3 mr-1" />
                                          ) : (
                                            <FileText className="w-3 h-3 mr-1" />
                                          )}
                                          {material.type}
                                        </Badge>
                                        {material.completed && <Badge className="bg-green-500">✓ Selesai</Badge>}
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                      {material.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center text-sm text-muted-foreground">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {material.duration}
                                        <span className="mx-2">•</span>
                                        <Badge variant="outline" className="text-xs">
                                          {material.category}
                                        </Badge>
                                        <span className="mx-2">•</span>
                                        <Badge variant="outline" className="text-xs">
                                          {material.level}
                                        </Badge>
                                      </div>
                                      <Button asChild>
                                        <Link href={`/learn/frontend/${material.slug}?type=${material.type}`}>
                                          Mulai Belajar
                                        </Link>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
