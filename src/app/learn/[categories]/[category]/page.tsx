"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/organisms/video-player"
import { TextContent } from "@/components/organisms/text-content"
import { MaterialsSidebar } from "@/components/organisms/materials-sidebar"
import { CongratsModal } from "@/components/organisms/congrats-modal"

// Mock data - in real app this would come from API/database
const materialsData = {
  "git-fundamentals": {
    title: "Git Fundamentals",
    description: "Pelajari dasar-dasar version control dengan Git",
    duration: "45 menit",
    videoUrl: "/placeholder.mp4",
    textContent: `
# Git Fundamentals

Git adalah sistem version control yang paling populer di dunia. Dengan Git, Anda dapat:

## Apa itu Version Control?

Version control adalah sistem yang mencatat perubahan pada file atau sekumpulan file dari waktu ke waktu sehingga Anda dapat mengingat versi tertentu nanti.

## Mengapa Git Penting?

1. **Tracking Changes**: Melacak setiap perubahan yang dibuat pada kode
2. **Collaboration**: Memungkinkan banyak developer bekerja pada proyek yang sama
3. **Backup**: Menyimpan history lengkap dari proyek Anda
4. **Branching**: Membuat cabang untuk fitur baru tanpa mengganggu kode utama

## Perintah Dasar Git

\`\`\`bash
# Inisialisasi repository baru
git init

# Menambahkan file ke staging area
git add .

# Commit perubahan
git commit -m "Initial commit"

# Melihat status repository
git status

# Melihat history commit
git log
\`\`\`

## Best Practices

- Selalu tulis commit message yang jelas dan deskriptif
- Commit perubahan secara berkala
- Gunakan branching untuk fitur baru
- Review kode sebelum merge
    `,
  },
  "html-semantic": {
    title: "HTML Semantik",
    description: "Membangun struktur web yang bermakna",
    duration: "30 menit",
    videoUrl: "/placeholder.mp4",
    textContent: `
# HTML Semantik

HTML semantik adalah penggunaan elemen HTML yang memberikan makna pada konten, bukan hanya tampilan.

## Mengapa HTML Semantik Penting?

1. **Accessibility**: Screen reader dapat memahami struktur halaman
2. **SEO**: Search engine lebih mudah memahami konten
3. **Maintainability**: Kode lebih mudah dibaca dan dipelihara

## Elemen Semantik Utama

### Header dan Navigation
\`\`\`html
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
\`\`\`

### Main Content
\`\`\`html
<main>
  <article>
    <h1>Judul Artikel</h1>
    <p>Konten artikel...</p>
  </article>
  
  <aside>
    <h2>Related Links</h2>
    <ul>
      <li><a href="#">Link 1</a></li>
    </ul>
  </aside>
</main>
\`\`\`

### Footer
\`\`\`html
<footer>
  <p>&copy; 2024 FEnthusiast</p>
</footer>
\`\`\`
    `,
  },
}

const allMaterials = [
  { id: "git-fundamentals", title: "Git Fundamentals", completed: false },
  { id: "html-semantic", title: "HTML Semantik", completed: false },
  { id: "css-flexbox", title: "CSS Flexbox", completed: false },
  { id: "responsive-design", title: "Responsive Design", completed: false },
  { id: "tailwind-intro", title: "TailwindCSS", completed: false },
  { id: "javascript-basics", title: "JavaScript Basics", completed: false },
]

export default function LearningPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()

  const materialId = params["detail-materi"] as string
  const viewType = searchParams.get("type") || "video"

  const [currentMaterial, setCurrentMaterial] = useState(materialsData[materialId as keyof typeof materialsData])
  const [materials, setMaterials] = useState(allMaterials)
  const [showCongrats, setShowCongrats] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (materialId && materialsData[materialId as keyof typeof materialsData]) {
      setCurrentMaterial(materialsData[materialId as keyof typeof materialsData])
    }
  }, [materialId])

  const handleVideoEnd = () => {
    markAsCompleted()
    navigateToNext()
  }

  const markAsCompleted = () => {
    setMaterials((prev) =>
      prev.map((material) => (material.id === materialId ? { ...material, completed: true } : material)),
    )

    const completedCount = materials.filter((m) => m.completed || m.id === materialId).length
    const newProgress = (completedCount / materials.length) * 100
    setProgress(newProgress)

    if (completedCount === materials.length) {
      setShowCongrats(true)
    }
  }

  const navigateToNext = () => {
    const currentIndex = materials.findIndex((m) => m.id === materialId)
    const nextMaterial = materials[currentIndex + 1]

    if (nextMaterial) {
      router.push(`/belajar/${params["nama-materi"]}/${nextMaterial.id}?type=${viewType}`)
    }
  }

  const navigateToPrevious = () => {
    const currentIndex = materials.findIndex((m) => m.id === materialId)
    const prevMaterial = materials[currentIndex - 1]

    if (prevMaterial) {
      router.push(`/belajar/${params["nama-materi"]}/${prevMaterial.id}?type=${viewType}`)
    }
  }

  if (!currentMaterial) {
    return <div>Material tidak ditemukan</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <MaterialsSidebar
          materials={materials}
          currentMaterialId={materialId}
          onMaterialSelect={(id) => {
            router.push(`/belajar/${params["nama-materi"]}/${id}?type=${viewType}`)
          }}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-80">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" onClick={() => router.push("/belajar")}>
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Kembali
                </Button>
                <div>
                  <h1 className="font-bold text-lg font-space-grotesk">{currentMaterial.title}</h1>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{currentMaterial.duration}</span>
                    <Badge variant={viewType === "video" ? "default" : "secondary"}>
                      {viewType === "video" ? "Video" : "Text"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
                <Progress value={progress} className="w-24" />
              </div>
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${materialId}-${viewType}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {viewType === "video" ? (
                  <VideoPlayer
                    videoUrl={currentMaterial.videoUrl}
                    title={currentMaterial.title}
                    onVideoEnd={handleVideoEnd}
                  />
                ) : (
                  <TextContent content={currentMaterial.textContent} onComplete={markAsCompleted} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={navigateToPrevious}
                disabled={materials.findIndex((m) => m.id === materialId) === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Sebelumnya
              </Button>

              <Button
                onClick={() => {
                  markAsCompleted()
                  navigateToNext()
                }}
                disabled={materials.findIndex((m) => m.id === materialId) === materials.length - 1}
              >
                Selanjutnya
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CongratsModal
        isOpen={showCongrats}
        onClose={() => setShowCongrats(false)}
        onBackToHome={() => router.push("/")}
      />
    </div>
  )
}
