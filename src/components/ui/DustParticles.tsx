'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

export default function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const particles: Particle[] = []
    const maxParticles = 80

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 2 + 0.5),
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      life: 0,
      maxLife: Math.random() * 200 + 100,
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (particles.length < maxParticles && Math.random() > 0.7) {
        particles.push(createParticle())
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++
        p.vx += (Math.random() - 0.5) * 0.1

        const lifeRatio = p.life / p.maxLife
        const currentOpacity = lifeRatio < 0.2
          ? p.opacity * (lifeRatio / 0.2)
          : lifeRatio > 0.8
            ? p.opacity * (1 - (lifeRatio - 0.8) / 0.2)
            : p.opacity

        if (p.life >= p.maxLife || p.y < -10) {
          particles.splice(i, 1)
          continue
        }

        // Earthy dust color with yellow tint
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 209, 0, ${currentOpacity * 0.3})`
        ctx.fill()

        // Outer glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 209, 0, ${currentOpacity * 0.05})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
