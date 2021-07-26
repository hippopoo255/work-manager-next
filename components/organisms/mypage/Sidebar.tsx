import React from 'react'
import Link from 'next/link'

export type Menu = {
  title: string
  children: Child[]
  [k: string]: any
}

export type Child = {
  id: string
  label: string
  to: string
}

export type Menus = {
  [k:string]: Menu
}

const Sidebar = () => {
  const menus: Menus = {
    meeting: {
      title: '会議',
      children: [
        {
          id: 'record',
          to: '/meeting_record',
          label: '議事録',
        }
      ]
    },
    schedule: {
      title: 'スケジュール',
      children: [
        {
          id: 'schedule',
          to: '/schedule',
          label: 'スケジュール',
        }
      ]
    },
    document: {
      title: 'ドキュメント',
      children: [
        {
          id: 'document',
          to: '/document',
          label: 'ドキュメント',
        }
      ]
    },
    task: {
      title: 'タスク',
      children: [
        {
          id: 'task',
          to: '/task',
          label: 'ドキュメント',
        }
      ]
    },
    chat: {
      title: 'チャット',
      children: [
        {
          id: 'chat',
          to: '/chat',
          label: 'チャット',
        }
      ]
    },
    blog: {
      title: '社内ブログ',
      children: [
        {
          id: 'index',
          to: '/blog',
          label: '一覧',
        },
        {
          id: 'new',
          to: '/blog/create',
          label: '新規投稿',
        },
        {
          id: 'history',
          to: '/blog/history',
          label: '投稿履歴',
        },
      ]
    },
  }

  return (
    <nav>
      <ul>
        {Object.keys(menus).map((name: string, index: number) => (
          <li key={`menu_${index}`}>
            {menus[name].title}
            <ul>
              {menus[name].children.map((child: Child) => (
                <li key={`${name}_${child.id}`}>
                  <Link href={child.to}>
                    <a>{child.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
