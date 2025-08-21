import Link from 'next/link';
import Image from 'next/image';

const projects = ['base-apparel-coming-soon', 'tic-tac-toe'];

export default function Home() {
  return (
    <main className='min-h-screen px-6 py-12 bg-gray-50'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Frontend Mentor Projects
      </h1>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'>
        {projects.map((project) => (
          <Link
            key={project}
            href={`/${project}`}
            className='group block rounded-lg shadow hover:shadow-lg bg-white overflow-hidden transition'
          >
            <div className='relative h-48 w-full'>
              <Image
                src={`/${project}/preview.jpg`}
                alt={`${project} preview`}
                fill
                className='object-cover group-hover:scale-105 transition'
              />
            </div>
            <div className='p-4 text-center text-gray-800 group-hover:text-pink-600'>
              {project}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
