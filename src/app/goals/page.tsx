"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Calendar, CheckCircle } from "lucide-react"
import { useAtomValue } from "jotai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/molecules/navbar"
import { ProgressDashboard } from "@/components/organisms/progress-dashboard"
import { userProgressAtom } from "@/src/lib/atoms"

interface Goal {
  id: string
  title: string
  description: string
  targetDate: string
  progress: number
  completed: boolean
  type: "daily" | "weekly" | "monthly" | "custom"
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Selesaikan 3 Materi Minggu Ini",
    description: "Target menyelesaikan minimal 3 materi pembelajaran dalam seminggu",
    targetDate: "2024-12-31",
    progress: 67,
    completed: false,
    type: "weekly",
  },
  {
    id: "2",
    title: "Belajar Setiap Hari",
    description: "Mempertahankan streak belajar harian selama 30 hari",
    targetDate: "2024-12-25",
    progress: 23,
    completed: false,
    type: "daily",
  },
  {
    id: "3",
    title: "Master HTML & CSS",
    description: "Menyelesaikan semua materi HTML dan CSS",
    targetDate: "2024-12-20",
    progress: 100,
    completed: true,
    type: "custom",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetDate: "",
    type: "custom" as Goal["type"],
  })

  const userProgress = useAtomValue(userProgressAtom)

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        targetDate: newGoal.targetDate,
        progress: 0,
        completed: false,
        type: newGoal.type,
      }
      setGoals([...goals, goal])
      setNewGoal({ title: "", description: "", targetDate: "", type: "custom" })
      setShowAddGoal(false)
    }
  }

  const getGoalTypeColor = (type: Goal["type"]) => {
    switch (type) {
      case "daily":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      case "weekly":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "monthly":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">
              Learning <span className="text-primary">Goals</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Tetapkan target belajar dan pantau progress Anda untuk mencapai tujuan pembelajaran
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Goals Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Add Goal Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold font-space-grotesk">Target Belajar</h2>
                <Button onClick={() => setShowAddGoal(!showAddGoal)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Target
                </Button>
              </div>

              {/* Add Goal Form */}
              {showAddGoal && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Tambah Target Baru</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="title">Judul Target</Label>
                        <Input
                          id="title"
                          value={newGoal.title}
                          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                          placeholder="Contoh: Selesaikan 5 materi bulan ini"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Deskripsi</Label>
                        <Input
                          id="description"
                          value={newGoal.description}
                          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                          placeholder="Deskripsi detail target Anda"
                        />
                      </div>
                      <div>
                        <Label htmlFor="targetDate">Target Tanggal</Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={newGoal.targetDate}
                          onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleAddGoal}>Simpan</Button>
                        <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                          Batal
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Goals List */}
              <div className="space-y-4">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      className={`border-2 ${goal.completed ? "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10" : "hover:border-primary/20"}`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3
                                className={`font-semibold text-lg font-space-grotesk ${goal.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {goal.title}
                              </h3>
                              {goal.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{goal.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                Target: {new Date(goal.targetDate).toLocaleDateString("id-ID")}
                              </div>
                              <Badge className={getGoalTypeColor(goal.type)}>{goal.type}</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress Dashboard */}
            <div>
              <h2 className="text-xl font-semibold mb-6 font-space-grotesk">Dashboard Progress</h2>
              <ProgressDashboard />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
