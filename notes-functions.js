
// Read existing notes from local storage
const getSavedNotes =  () => {
    const notesJSON = localStorage.getItem('notes')
        return notesJSON ? JSON.parse(notesJSON) : []
    }
    
    //Save the notes to local storage 
    const saveNotes = function(notes) {
        localStorage.setItem('notes', JSON.stringify(notes))
    }
    
    //Remove a note from the list
    const removeNote = (id) => {
        const noteIndex = notes.findIndex((note) => note.id === id) 
    
        if (noteIndex > -1) {
            notes.splice(noteIndex, 1)
        }
    }
    
    // Generate the DOM structure for a note
    const generateNoteDOM = (note) => {
        const noteEl = document.createElement('div')
        const textEl = document.createElement('a')
        const button = document.createElement('button')
        noteEl.classList.add("note-border-bottom");
    
        //Set up the remove note button
        button.textContent = 'x'
        noteEl.appendChild(button)
        button.addEventListener('click', () => {
            removeNote(note.id)
            saveNotes(notes)
            renderNotes(notes, filters)
        })
    
        //Setup the note title text
        if (note.title.length > 0){
            textEl.textContent = note.title
        } else {
            textEl.textContent = 'Unnamed note'
        }
    
        textEl.setAttribute('href', `/edit.html#${note.id}`)
    
        noteEl.appendChild(textEl)
    
        return noteEl
    }
    
    
    //Sort notes by one of three ways
    const sortNotes = (notes, sortBy) => {
        if (sortBy === 'byEdited') {
            return notes.sort((a, b) => {
                if (a.updateAt > b.updateAt) {
                    return -1
                } else if (a.updatedAt < b.updatedAt) {
                    return 1
                } else {
                    return 0
                }
            })
        } else if (sortBy === 'byCreated') {
            return notes.sort((a,b) => {
                if (a.createdAt > b.createdAt) {
                    return -1
                } else if (a.createdAt < b.createdAt) {
                    return 1
                } else {
                    return 0
                }
                
            })
        } else if (sortBy === 'alphabetical') {
            return notes.sort((a,b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) {
                    return -1
                } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                    return 1
                } else {
                    return 0
                }
            })
        } else {
            return notes
        }
    }
    
    // Render application notes
    const renderNotes = (notes, filters) => {
        notes = sortNotes(notes, filters.sortBy)
        const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
        document.querySelector('#notes').innerHTML = ''
        
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            document.querySelector('#notes').appendChild(noteEl)
        })
    }
    
    
    //Generate last edited message 
    const generateLastEdited = ((timestamp) => `Last edited ${moment(note.updatedAt).fromNow()}`)