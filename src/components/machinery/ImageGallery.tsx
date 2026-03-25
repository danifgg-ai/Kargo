'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageGalleryProps {
  images: string[]
  name: string
}

export default function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const displayImages = images.length > 0 ? images : []

  if (displayImages.length === 0) {
    return (
      <div className="aspect-[4/3] bg-kargo-surface border border-kargo-border flex items-center justify-center">
        <svg className="w-20 h-20 text-kargo-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-[4/3] bg-kargo-black overflow-hidden cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          <img
            src={displayImages[selectedIndex]}
            alt={`${name} - imagen ${selectedIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {displayImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedIndex(i)}
                className={`flex-shrink-0 w-20 h-16 overflow-hidden border-2 transition-colors ${
                  i === selectedIndex ? 'border-kargo-yellow' : 'border-kargo-border hover:border-kargo-steel'
                }`}
              >
                <img src={img} alt={`${name} miniatura ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white"
              onClick={() => setLightboxOpen(false)}
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {displayImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-kargo-surface/50 text-white hover:bg-kargo-surface transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-kargo-surface/50 text-white hover:bg-kargo-surface transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedIndex((prev) => (prev + 1) % displayImages.length)
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={displayImages[selectedIndex]}
              alt={name}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
