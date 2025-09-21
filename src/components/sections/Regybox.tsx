'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Import images
import regyboxBg from '../../../public/images/regybox-bg.png'
import regyboxPhone from '../../../public/images/regybox-phone.png'
import regyboxLogo from '../../../public/images/regybox-logo.png'

export function Regybox() {
  return (
    <section className="relative h-screen bg-white">
      {/* Background container */}
      <div className="absolute inset-0">
        {/* Top 2/3 background image */}
        <div className="absolute top-0 left-0 right-0 h-[67%] overflow-hidden">
          <Image
            src={regyboxBg}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Bottom 1/3 is white from the section bg-white */}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            {/* Left container - stacked content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center lg:items-start gap-12 max-w-md"
            >
              {/* Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight uppercase">
                O TEU TREINO NAS TUAS MÃOS
              </h2>

              {/* CTA Button */}
              <Link
                href="https://www.regibox.pt/app/app_nova/login.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="cta-primary-light group relative inline-flex items-center gap-3 px-8 py-4
                         text-white font-display text-lg md:text-xl uppercase tracking-wider">
                  ACEDER AQUI
                </button>
              </Link>

              {/* RegyBox Logo */}
              <div className="w-64 h-64 relative">
                <Image
                  src={regyboxLogo}
                  alt="RegyBox"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Right container - phone image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-md lg:max-w-lg h-[500px] lg:h-[600px]"
            >
              <Image
                src={regyboxPhone}
                alt="RegyBox App"
                fill
                className="object-contain object-center"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}