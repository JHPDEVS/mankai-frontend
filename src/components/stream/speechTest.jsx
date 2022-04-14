import { useEffect, useState } from 'react'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'ko'
function App() {
  const [speech, setSpeech] = useState(null)
  const [speechBoolean, setSpeechBoolean] = useState(false)
  useEffect(() => {
    // console.log(speechBoolean);
    if (speechBoolean) {
      // console.log('start');
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      // console.log('stop');
      mic.stop()
      mic.onend = () => {
        console.log('stopped mic on click')
      }
    }
    mic.onstart = () => {
      console.log('mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      // console.log(transcript)
      setSpeech(transcript)

      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }, [speechBoolean])

  useEffect(() => {
    console.log(speech)
  }, [speech])
  return (
    <div className="App">
      <header className="App-header">stt prac</header>
      <button
        onClick={e => setSpeechBoolean(!speechBoolean)}
        className="bg-blue-300"
      >
        음성 테스트
      </button>
      <p>{speech}</p>
    </div>
  )
}

export default App
