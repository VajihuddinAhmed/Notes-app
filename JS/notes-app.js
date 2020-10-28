'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    renderNotes(notes, filters)
    location.assign(`/html/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})


// (*******Date Method********)
// const now = new Date('February 17 1995 15:32:12')
// console.log(now.toString())

// console.log(`Year: ${now.getFullYear()}`)
// console.log(`Month: ${now.getMonth()}`)
// console.log(`Day of Month: ${now.getDate()}`)
// console.log(`Hour: ${now.getHours()}`)
// console.log(`Minutes: ${now.getMinutes()}`)
// console.log(`Seconds: ${now.getSeconds()}`)

// const now = new Date()
// const timestamp = now.getTime()

// const mydate = new Date(timestamp)
// console.log(mydate.getFullYear())

// const dateOne = new Date('June 21 2019 12:10:00')
// const dateTwo = new Date()

// const dateOneStamp = dateOne.getTime()
// const dateTwoStamp = dateTwo.getTime()

// if (dateOneStamp < dateTwoStamp) {
//     console.log(dateOne.toString())
// } else if (dateTwoStamp < dateOneStamp) {
//     console.log(dateTwo.toString())
// }

const birthday = moment()
birthday.year(1995).month(1).date(17)
console.log(birthday.format('MMM D, YYYY'))