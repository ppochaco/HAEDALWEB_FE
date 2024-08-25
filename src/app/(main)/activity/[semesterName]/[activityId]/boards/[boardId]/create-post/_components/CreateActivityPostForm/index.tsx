'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useRouter } from 'next/navigation'

import { CreatePostForm } from '@/components/CreatePostForm'
import { useToast } from '@/components/ui/use-toast'
import { CreateActivityPost, CreateActivityPostSchema } from '@/schema/post'
import { queryClient } from '@/service/components/ReactQueryClientProvider'
import { createActivityPostAction } from '@/service/server/post/create-post'

type CreateActivityPostFormProps = {
  boardId: number
}

export const CreateActivityPostForm = ({
  boardId,
}: CreateActivityPostFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const basePath = pathName.split('/').slice(0, -1).join('/')

  const {
    execute: createPost,
    result,
    isExecuting,
  } = useAction(createActivityPostAction)

  const form = useForm<CreateActivityPost>({
    resolver: zodResolver(CreateActivityPostSchema),
    defaultValues: {
      boardId,
      postTitle: '',
      postContent: '',
      imageFile: new File([], ''),
      activityDate: {
        start: undefined,
        end: undefined,
      },
    },
  })

  useEffect(() => {
    const handleSuccess = async () => {
      if (result.data?.isSuccess) {
        toast({
          title: result.data.message,
          duration: 3000,
        })

        await queryClient.invalidateQueries({ queryKey: ['posts', boardId] })

        router.push(basePath)
      }
    }

    handleSuccess()

    if (result.data?.message) {
      toast({
        title: result.data.message,
        duration: 3000,
      })
    }
  }, [result, basePath, boardId, router, toast])

  return (
    <CreatePostForm<CreateActivityPost>
      form={form}
      onSubmit={(values) => createPost(values)}
      isExecuting={isExecuting}
    />
  )
}