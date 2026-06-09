'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [frames, setFrames] = useState<HTMLImageElement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentFrame, setCurrentFrame] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef(0)
  const frameDurationRef = useRef(1000 / 24) // 24 FPS

  // Progressive frame loading
  useEffect(() => {
    const framesMap = new Map<number, HTMLImageElement>()
    let loadedCount = 0
    const frameCount = 160 // 160 optimized frames

    const loadFrame = (index: number) => {
      if (framesMap.has(index)) return Promise.resolve()

      return new Promise<void>((resolve) => {
        const originalFrameNum = index + 21 // Frames 21-180
        const frameNum = String(originalFrameNum).padStart(3, '0')
        const imagePath = `/images/blueberry/ezgif-frame-${frameNum}.jpg`

        const img = new Image()
        img.src = imagePath
        img.crossOrigin = 'anonymous'

        img.onload = () => {
          framesMap.set(index, img)
          loadedCount++
          if (loadedCount === 1) {
            setIsLoading(false) // Show page after first frame
          }
          resolve()
        }
        img.onerror = () => resolve()
      })
    }

    // Load first frame immediately
    loadFrame(0)

    // Load remaining frames in batches
    const loadBatch = async (startIndex: number, batchSize: number) => {
      const promises = []
      for (let i = startIndex; i < Math.min(startIndex + batchSize, frameCount); i++) {
        promises.push(loadFrame(i))
      }
      await Promise.all(promises)

      if (startIndex + batchSize < frameCount) {
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(() => loadBatch(startIndex + batchSize, batchSize))
        } else {
          setTimeout(() => loadBatch(startIndex + batchSize, batchSize), 100)
        }
      }
    }

    loadBatch(1, 20)

    const interval = setInterval(() => {
      const framesArray = Array.from({ length: frameCount }, (_, i) => 
        framesMap.get(i) || new Image()
      )
      if (framesArray.some(f => f.src)) {
        setFrames(framesArray)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas || frames.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frame = frames[frameIndex]
    if (!frame.src) return

    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth
    const containerHeight = window.innerHeight
    canvas.width = containerWidth
    canvas.height = containerHeight

    const imgAspect = frame.naturalWidth / frame.naturalHeight
    const containerAspect = containerWidth / containerHeight

    let drawWidth, drawHeight, drawX, drawY

    if (imgAspect > containerAspect) {
      drawHeight = containerHeight
      drawWidth = drawHeight * imgAspect
    } else {
      drawWidth = containerWidth
      drawHeight = drawWidth / imgAspect
    }

    drawX = (containerWidth - drawWidth) / 2
    drawY = (containerHeight - drawHeight) / 2

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, containerWidth, containerHeight)
    ctx.drawImage(frame, drawX, drawY, drawWidth, drawHeight)
  }, [frames])

  // Auto-play animation at 24 FPS
  useEffect(() => {
    if (frames.length === 0 || isLoading) return

    const animate = (timestamp: number) => {
      if (lastFrameTimeRef.current === 0) {
        lastFrameTimeRef.current = timestamp
      }

      const elapsed = timestamp - lastFrameTimeRef.current

      if (elapsed >= frameDurationRef.current) {
        setCurrentFrame((prev) => (prev + 1) % frames.length)
        lastFrameTimeRef.current = timestamp
      }

      drawFrame(currentFrame)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      lastFrameTimeRef.current = 0
    }
  }, [frames, isLoading, currentFrame, drawFrame])

  return (
    <div className="relative w-full overflow-hidden bg-black">
      <div className="relative h-screen w-full overflow-hidden">
        {/* Canvas background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full"
          style={{ display: isLoading ? 'none' : 'block' }}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-neutral-700 border-t-white"></div>
              <p className="text-neutral-400">Loading animation...</p>
            </div>
          </div>
        )}

        {/* Overlay content */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="mb-4 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              MISOHA
            </h1>
           
            <p className="mb-2 text-pretty mx-auto max-w-2xl text-base text-neutral-300 sm:text-lg">
              Mind • Soul • Health
            </p>
             <p className="mb-4 text-pretty mx-auto max-w-2xl text-lg font-semibold text-amber-300 sm:text-2xl">
              Nourish Your Mind. Fuel Your Soul. Strengthen Your Health.
            </p>
            <p className="text-pretty mx-auto max-w-2xl text-sm text-neutral-400 sm:text-base">
              Wellness nutrition crafted for your mental, spiritual, and physical wellbeing.
              Order fresh, pre-made nutrition delivered to your door daily.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <button className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-transform hover:bg-amber-700 hover:scale-105 active:scale-95">
              Order Now
            </button>
            <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95">
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
