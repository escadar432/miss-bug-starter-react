import fs from 'fs'
import Cryptr from 'cryptr'

import { utilService } from '../public/services/util.service.js'


const gUsers = utilService.readJsonFile('data/users.json')

export const userService = {
    query,
    getById,
    save,
    remove,

    checkLogin,
    getLoginToken,
    validateToken
}

function query() {
    const usersToReturn = gUsers.map(user => ({ _id: user._id, fullname: user.fullname }))
    if (usersToReturn === undefined || usersToReturn.length === 0) return Promise.reject('No users found')
    return Promise.resolve(usersToReturn)
}


function getById(userId) {
    var user = gUsers.find(user => user._id === userId)
    if (!user) return Promise.reject('User not found!')

    user = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
    }

    return Promise.resolve(user)
}


function remove(userId) {
    gUsers.filter(user => user._id !== userId)
    return _saveUsersToFile()
}


function checkLogin({ username, password }) {
    // You might want to remove the password validation for dev
    var user = gUsers.find(user => user.username === username && user.password === password)
    if (user) {
        user = {
            _id: user._id,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
        }
        return Promise.resolve(usersToReturn)

    }
    // if (user === undefined || !user) return Promise.reject('Error logging, Wrong username or password!') 
    return Promise.reject('Error logging, Wrong username or password!')

}
function save(user) {
    user._id = utilService.makeId()
    gUsers.push(user)

    return _saveUsersToFile()
        .then(() => ({
            _id: user._id,
            fullname: user.fullname,
            isAdmin: user.isAdmin,
        }))
}

function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function validateToken(token) {
    if (!token) return null

    const str = cryptr.decrypt(token)
    const user = JSON.parse(str)
    return user
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gBugs, null, 4)
        fs.writeFile('data/users.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })

    })
}