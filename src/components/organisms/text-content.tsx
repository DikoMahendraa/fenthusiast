"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

interface TextContentProps {
  content: string
  onComplete?: () => void
}

export function TextContent({ content, onComplete }: TextContentProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    // Calculate estimated reading time (average 200 words per minute)
    const wordCount = content.split(" ").length
    const estimatedTime = Math.ceil(wordCount / 200)
    setReadingTime(estimatedTime)

    // Track scroll progress
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(scrollPercent, 100))

      // Mark as completed when user scrolls to 80%
      if (scrollPercent >= 80 && !isCompleted) {
        setIsCompleted(true)
        onComplete?.()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [content, isCompleted, onComplete])

  const markAsComplete = () => {
    setIsCompleted(true)
    setReadingProgress(100)
    onComplete?.()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Reading Progress */}
      <Card className="mb-6 sticky top-20 z-10 bg-background/95 backdrop-blur">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Estimasi baca: {readingTime} menit</span>
            </div>
            <div className="flex items-center space-x-2">
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center space-x-1 text-green-600"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Selesai</span>
                </motion.div>
              )}
              <span className="text-sm text-muted-foreground">{Math.round(readingProgress)}%</span>
            </div>
          </div>
          <Progress value={readingProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "")
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={tomorrow}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                h1: ({ children }) => (
                  <h1 className="font-space-grotesk text-3xl font-bold text-primary mb-6">{children}</h1>
                ),
                h2: ({ children }) => <h2 className="font-space-grotesk text-2xl font-bold mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => (
                  <h3 className="font-space-grotesk text-xl font-semibold mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => <p className="mb-4 leading-relaxed text-foreground">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 space-y-2 list-disc list-inside">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 space-y-2 list-decimal list-inside">{children}</ol>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </motion.div>

          {/* Manual Complete Button */}
          {!isCompleted && (
            <motion.div
              className="mt-8 pt-6 border-t text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <Button onClick={markAsComplete} size="lg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Tandai Selesai
              </Button>
              <p className="text-sm text-muted-foreground mt-2">Atau scroll ke bawah untuk menandai otomatis</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
