import Head from 'next/head'
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Header from '../components/Header'
import { storage } from '../firebase';


export default function Home() {

  const [audioUrl, setAudioUrl] = useState();

  useEffect(() => {
    const audioRef = storage.ref('audios');
    audioRef.listAll().then(function (result) {
      result.items.forEach(function (audioRef) {
        displayAudio(audioRef);
      });
    }).catch((error) => console.error(error))
  }, []);

  function displayAudio(audioRef) {
    audioRef.getDownloadURL().then(function (url) {
      setAudioUrl(url)
    }).catch(function (error) {
      console.error(error);
    })
  }

  return (
    <div className="w-screen h-screen bg-background_mood-dark">
      <Header />
      <main className="w-full h-full flex items-center justify-center">
        <ReactAudioPlayer className=""
          src={audioUrl}
          autoPlay
          controls
        />
      </main>
    </div>
  )
}
