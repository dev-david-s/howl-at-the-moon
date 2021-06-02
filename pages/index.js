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

          <motion.img variants={moonVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} g className="background-image mix-blend-screen david" src="./moon2.png" alt="Moon on Background" />
          <motion.img variants={backMtVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} className="background-image bottom-0 clip-background" src="./mountains_behind.png" alt="Mountains on Background" />
          <motion.h2 variants={textVariants} initial='visible' animate={ctaClicked ? 'hidden' : ''} className="absolute text-white text-4xl  md:text-uni font-bold">Can't Sleep?</motion.h2>
          <motion.div variants={textVariants} initial='visible' animate={ctaClicked ? 'hidden' : ''}>
            <a onClick={handleCtaClick} href="#" id="#cta" className="absolute whitespace-nowrap top-1/2 left-1/2 translate-50 inline-block rounded-full text-2xl font-bold px-20 bg-white py-4 z-50 mt-32" >HOWL WITH US</a>
          </motion.div>
          <motion.img variants={frontMtVariants} initial='hidden' animate={ctaClicked ? 'visible' : ''} className="background-image max-h-screen bottom-0 z-50 clip-background text-background_mood-dark" src="./mountains_front.png" alt="Mountains on Background" />
        </section>
      </main>
    </div >
  )
}
