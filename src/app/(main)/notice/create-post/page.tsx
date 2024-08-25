'use client'

import { ACCESS_ERROR_MESSAGE } from '@/constant/errorMessage'
import { useMyInfoStore } from '@/store/myInfo'

import { CreateNoticePostForm } from './_components/CreateNoticePostForm'
import { CreateNoticePostHero } from './_components/CreateNoticePostHero'

const CreateNoticePost = () => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())

  if (role !== '해구르르')
    throw new Error(ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR)

  return (
    <div className="flex flex-col gap-6">
      <CreateNoticePostHero />
      <CreateNoticePostForm />
    </div>
  )
}

export default CreateNoticePost