"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Trophy, BookOpen, Clock, Edit, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAtomValue } from "jotai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/molecules/navbar"
import { userProgressAtom, completedMaterialsAtom, totalMaterialsAtom, progressPercentageAtom } from "@/src/lib/atoms"

interface UserData {
  name: string
  email: string
  joinDate?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const userProgress = useAtomValue(userProgressAtom)
  const completedMaterials = useAtomValue(completedMaterialsAtom)
  const totalMaterials = useAtomValue(totalMaterialsAtom)
  const progressPercentage = useAtomValue(progressPercentageAtom)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser({
      ...parsedUser,
      joinDate: "2024-01-15",
    })
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold font-space-grotesk">{user.name}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  Bergabung sejak{" "}
                  {new Date(user.joinDate || "").toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                  })}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Progress Overview */}
            <div className="lg:col-span-2 space-y-6">
              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Progress Belajar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Materi Selesai</span>
                      <span className="text-sm text-muted-foreground">
                        {completedMaterials}/{totalMaterials}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
                      <p className="text-sm text-muted-foreground">Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.values(userProgress.materials)
                      .filter((m) => m.lastAccessed)
                      .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
                      .slice(0, 4)
                      .map((material, index) => (
                        <motion.div
                          key={material.id}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${material.completed
                                ? "bg-green-500"
                                : material.progress > 50
                                  ? "bg-blue-500"
                                  : "bg-primary"
                              }`}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {material.completed ? "Menyelesaikan" : "Mempelajari"} {material.id}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {material.lastAccessed && new Date(material.lastAccessed).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                          <Badge variant={material.completed ? "default" : "secondary"}>{material.progress}%</Badge>
                        </motion.div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats & Achievements */}
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProgress.streak}</div>
                    <div className="text-xs text-muted-foreground">Hari Streak</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{completedMaterials}</div>
                    <div className="text-xs text-muted-foreground">Materi Selesai</div>
                  </CardContent>
                </Card>
              </div>

              {/* Level & XP */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Level & XP
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary">Level {userProgress.level}</div>
                    <div className="text-sm text-muted-foreground">{userProgress.xp} XP</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Next Level</span>
                      <span>{userProgress.level * 500} XP</span>
                    </div>
                    <Progress
                      value={((userProgress.xp - (userProgress.level - 1) * 500) / 500) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              {userProgress.badges.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                      Pencapaian
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {userProgress.badges.slice(-3).map((badge, index) => (
                        <motion.div
                          key={badge}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{badge}</p>
                            <p className="text-xs text-muted-foreground">Earned</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => router.push("/belajar")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Lanjutkan Belajar
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => router.push("/goals")}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Set Learning Goals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
