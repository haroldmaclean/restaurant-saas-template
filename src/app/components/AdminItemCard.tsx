'use client'

import { MenuItemType } from '@/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  item: MenuItemType
}

export default function AdminItemCard({ item }: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${item.name}"?`)
    if (!confirmed) return

    const res = await fetch(`/api/menu/${item._id}/delete`, {
      method: 'DELETE',
    })

    if (res.ok) {
      router.refresh()
    } else {
      alert('Failed to delete item.')
    }
  }

  return (
    <div className='bg-white p-4 rounded-lg shadow border relative'>
      {/* ✅ Optional image preview */}
      {item.image && (
        <div className='relative w-full h-40 mb-4'>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className='object-cover rounded-md border'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
      )}

      <h2 className='text-xl font-semibold'>{item.name}</h2>
      <p className='text-gray-600 mb-2'>{item.description}</p>
      <span className='text-green-700 font-bold'>R{item.price}</span>

      <div className='mt-4 flex gap-2'>
        <Link
          href={`/admin/edit/${item._id}`}
          className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm'
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
        >
          Delete
        </button>
      </div>
    </div>
  )
}
