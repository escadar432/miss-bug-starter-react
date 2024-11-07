import fs from 'fs'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'bugDB'

const bugs = utilService.readJsonFile('data/bugs.json')
console.log("BUGS form bug server", bugs)

//const bugsMapById = load.keyBy(bugs, '_id')


export const bugService = {
    query,
    getById,
    save,
    remove
}

function query() {
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = bugs.find((bug) => bug._id === bugId)
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
    if (bugToSave._id) {
        const bugIdx = bugs.findIndex(bug => bug._id === bugToSave._id)
        bugs[bugIdx] = { ...bugToSave }
    } else {
        bugToSave._id = _makeId()
        bugs.push(bugToSave)
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
    const bugIdx = bugs.findIndex(bug => bug._id === bugId)
    if (bugIdx === -1) return Promise.reject('No bug found')
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}
function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })

    })

}
