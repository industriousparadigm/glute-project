/* DO NOT MODIFY IT BY HAND */
import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout, generatePageMetadata, handleServerFunctions } from '@payloadcms/next/layouts'
import { NextRequest } from 'next/server'
import { importMap } from './importMap'

type RouteParams = {
  params: Promise<{
    slug: string[]
  }>
}

export const GET = async (req: NextRequest, { params }: RouteParams) => {
  return handleServerFunctions({
    params: await params,
    config,
    importMap,
    req,
  })
}

export const POST = async (req: NextRequest, { params }: RouteParams) => {
  return handleServerFunctions({
    params: await params,
    config,
    importMap,
    req,
  })
}