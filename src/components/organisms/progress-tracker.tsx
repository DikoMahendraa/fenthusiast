"use client"

import { useEffect } from "react"
import { useAtom } from "jotai"
import { updateMaterialProgressAtom } from "@/lib/atoms"

interface ProgressTrackerProps {
  materialId: string
  progress: number
  timeSpent?: number
}

export function ProgressTracker({ materialId, progress, timeSpent }: ProgressTrackerProps) {
  const [, updateProgress] = useAtom(updateMaterialProgressAtom)

  useEffect(() => {
    updateProgress(materialId, progress, timeSpent)
  }, [materialId, progress, timeSpent, updateProgress])

  return null // This is a utility component that doesn't render anything
}
