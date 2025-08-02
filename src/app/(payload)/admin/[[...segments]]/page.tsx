/* DO NOT MODIFY IT BY HAND */
import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootPage, generatePageMetadata } from '@payloadcms/next/layouts'
import type { Metadata } from 'next'

import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams })

export default Page