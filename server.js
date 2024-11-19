import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import chalk from 'chalk'
import { bugService } from './services/bug.service.js'
import { userService } from './services/user.service.js'

const app = express()

// Config the Express App
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

// List
app.get('/api/bug', (req, res) => {
    const filterBy = {
        txt: req.query.txt || '',
        severity: +req.query.severity || 0,
        labels: req.query.labels || ''
    }

    if (req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
    if (req.query.sortBy) filterBy.sortBy = JSON.parse(req.query.sortBy)
    bugService.query(filterBy)
        .then(bugs => res.send(bugs))
        .catch(`Cannot get bugs`, err => res.status(400).send(err))
})

// Read
app.get('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params

    let visitedBugIds = req.cookies.visitedBugIds || []
    if (!visitedBugIds.includes(bugId)) visitedBugIds.push(bugId)
    if (visitedBugIds.length > 3) return res.status(401).send('Wait for a bit')

    res.cookie('visitedBugIds', visitedBugIds, { maxAge: 1000 * 60 * 3 })
    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => res.status(401).send('Cannot get bug', err))
})

// Delete
app.delete('/api/bug/:bugId', (req, res) => {
    const { bugId } = req.params
    bugService.remove(bugId)
        .then(() => res.send(`Bug id : ${bugId} deleted`))
        .catch(err => res.status(400).send('Had issues deleting bug :', err))
})


// Create
app.post('/api/bug', (req, res) => {
    const bug = req.body
    bugService.save(bug)
        .then(addedBug => res.send(addedBug))
        .catch(err => res.status(500).send('Had issues adding:', err))
})

// Update
app.put('/api/bug', (req, res) => {
    const bug = req.body
    bugService.save(bug)
        .then(savedBug => res.send(savedBug))
        .catch(err => res.status(500).send('Had issues editing:', err))
})



// ~~~~~~~~~Users~~~~~~~~

// Get users
app.get('/api/user', (req, res) => {
    userService.query()
        .then(users => res.send(users))
        .catch(err => {
            loggerService.error('Cannot load users', err)
            res.status(400).send('Cannot load users')
        })
})

//Get user by Id
app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params

    userService.getById(userId)
        .then(user => res.send(user))
        .catch(err => {
            loggerService.error('Cannot load user', err)
            res.status(401).send('Cannot load user')
        })
})

// Auth login 
app.post('/api/user/auth/login', (req, res) => {
    const credentials = req.body
    
    console.log('credentials', credentials)
    
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(404).send('Invalid Credentials')
            }
        })
})

app.post('/api/auth/signup', (req, res) => {
    const credentials = req.body

    userService.save(credentials)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)
            } else {
                res.status(400).send('Cannot signup')
            }
        })
})

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('logged-out!')
})

// Fallback route
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const port = 3000

app.listen(port, () => {
    console.log(`Server is ready at ${port} http://127.0.0.1:${port}/`)
})