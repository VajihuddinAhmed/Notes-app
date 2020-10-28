'use strict'

const titleElement = document.querySelector('#noteTitle')
const bodyElement = document.querySelector('#noteBody')
const removeElement = document.querySelector('#remove-note')
const createElement = document.querySelector('#create-note')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let newNote = notes.find((item, i) => item.id === noteId)

// newNote === undefined --> truthy or falsy situation
if (!newNote) {
    location.assign('/index.html')
}

titleElement.value = newNote.title
bodyElement.value = newNote.body
dateElement.textContent = `Last edited ${moment(newNote.updatedAt).fromNow()}`

titleElement.addEventListener('input', (event) => {
    newNote.title = event.target.value
    newNote.updatedAt = moment().valueOf()
    dateElement.textContent = `Last edited ${moment(newNote.updatedAt).fromNow()}`
    saveNotes(notes)
})

bodyElement.addEventListener('input', (event) => {
    newNote.body = event.target.value
    newNote.updatedAt = moment().valueOf()
    dateElement.textContent = `Last edited ${moment(newNote.updatedAt).fromNow()}`
    saveNotes(notes)
})

createElement.addEventListener('click', (event) => {
    location.assign('/index.html')
})

removeElement.addEventListener('click', (event) => {
    removeNote(newNote.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', (event) => {
    if (event.key === 'notes') {
    notes = JSON.parse(event.newValue)
    newNote = notes.find((item, i) => {
        return item.id === noteId
    })
    // newNote === undefined --> truthy or falsy situation
    if (!newNote) {
        location.assign('/index.html')
    }
    
    titleElement.value = newNote.title
    bodyElement.value = newNote.body
    dateElement.textContent = `Last edited ${moment(newNote.updatedAt).fromNow()}`
    }
})