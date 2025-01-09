'use client'

import { useState } from 'react'
import { ChatForm } from '@/components/chat-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ChatPage() {
  const [chats, setChats] = useState([{ id: 1, name: 'Nový chat' }])
  const [activeChat, setActiveChat] = useState(1)

  const addNewChat = () => {
    const newChat = { id: chats.length + 1, name: `Nový chat ${chats.length + 1}` }
    setChats([...chats, newChat])
    setActiveChat(newChat.id)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white p-4 border-r border-gray-200 overflow-y-auto">
          <Link href="/">
            <Button variant="outline" className="w-full mb-4">Zpět na úvod</Button>
          </Link>
          <Button onClick={addNewChat} className="w-full mb-4">Nový chat</Button>
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={activeChat === chat.id ? 'secondary' : 'ghost'}
              className="w-full mb-2 justify-start"
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.name}
            </Button>
          ))}
        </div>
        <div className="flex-1 flex flex-col">
          <ChatForm chatId={activeChat} />
        </div>
      </div>
      <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
        <img src="/eu-flag.svg" alt="Vlajka EU" className="w-6 h-4 inline-block mr-2" />
        Tento prototyp byl vyvinut firmou Apenal. Projekt je spolufinancován Evropskou unií.
      </footer>
    </div>
  )
}

