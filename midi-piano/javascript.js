// rewrite this code for practice and fix the drag behavior on the mouseup events

const audioContext = new AudioContext()

const NOTE_DETAILS = [
  { note: 'C', key: 'Z', frequency: 261.626 },
  { note: 'Db', key: 'S', frequency: 277.183 },
  { note: 'D', key: 'X', frequency: 293.665 },
  { note: 'Eb', key: 'D', frequency: 311.127 },
  { note: 'E', key: 'C', frequency: 329.628 },
  { note: 'F', key: 'V', frequency: 349.228 },
  { note: 'Gb', key: 'G', frequency: 369.994 },
  { note: 'G', key: 'B', frequency: 391.995 },
  { note: 'Ab', key: 'H', frequency: 415.305 },
  { note: 'A', key: 'N', frequency: 440 },
  { note: 'Bb', key: 'J', frequency: 466.164 },
  { note: 'B', key: 'M', frequency: 493.883 },
  { note: 'C2', key: ',', frequency: 523.25 }
]

const CORRECT_SEQUENCE = ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'B', 'Z', 'X', 'C']
//                       ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'B', 'Z', 'X', 'C']

let currentSequence = []
let allKeys = document.querySelectorAll('.key')

// THIS WORKS
document.addEventListener('mouseup', (e) => {
  if (e.target.getAttribute('data-note')) {
    console.log('Okay response!')
  } else {
    console.log("Don't drag outside of the key!")
  }
})

function killProcess() {
  // run this to stop process, reset sequence, stop audio, etc if they drag outside of the key
}

allKeys.forEach((key) => {
  key.addEventListener('mousedown', (e) => {
    const keyCode = e.target.getAttribute('data-note')
    const noteDetails = getNoteDetailsFromMouse(keyCode)
    if (noteDetails == null) return

    currentSequence.push(noteDetails.key)
    checkSequence()

    noteDetails.active = true

    playNote()
  })
})
// problem when clicking and dragging outside of the keyboard div
allKeys.forEach((key) => {
  key.addEventListener('mouseup', (e) => {
    console.log(e.target)
    const keyCode = e.target.getAttribute('data-note')
    const noteDetails = getNoteDetailsFromMouse(keyCode)

    if (noteDetails == null) return

    noteDetails.active = false

    playNote()
    checkCompletion()
  })
})

document.addEventListener('keydown', (e) => {
  if (e.repeat) return

  const keyCode = e.key.toLocaleUpperCase()
  const noteDetails = getNoteDetails(keyCode)

  if (noteDetails == null) return

  currentSequence.push(noteDetails.key)
  checkSequence()

  noteDetails.active = true

  playNote()
})

document.addEventListener('keyup', (e) => {
  const keyCode = e.key.toLocaleUpperCase()
  const noteDetails = getNoteDetails(keyCode)

  if (noteDetails == null) return

  noteDetails.active = false

  playNote()
  checkCompletion()
})

function getNoteDetails(keyCode) {
  return NOTE_DETAILS.find((n) => n.key === keyCode)
}

function getNoteDetailsFromMouse(keyCode) {
  return NOTE_DETAILS.find((n) => n.note === keyCode)
}

function playNote() {
  NOTE_DETAILS.forEach((n) => {
    const noteElement = document.querySelector(`[data-note=${n.note}]`)
    noteElement.classList.toggle('active', n.active || false)

    if (n.oscillator != null) {
      n.oscillator.disconnect()
    }
  })

  const activeNotes = NOTE_DETAILS.filter((n) => n.active)
  const gain = 1 / activeNotes.length
  activeNotes.forEach((n) => {
    startNote(n, gain)
  })
}

function startNote(noteDetail, gain) {
  const gainNode = audioContext.createGain()
  gainNode.gain.value = gain
  const oscillator = audioContext.createOscillator()
  oscillator.frequency.value = noteDetail.frequency
  oscillator.type = 'sine'
  oscillator.connect(gainNode).connect(audioContext.destination)
  oscillator.start()

  noteDetail.oscillator = oscillator
}

let indexTracker = 0
function checkSequence() {
  if (currentSequence[indexTracker] === CORRECT_SEQUENCE[indexTracker]) {
    indexTracker += 1
  } else {
    indexTracker = 0
    currentSequence = []
    return
  }
}

function checkCompletion() {
  if (currentSequence.length === 11) {
    alert('You did it!')
    indexTracker = 0
    currentSequence = []
    return
  }
}
