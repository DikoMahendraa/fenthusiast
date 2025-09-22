import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// User progress data structure
export interface MaterialProgress {
  id: string
  completed: boolean
  completedAt?: string
  timeSpent: number // in minutes
  lastAccessed?: string
  progress: number // 0-100 percentage
}

export interface UserProgress {
  materials: Record<string, MaterialProgress>
  totalTimeSpent: number
  streak: number
  lastActiveDate?: string
  badges: string[]
  level: number
  xp: number
}

// Default progress state
const defaultProgress: UserProgress = {
  materials: {},
  totalTimeSpent: 0,
  streak: 0,
  badges: [],
  level: 1,
  xp: 0,
}

// Atoms for progress tracking
export const userProgressAtom = atomWithStorage<UserProgress>("user-progress", defaultProgress)

// Derived atoms
export const completedMaterialsAtom = atom((get) => {
  const progress = get(userProgressAtom)
  return Object.values(progress.materials).filter((m) => m.completed).length
})

export const totalMaterialsAtom = atom(8) // Total number of materials

export const progressPercentageAtom = atom((get) => {
  const completed = get(completedMaterialsAtom)
  const total = get(totalMaterialsAtom)
  return total > 0 ? Math.round((completed / total) * 100) : 0
})

// Actions
export const markMaterialCompleteAtom = atom(null, (get, set, materialId: string) => {
  const currentProgress = get(userProgressAtom)
  const now = new Date().toISOString()

  const updatedProgress = {
    ...currentProgress,
    materials: {
      ...currentProgress.materials,
      [materialId]: {
        ...currentProgress.materials[materialId],
        id: materialId,
        completed: true,
        completedAt: now,
        progress: 100,
        lastAccessed: now,
        timeSpent: currentProgress.materials[materialId]?.timeSpent || 0,
      },
    },
    xp: currentProgress.xp + 100, // Award XP for completion
    totalTimeSpent: currentProgress.totalTimeSpent + (currentProgress.materials[materialId]?.timeSpent || 0),
  }

  // Check for level up
  const newLevel = Math.floor(updatedProgress.xp / 500) + 1
  if (newLevel > currentProgress.level) {
    updatedProgress.level = newLevel
    updatedProgress.badges = [...currentProgress.badges, `Level ${newLevel} Achiever`]
  }

  // Update streak
  const today = new Date().toDateString()
  const lastActive = currentProgress.lastActiveDate ? new Date(currentProgress.lastActiveDate).toDateString() : null
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  if (lastActive === yesterday) {
    updatedProgress.streak = currentProgress.streak + 1
  } else if (lastActive !== today) {
    updatedProgress.streak = 1
  }

  updatedProgress.lastActiveDate = now

  // Award streak badges
  if (updatedProgress.streak === 7 && !currentProgress.badges.includes("Week Warrior")) {
    updatedProgress.badges = [...updatedProgress.badges, "Week Warrior"]
  }
  if (updatedProgress.streak === 30 && !currentProgress.badges.includes("Month Master")) {
    updatedProgress.badges = [...updatedProgress.badges, "Month Master"]
  }

  set(userProgressAtom, updatedProgress)
})

export const updateMaterialProgressAtom = atom(
  null,
  (get, set, materialId: string, progress: number, timeSpent?: number) => {
    const currentProgress = get(userProgressAtom)
    const now = new Date().toISOString()

    set(userProgressAtom, {
      ...currentProgress,
      materials: {
        ...currentProgress.materials,
        [materialId]: {
          ...currentProgress.materials[materialId],
          id: materialId,
          progress: Math.max(progress, currentProgress.materials[materialId]?.progress || 0),
          lastAccessed: now,
          timeSpent: timeSpent
            ? (currentProgress.materials[materialId]?.timeSpent || 0) + timeSpent
            : currentProgress.materials[materialId]?.timeSpent || 0,
          completed: progress >= 100 ? true : currentProgress.materials[materialId]?.completed || false,
        },
      },
      lastActiveDate: now,
    })
  },
)
