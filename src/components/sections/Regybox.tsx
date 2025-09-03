'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Import images
// TODO: Replace with actual regybox-section.jpg when available
import regyboxSection from '../../../public/images/regybox-section.png'

export function Regybox() {
  return (
    <section className="relative">
      <Link 
        href="https://www.regibox.pt/app/app_nova/login.php"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full cursor-pointer"
        >
          <Image
            src={regyboxSection}
            alt="Regybox - Gestão completa do estúdio"
            width={1920}
            height={800}
            className="w-full h-auto"
            priority
          />
        </motion.div>
      </Link>
    </section>
  )
}