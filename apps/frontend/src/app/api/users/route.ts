import type { User } from '@monorepo/data-grid'

const users: User[] = [
  {
    id: 'user-1',
    name: 'Raymund Jerrard',
    image: '/avatars/avatar1.png',
  },
  {
    id: 'user-2',
    name: 'Hervey Elsdon',
    image: '/avatars/avatar2.png',
  },
  {
    id: 'user-3',
    name: 'Allyn Roydon',
    image: '/avatars/avatar3.png',
  },
  {
    id: 'user-4',
    name: 'Addison Timmy',
    image: '/avatars/avatar4.png',
  },
  {
    id: 'user-5',
    name: 'Zachary Terell',
    image: '/avatars/avatar5.png',
  },
  {
    id: 'user-6',
    name: 'Davide Domenic',
    image: '/avatars/avatar6.png',
  },
  {
    id: 'user-7',
    name: 'Benedictus Domenic',
    image: '/avatars/avatar7.png',
  },
  {
    id: 'user-8',
    name: 'Farrell Austin',
    image: '/avatars/avatar8.png',
  },
  {
    id: 'user-9',
    name: 'Jameson Collins',
    image: '/avatars/avatar9.png',
  },
  {
    id: 'user-10',
    name: 'Amos Shon',
    image: '/avatars/avatar10.png',
  },
  {
    id: 'user-11',
    name: 'Cash Logan',
    image: '/avatars/avatar1.png',
  },
  {
    id: 'user-12',
    name: 'Doug Jerry',
    image: '/avatars/avatar2.png',
  },
  {
    id: 'user-13',
    name: 'Albert Legend',
    image: '/avatars/avatar3.png',
  },
  {
    id: 'user-14',
    name: 'Garfield Gavin',
    image: '/avatars/avatar4.png',
  },
  {
    id: 'user-15',
    name: 'Lamar Denny',
    image: '/avatars/avatar5.png',
  },
  {
    id: 'user-16',
    name: 'Tatton Valentine',
    image: '/avatars/avatar6.png',
  },
  {
    id: 'user-17',
    name: 'Randy Tyrone',
    image: '/avatars/avatar7.png',
  },
  {
    id: 'user-18',
    name: 'Baldwin Jaymes',
    image: '/avatars/avatar8.png',
  },
  {
    id: 'user-19',
    name: 'Sparrow Gerrard',
    image: '/avatars/avatar9.png',
  },
  {
    id: 'user-20',
    name: 'Jim Xavier',
    image: '/avatars/avatar10.png',
  },
]

export async function GET() {
  return new Response(JSON.stringify(users), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
