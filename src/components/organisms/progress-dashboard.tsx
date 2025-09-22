"use client"

import { useAtom, useAtomValue } from "jotai"
import { motion } from "framer-motion"
import { Trophy, Target, Clock, Flame, Star, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { userProgressAtom, completedMaterialsAtom, totalMaterialsAtom, progressPercentageAtom } from "@/lib/atoms"

export function ProgressDashboard() {
  const [userProgress] = useAtom(userProgressAtom)
  const completedMaterials = useAtomValue(completedMaterialsAtom)
  const totalMaterials = useAtomValue(totalMaterialsAtom)
  const progressPercentage = useAtomValue(progressPercentageAtom)

  const stats = [
    {
      title: "Materi Selesai",
      value: `${completedMaterials}/${totalMaterials}`,
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Streak Harian",
      value: `${userProgress.streak} hari`,
      icon: Flame,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Total Waktu",
      value: `${Math.round(userProgress.totalTimeSpent / 60)}h ${userProgress.totalTimeSpent % 60}m`,
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Level",
      value: `Level ${userProgress.level}`,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const nextLevelXP = userProgress.level * 500
  const currentLevelXP = (userProgress.level - 1) * 500
  const xpProgress = ((userProgress.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Progress Keseluruhan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Penyelesaian Materi</span>
              <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">XP Progress</span>
              <span className="text-sm text-muted-foreground">
                {userProgress.xp} / {nextLevelXP} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-lg font-semibold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      {userProgress.badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Pencapaian Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {userProgress.badges.slice(-5).map((badge, index) => (
                <motion.div
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3" />
                    <span>{badge}</span>
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.values(userProgress.materials)
              .filter((m) => m.lastAccessed)
              .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
              .slice(0, 5)
              .map((material, index) => (
                <motion.div
                  key={material.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${material.completed ? "bg-green-500" : "bg-blue-500"}`} />
                    <div>
                      <p className="text-sm font-medium">
                        {material.completed ? "Menyelesaikan" : "Mempelajari"} {material.id}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {material.lastAccessed && new Date(material.lastAccessed).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <Badge variant={material.completed ? "default" : "secondary"}>{material.progress}%</Badge>
                </motion.div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
