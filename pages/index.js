import { motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayer from '../components/AudioPlayer';
import Header from '../components/Header'
import { db, storage } from '../firebase';

import dynamic from 'next/dynamic'
// const AudioPlayer = dynamic(
//   () => import('../components/AudioPlayer'),
//   { ssr: false }
// )

const starsVariants = {
  hidden: {
    y: '-100vh'
  },
  visible: {
    y: 0,
    transition: {
      duration: .3
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
      duration: .6,
      delay: .3
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
      duration: .3,
      delay: .9
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
      duration: 1,
      delay: 1.2
    }
  }
}

const textVariants = {
  hidden: {
    y: '100vh',
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      delay: 2
    }
  }
}

function Home() {

  const [songs, setSongs] = useState([]);
  const [payed, setPayed] = useState();

  useEffect(() => {

    getAudios()
  }, []);

  const getAudios = async () => {
    const audioQuery = db.collectionGroup('audios')
    const newAudios = (await audioQuery.get()).docs.map(doc => doc.data())
    newAudios.forEach(function (track) {
      if (track.isHot) {
        console.log(track)
        setPayed(track);
      }

      setSongs(oldSong => [...oldSong, track]);

    })

  }


  return (
    <div>
      <Head>
        <title>Howl At the Moon</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-background_mood-dark to-transparent">
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
          <motion.img variants={starsVariants} initial='hidden' animate='visible' className="background-image h-full object-cover" src="./stars.png" alt="Stars on Background" />

          <motion.img variants={moonVariants} initial='hidden' animate='visible' className="background-image mix-blend-screen david" src="./moon2.png" alt="Moon on Background" />
          <motion.img variants={backMtVariants} initial='hidden' animate='visible' className="background-image bottom-0 clip-background" src="./mountains_behind.png" alt="Mountains on Background" />
          <motion.img variants={frontMtVariants} initial='hidden' animate='visible' className="background-image max-h-screen bottom-0 z-50 clip-background text-background_mood-dark" src="./mountains_front.png" alt="Mountains on Background" />
          <motion.div style={{ position: 'absolute', top: '25%' }} variants={textVariants} initial='hidden' animate='visible'><h2 className="text-white text-4xl md:text-uni font-bold">Today's Pick</h2></motion.div>
          <motion.div variants={textVariants} initial='hidden' animate='visible' style={{ top: '33%' }}>
            {payed && <AudioPlayer className=""
              title={payed.title}
              artwork={payed.artwork}
              artist={payed.artist}
              src={payed.url}
            />}
          </motion.div>

        </section>
      </main>
      <div className="min-h-screen bg-gradient-to-b from-background_mood-dark to-background_mood-medium">
        <div>
          <h1 className="">Horror stories</h1>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            {songs.map((song) => (
              <AudioPlayer className=""
                key={song.id}
                title={song.title}
                artwork={song.artwork}
                artist={song.artist}
                trackNum={song.id}
                src={song.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home
