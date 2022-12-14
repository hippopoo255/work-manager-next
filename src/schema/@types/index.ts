/* eslint-disable */
import type { ReadStream } from 'fs'

/** 認証時のデータ */
export type Admin = {
  id: number
  full_name: string
  given_name: string
  given_name_kana: string
  family_name: string
  family_name_kana: string
  file_path?: string | null | undefined
  created_at?: DateFormat | undefined
  updated_at?: DateFormat | undefined
  is_initialized?: boolean | undefined
  organization_id?: number | undefined
}

/** 認証時のデータ */
export type AuthenticatedAdmin = {
  /** ユーザーID */
  id: number
  /** フルネーム */
  full_name: string
  /** 名 */
  given_name?: string | undefined
  /** 姓 */
  family_name?: string | undefined
  /** ファイルパス */
  file_path?: string | null | undefined
  created_at: DateFormat
  updated_at: DateFormat
  jwt?: string | undefined
}

/** 通知 */
export type Activity = {
  id: number
  user_id: number
  action_type_id: number
  is_read?: boolean | undefined
  model_id?: number | undefined
  content?: string | undefined
  created_at: DateFormat
  updated_at: DateFormat
}

/** ブログ */
export type Blog = {
  id: number
  written_by: User
  /** タイトル */
  title: string
  /** 記事の内容 */
  body: string
  created_at: DateFormat
  updated_at: DateFormat
  images?: BlogImage[] | undefined
  likes: User[]
  comments: BlogComment[]
  tags: Tag[]
}

/** ブログへのコメント */
export type BlogComment = {
  id: number
  blog_id: number
  written_by: User
  body: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** Blogのコメントフォーム */
export type BlogCommentForm = {
  written_by: number
  body: string
}

/** Blogの投稿フォーム */
export type BlogForm = {
  title: string
  body: string
  written_by?: number | undefined
  /** 初投稿時はなくても良い */
  file_paths?: (string | null)[] | undefined
  tags?: (number | null)[] | undefined
}

/** ブログ画像 */
export type BlogImage = {
  id: number
  blog_id: number
  file_path: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** ブログ一覧のページ（ページャつき） */
export type BlogPage = {
  data: Blog[]
  /** 1ページ目のURL */
  first_page_url: string
  /** 現在のitemの開始位置 */
  from: number | null
  /** 最大ページ数 */
  last_page: number
  /** 最終ページのURL */
  last_page_url: string
  /** 次ページのURL */
  next_page_url: string | null
  /** 前ページのURL */
  path: string
  /** 1ページあたりのアイテム数 */
  per_page: number
  /** 前ページのURL */
  prev_page_url: string | null
  /** 現在のitemの終了位置 */
  to: number | null
  /** item総数 */
  total: number
}

/** ユーザが任意でパスワードを変更したい時 */
export type ChangePasswordInput = {
  old_password: string
  password: string
  password_confirmation: string
}

/** チャットメッセージ */
export type ChatMessage = {
  id: number
  body: string
  written_by: User
  to?: User | undefined
  images?: ChatMessageImage[] | undefined
  reactions?: Reaction[] | undefined
  chat_message_reads?: User[] | undefined
  created_at: DateFormat
  updated_at: DateFormat
  mine?: boolean | null | undefined
}

/** ChatMessageの投稿フォーム */
export type ChatMessageForm = {
  id?: number | undefined
  written_by: number
  mentioned_to: number | null
  body: string
}

/** チャット画像 */
export type ChatMessageImage = {
  id: number
  chat_message_id?: number | undefined
  file_path: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** 既読 */
export type ChatMessageRead = {
  id: number
  /** 権限値 */
  chat_message_id: number
  member: User
  created_at: DateFormat
  updated_at: DateFormat
}

/** チャット通報 */
export type ChatReport = {
  id: number
  chat_message_id?: number | undefined
  report_category_id?: number | undefined
  is_report: boolean
  report_category?: ReportCategory | undefined
  created_by?: User | undefined
  chat_message?: ChatMessage | undefined
  created_at: DateFormat
  updated_at: DateFormat
}

/** チャット通報用リクエストボディ */
export type ChatReportForm = {
  report_category_id: number
}

/** チャットルーム */
export type ChatRoom = {
  id: number
  name: string
  members: User[]
  messages: ChatMessage[]
  created_at: DateFormat
  updated_at: DateFormat
  last_reads?: LastRead[] | undefined
  unread_count?: number | undefined
}

/** ChatRoomの投稿フォーム */
export type ChatRoomForm = {
  created_by: number | null
  name: string | null
}

export type DateFormat = string

/** DefaultError */
export type DefaultError = {
  /** エラーメッセージ */
  message?: string | undefined
}

/** 部署マスター */
export type Department = {
  id: number
  name: string
  color?: string | undefined
  created_at: DateFormat
  updated_at: DateFormat
}

/** ドキュメントファイル */
export type DocumentFile = {
  id: number
  uploaded_by: User
  file_path: string
  created_at: DateFormat
  updated_at: DateFormat
  shared_members?: User[] | undefined
}

/** DocumentFileの投稿フォーム */
export type DocumentFileForm = {
  uploaded_by: number
  file: string
  /** 更新時のみ */
  file_path?: string | undefined
}

/** ドキュメントフォルダ */
export type DocumentFolder = {
  id: number
  created_by: User
  name: string

  role?: Partial<(Role & {}) | null> | undefined

  created_at: DateFormat
  updated_at: DateFormat
}

/** DocumentFolderの投稿フォーム */
export type DocumentFolderForm = {
  created_by?: number | undefined
  name: string
  role_id?: number | undefined
}

/** データがないときの空配列 */
export type EmptyItem = (string | null)[]

/** FacialExpression */
export type FacialExpression = {
  /** エラーメッセージ */
  id: number
  name: string
  file_path: string
}

/** ForbiddenError */
export type ForbiddenError = {
  /** エラーメッセージ */
  message?: string | undefined
}

/** InvalidError */
export type InvalidError = {
  /** エラーメッセージ */
  message?: string | undefined

  /** フォームアイテムごとのエラーメッセージ */
  errors?:
    | {
        [key: string]: string | undefined
      }
    | undefined
}

/** ログインIDとパスワードのフォーム */
export type LoginBody = {
  login_id: string
  password: string
}

/** ユーザごとの最後に読んだメッセージ */
export type LastRead = {
  id: number
  chat_room_id: number
  member_id: number
  last_message_id: number
  created_at?: DateFormat | undefined
}

/** ミーティング決定事項 */
export type MeetingDecision = {
  id: number
  decided_by: User
  written_by: User
  subject: string
  body: string
  tasks?: Task[] | undefined
}

/** ミーティング決定事項フォーム */
export type MeetingDecisionForm = {
  id?: number | undefined
  decided_by?: number | null | undefined
  written_by: number
  subject?: string | null | undefined
  body: string
  tasks?: TaskForm[] | undefined
  flag?: number | null | undefined
}

/** 議事録一覧のページ（ページャつき） */
export type MeetingPage = {
  data: MeetingRecord[]
  /** 1ページ目のURL */
  first_page_url: string
  /** 現在のitemの開始位置 */
  from: number | null
  /** 最大ページ数 */
  last_page: number
  /** 最終ページのURL */
  last_page_url: string
  /** 次ページのURL */
  next_page_url: string | null
  /** 前ページのURL */
  path: string
  /** 1ページあたりのアイテム数 */
  per_page: number
  /** 前ページのURL */
  prev_page_url: string | null
  /** 現在のitemの終了位置 */
  to: number | null
  /** item総数 */
  total: number
}

/** ミーティング開催場所 */
export type MeetingPlace = {
  id: number
  name: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** ミーティングレコード */
export type MeetingRecord = {
  id: number
  recorded_by: User
  meeting_date: DateFormat
  place: MeetingPlace
  title: string
  summary: string | null
  members: User[]
  decisions: MeetingDecision[]
  created_at: DateFormat
  updated_at: DateFormat
}

/** 会議議事録投稿フォーム */
export type MeetingRecordForm = {
  recorded_by: number
  place_id?: number | null | undefined
  meeting_date: DateFormat
  title: string
  summary?: string | null | undefined
  meeting_decisions?: MeetingDecisionForm[] | undefined
  members?: number[] | undefined
}

/** 議事録一覧のページ（ページャつき） */
export type MeetingRecordPage = {
  data: MeetingRecord[]
  /** 1ページ目のURL */
  first_page_url: string
  /** 現在のitemの開始位置 */
  from: number | null
  /** 最大ページ数 */
  last_page: number
  /** 最終ページのURL */
  last_page_url: string
  /** 次ページのURL */
  next_page_url: string | null
  /** 前ページのURL */
  path: string
  /** 1ページあたりのアイテム数 */
  per_page: number
  /** 前ページのURL */
  prev_page_url: string | null
  /** 現在のitemの終了位置 */
  to: number | null
  /** item総数 */
  total: number
}

/** 共有相手用フォーム */
export type MemberForm = {
  recorded_by: number
  place_id?: number | null | undefined
  meeting_date: DateFormat
  title: string
  summary?: string | null | undefined
  meeting_decisions?: MeetingDecisionForm[] | undefined
  members?: number[] | undefined
}

/** 組織情報登録時のフォーム */
export type OrganizationForm = {
  name: string
  name_kana: string
  postal_code: string
  pref_id: number
  city: string
  address: string
  tel: string
  password: string
}

/** 設定ページ */
export type SettingForm = {
  change_password?: ChangePasswordInput | undefined
}

/** NotFoundError */
export type NotFoundError = {
  /** エラーメッセージ */
  message?: string | undefined
}

/** 組織 */
export type Organization = {
  id: number
  /** 優先度 */
  name: string
  /** 優先度 */
  name_kana?: string | undefined
  /** 優先値 */
  pref_id?: number | undefined
  /** 優先値 */
  postal_code?: number | undefined
  /** 優先度 */
  city?: string | undefined
  /** 優先度 */
  address?: string | undefined
  /** 優先度 */
  tel?: string | undefined
  /** 優先値 */
  supervisor_id?: number | undefined
  created_at: DateFormat
  updated_at: DateFormat
}

/** TODOの優先度 */
export type Priority = {
  id: number
  /** 優先度 */
  name: string
  /** 優先値 */
  value: number
  created_at: DateFormat
  updated_at: DateFormat
}

/** 都道府県 */
export type Prefecture = {
  id: number
  /** 優先度 */
  name: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** プロフィール更新時のフォーム */
export type ProfileForm = {
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  delete_flag?: boolean | undefined
  file?: (File | ReadStream) | undefined
  change_password?: boolean | undefined
}

/** TODOの達成度 */
export type Progress = {
  id: number
  /** 達成度 */
  name: string
  /** 達成値 */
  value: number
  created_at: DateFormat
  updated_at: DateFormat
}

export type ReportCategory = {
  id: number
  name: string
  code: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** リアクション */
export type Reaction = {
  id: number
  /** 権限値 */
  chat_message_id: number
  member: User
  facial_expression: FacialExpression
  created_at: DateFormat
  updated_at: DateFormat
}

/** ロール */
export type Role = {
  id: number
  /** 権限名 */
  name: string
  /** 権限値 */
  value: number
  created_at: DateFormat
  updated_at: DateFormat
}

/** スケジュール */
export type Schedule = {
  id: number
  scheduled_by: User
  title: string
  start: DateFormat
  end: DateFormat
  is_public?: boolean | undefined
  color?: string | null | undefined
  memo?: string | null | undefined
  shared_members: User[]
  created_at: DateFormat
  updated_at: DateFormat
}

/** Scheduleの投稿フォーム */
export type ScheduleForm = {
  scheduled_by: number
  title: string
  start: string
  end: string
  is_public: boolean | null
  color: string | null
  memo: string | null
}

/** Tag */
export type Tag = {
  id: number
  name: string
  created_at: DateFormat
  updated_at: DateFormat
}

/** Task */
export type Task = {
  id: number
  owner: User
  created_by: User

  priority: Partial<(Priority & {}) | null>

  progress: Partial<(Progress & {}) | null>

  body: string
  time_limit: DateFormat
  created_at: DateFormat
  updated_at: DateFormat
}

/** Taskの投稿フォーム */
export type TaskForm = {
  id?: number | undefined
  owner_id: number
  created_by?: number | undefined
  priority_id?: number | null | undefined
  progress_id?: number | null | undefined
  body: string
  time_limit: DateFormat
  flag?: number | null | undefined
}

/** TaskDeleteForm */
export type TaskDeleteForm = {
  ids?: number[] | undefined
}

/** タスク一覧のページ（ページャつき） */
export type TaskPage = {
  data: Task[]
  /** 1ページ目のURL */
  first_page_url: string
  /** 現在のitemの開始位置 */
  from: number | null
  /** 最大ページ数 */
  last_page: number
  /** 最終ページのURL */
  last_page_url: string
  /** 次ページのURL */
  next_page_url: string | null
  /** 前ページのURL */
  path: string
  /** 1ページあたりのアイテム数 */
  per_page: number
  /** 前ページのURL */
  prev_page_url: string | null
  /** 現在のitemの終了位置 */
  to: number | null
  /** item総数 */
  total: number
}

/** ユーザーのデータ */
export type User = {
  id: number
  full_name: string
  given_name: string
  given_name_kana: string
  family_name: string
  family_name_kana: string
  file_path?: string | null | undefined
  created_at?: DateFormat | undefined
  updated_at?: DateFormat | undefined
  is_initialized?: boolean | undefined
  organization_id?: number | undefined
  email_verified_at?: DateFormat | undefined
  email?: string | undefined
}

export type SignUpInputs = {
  user_id: string
  password: string
  email: string
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  address?: string | undefined
}

export type SignInInputs = {
  user_id: string
  password: string
}

export type ForgotPasswordInputs = {
  user_id: string
}

export type AccountVerificationInputs = {
  user_id: string
  verification_code: string
}

export type PasswordResetInputs = {
  old_password: string
  password: string
  password_confirmation: string
}

export type ForgotPasswordResetInputs = {
  password: string
  user_id: string
  verification_code: string
}
