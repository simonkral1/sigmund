'use client'

import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { AutoResizeTextarea } from '@/components/autoresize-textarea'

export function ChatForm({
  className,
  chatId,
  ...props
}: React.ComponentProps<'form'> & { chatId: number }) {
  const { messages, input, setInput, append } = useChat({
    api: '/api/chat',
    id: `chat-${chatId}`,
    body: { model: 'claude-3-5-sonnet-20241022' },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim()) {
      void append({ content: input, role: 'user' })
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const messageList = (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "mb-4 flex",
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg px-4 py-2 text-sm",
              message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            )}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('flex h-full flex-col', className)} {...props}>
      {messages.length ? (
        messageList
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center text-gray-500">
            Vítejte v chatu se Sigmundem. Jak vám mohu dnes pomoci?
          </p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="border-t border-gray-200 bg-white p-4"
      >
        <div className="relative flex items-center">
          <AutoResizeTextarea
            onKeyDown={handleKeyDown}
            onChange={setInput}
            value={input}
            placeholder="Napište svou zprávu..."
            className="w-full pr-10 py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <ArrowUpIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>Odeslat</TooltipContent>
          </Tooltip>
        </div>
      </form>
    </div>
  )
}

