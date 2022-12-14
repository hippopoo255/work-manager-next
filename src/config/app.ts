export const API_STAGE_URL: string =
  process.env.NEXT_PUBLIC_API_STAGE_URL || 'http://localhost:8080'
export const API_DIRECT_URL: string =
  process.env.NEXT_PUBLIC_API_DIRECT_URL || 'http://localhost:8080/api'
export const APP_SYNC_URL: string =
  process.env.NEXT_PUBLIC_APP_SYNC_URL || 'http://localhost:8000'
export const APP_SYNC_KEY: string =
  process.env.NEXT_PUBLIC_APP_SYNC_KEY || 'secret'
export const PUSHER_URL: string =
  process.env.NEXT_PUBLIC_API_PUSHER_URL || 'http://localhost:8080'
export const STORAGE_URL: string =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8080/storage'
export const APP_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
export const ADMIN_URL =
  process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001'
export const SITE_TITLE: string =
  process.env.NEXT_PUBLIC_SITE_NAME || 'Next App'
export const BIRTH_DAY = '2021-11-30'

export const headerHeight: number = 64
export const footerHeight: number = 100
export const drawerWidth: number = 250
export const drawerClosingWidth: number = 65
export const chatRoomListWidth: number = 320
export const chatMainWidth: number = 640
export const COLLAPSE_COUNT: number = 3
