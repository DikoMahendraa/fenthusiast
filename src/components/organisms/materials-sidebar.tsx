"use client"

import { motion } from "framer-motion"
import { CheckCircle, Play, FileText, Book } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Material {
  id: string
  title: string
  completed: boolean
}

interface MaterialsSidebarProps {
  materials: Material[]
  currentMaterialId: string
  onMaterialSelect: (id: string) => void
}

export function MaterialsSidebar({ materials, currentMaterialId, onMaterialSelect }: MaterialsSidebarProps) {
  const completedCount = materials.filter((m) => m.completed).length
  const progressPercentage = (completedCount / materials.length) * 100

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-muted/30 border-r overflow-y-auto z-20">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Book className="w-6 h-6 text-primary" />
          <h2 className="font-bold text-lg font-space-grotesk">Materi Pembelajaran</h2>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Progress Belajar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Selesai</span>
                <span>
                  {completedCount}/{materials.length}
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {Math.round(progressPercentage)}% Complete
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Materials List */}
        <div className="space-y-3">
          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition-all duration-200 hover:shadow-md",
                  currentMaterialId === material.id ? "border-primary bg-primary/5" : "hover:border-primary/50",
                )}
                onClick={() => onMaterialSelect(material.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {material.completed ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted-foreground rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={cn(
                          "font-medium text-sm truncate",
                          currentMaterialId === material.id ? "text-primary" : "",
                        )}
                      >
                        {material.title}
                      </h3>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <span className="mr-2">#{index + 1}</span>
                        {currentMaterialId === material.id && (
                          <span className="text-primary font-medium">Sedang dipelajari</span>
                        )}
                      </div>
                    </div>

                    {currentMaterialId === material.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-primary rounded-full"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View Toggle */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-3">Format Pembelajaran</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center space-x-2 p-2 rounded-md bg-primary/10 text-primary text-xs">
                <Play className="w-3 h-3" />
                <span>Video</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-2 rounded-md border text-xs">
                <FileText className="w-3 h-3" />
                <span>Text</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
