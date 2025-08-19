import Image from 'next/image';
import { Josefin_Sans } from 'next/font/google';

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
});

export default function Home() {
  const base = '/base-apparel-coming-soon';
  return (
    <main
      className={`${josefinSans.className} min-h-screen flex flex-col items-center lg:flex-row lg:items-start`}
    >
      <div className='w-full min-h-screen flex flex-col items-center lg:bg-[url(/base-apparel-coming-soon/bg-pattern-desktop.svg)]'>
        <header className='w-full py-8 px-8 md:px-20 lg:w-[445px] lg:px-8 lg:py-20'>
          <Image src={`${base}/logo.svg`} alt='Logo' width={158} height={33} />
        </header>
        <div className='w-full relative h-[250px] md:h-[400px] lg:hidden'>
          <Image src={`${base}/hero-mobile.jpg`} alt='Hero mobile' fill />
        </div>
        <div className='w-[312px] md:w-[445px] py-8 px-8 mt-4 text-center flex flex-col gap-6 lg:text-left'>
          <h1 className='text-4xl tracking-widest'>
            <span className='block text-pink-400'>WE&apos;RE</span>
            <span className='block font-bold'>COMING</span>
            <span className='block font-bold'>SOON</span>
          </h1>
          <p className='text-pink-400 text-sm'>
            Hello fellow shoppers! We&apos;re currently building our new fashion
            store. Add your email below to stay up-to-date with announcements
            and our launch deals.
          </p>
          <label htmlFor='email' className='sr-only'>
            Email Address
          </label>
          <input
            id='email'
            type='text'
            placeholder='Email Address'
            className='border border-pink-400 rounded-full w-full h-12 px-5 focus:outline-pink-400'
          ></input>
        </div>
      </div>
      {/* Right column, desktop only */}
      <div className='hidden lg:block w-3/5 min-h-screen relative'>
        <Image src={`${base}/hero-desktop.jpg`} alt='Hero desktop' fill />
      </div>
    </main>
  );
}
