import fs from 'fs'
import { utilService } from './util.service.js'


//TODO when bugs file is empty, show message 'No bugs found, Add one!'
const gBugs = utilService.readJsonFile('data/bugs.json')

export const bugService = {
    query,
    getById,
    save,
    remove
}

function query(filterBy = { txt: '', severity: 0, sortBy: { type: 'title', desc: 1 } }) {
    var bugs = gBugs
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        bugs = gBugs.filter(bug => regex.test(bug.title))
    }
    if (filterBy.severity) {
        bugs = bugs.filter(bug => bug.severity >= filterBy.severity)
    }
    console.log("bugs before label filter",bugs)
    
    //TODO EMPTY LABELS
    if (filterBy.labels) {
        const labelsToFilter = filterBy.labels
        console.log("labelsToFilter", labelsToFilter)
        
        bugs = gBugs.filter(bug =>
            labelsToFilter.every(label => bug.labels.includes(label))
        )
    }
    //console.log("bugs from query", bugs)
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    if (!bug) return Promise.reject('cannot find bug' + bugId)
    return Promise.resolve(bug)
}

function getBugIndex(bugId) {
    const bug = bugsMapById[bugId]
    if (!bug) return Promise.reject('Bug service couldn\'t find the bug. Try again later!');
    return Promise.resolve(bug)
}
//
function save(bugToSave) {
    //TODO 
    // 1.refactor to not send empty title
    // 2. add createdAt and updatedAt
    //3. esc button to cancel deleletion [confirm Promise]
    if (bugToSave._id) {
        const bugIdx = gBugs.findIndex(bug => bug._id === bugToSave._id)
        gBugs[bugIdx] = { ...bugToSave }
    } else {
        bugToSave._id = _makeId()
        bugService.createdAt = Date.now()
        gBugs.unshift(bugToSave)
    }

    return _saveBugsToFile().then(() => bugToSave)
}

function _makeId(length = 5) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function remove(bugId) {
    console.log("im in remove server func")

    const bugIdx = gBugs.findIndex(bug => bug._id === bugId)
    if (bugIdx === -1) return Promise.reject('No bug found')
    gBugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}
function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gBugs, null, 4)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })

    })
}
