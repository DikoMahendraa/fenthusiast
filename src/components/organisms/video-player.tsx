"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { useAtom } from "jotai"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { ProgressTracker } from "@/components/organisms/progress-tracker"
import { markMaterialCompleteAtom } from "@/lib/atoms"

interface VideoPlayerProps {
  videoUrl: string
  title: string
  materialId: string
  onVideoEnd?: () => void
}

export function VideoPlayer({ videoUrl, title, materialId, onVideoEnd }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [watchTime, setWatchTime] = useState(0)

  // Added progress tracking
  const [, markComplete] = useAtom(markMaterialCompleteAtom)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      setWatchTime((prev) => prev + 1) // Track watch time in seconds
    }

    const handleDurationChange = () => setDuration(video.duration)

    const handleEnded = () => {
      setIsPlaying(false)
      markComplete(materialId) // Mark as complete when video ends
      onVideoEnd?.()
    }

    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("durationchange", handleDurationChange)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("durationchange", handleDurationChange)
      video.removeEventListener("ended", handleEnded)
    }
  }, [onVideoEnd, materialId, markComplete])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newTime = (value[0] / 100) * duration
    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current
    if (!video) return

    const newVolume = value[0] / 100
    video.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (isMuted) {
      video.volume = volume
      setIsMuted(false)
    } else {
      video.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <>
      {/* Added progress tracker */}
      <ProgressTracker materialId={materialId} progress={progress} timeSpent={Math.floor(watchTime / 60)} />

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            className="relative bg-black group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full aspect-video"
              poster="/placeholder.svg?key=hf984"
              onClick={togglePlay}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Controls Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Play/Pause Button (Center) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  onClick={togglePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </motion.button>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <Slider
                    value={[duration ? (currentTime / duration) * 100 : 0]}
                    onValueChange={handleSeek}
                    className="w-full"
                    max={100}
                    step={0.1}
                  />
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                        {isMuted ? "🔇" : "🔊"}
                      </Button>
                      <div className="w-20">
                        <Slider
                          value={[isMuted ? 0 : volume * 100]}
                          onValueChange={handleVolumeChange}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Progress: {Math.round(progress)}%</span>
              <span>Watch time: {Math.floor(watchTime / 60)}m</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
