import Head from 'next/head'
import { motion } from 'framer-motion';
import { useState } from 'react';


const starsVariants = {
  hidden: {
    y: '-100vh'
  },
  visible: {
    y: 0,
    transition: {
      duration: 1
    }
  }
}
const backMtVariants = {
  hidden: {
    y: '100vh'
  },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      delay: .6
    }
  }
}

const moonVariants = {
  hidden: {
    y: '-100vh'
  },
  visible: {
    y: 0,
    transition: {
      duration: 1.2,
      delay: 1.2
    }
  }
}

const frontMtVariants = {
  hidden: {
    y: '100vh'
  },
  visible: {
    y: 0,
    transition: {
      duration: 1.6,
      delay: 1.8
    }
  }
}

const textVariants = {
  hidden: {
    x: '-100vh',
    transition: {
      duration: 2,
      delay: 4
    }
  },
  visible: {
    x: 0,
  }
}

const formVariants = {
  hidden: {
    x: '150vh',
  },
  visible: {
    x: 0,
    transition: {
      duration: 2,
      delay: 4
    }
  }
}


export default function Home() {

  const [ctaClicked, setCtaClicked] = useState(false);

  function handleCtaClick() {
    setCtaClicked(true);
  }


  return (
    <div>
      <Head>
        <title>Howl At the Moon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background_mood-dark to-transparent">
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <motion.img variants={starsVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} className="background-image h-full object-cover" src="./stars.png" alt="Stars on Background" />

          <motion.img variants={moonVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} className="background-image mix-blend-screen david" src="./moon2.png" alt="Moon on Background" />
          <motion.img variants={backMtVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} className="background-image bottom-0 clip-background" src="./mountains_behind.png" alt="Mountains on Background" />
          <motion.h2 variants={textVariants} initial='visible' animate={ctaClicked ? 'hidden' : ''} className="absolute text-white text-4xl  md:text-uni font-bold">Can't Sleep?</motion.h2>

          <motion.a variants={textVariants} initial='visible' animate={ctaClicked ? 'hidden' : ''} onClick={handleCtaClick} href="#" id="#cta" className="absolute whitespace-nowrap self-center inline-block rounded-full text-2xl font-bold px-20 bg-white py-4 z-50 mt-80" >HOWL WITH US</motion.a>
          <motion.img variants={frontMtVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} className="background-image max-h-screen bottom-0 z-50 clip-background text-background_mood-dark" src="./mountains_front.png" alt="Mountains on Background" />
          <motion.div className="z-50 bg-white rounded-2xl w-3/12" variants={formVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''}>
            <div className="flex items-centerbg-white dark:bg-gray-900">
              <div className="container mx-auto">
                <div className="max-w-md mx-auto my-10">
                  <div className="text-center">
                    <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                  </div>
                  <div className="m-7">
                    <form action="">
                      <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                        <input type="email" name="email" id="email" placeholder="you@company.com" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                      </div>
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                          <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                        </div>
                        <input type="password" name="password" id="password" placeholder="Your Password" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                      </div>
                      <div className="mb-6">
                        <button type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
                      </div>
                      <p className="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a href="#!" className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</a>.</p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div >
  )
}
