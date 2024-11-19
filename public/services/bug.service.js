const STORAGE_KEY = 'bugDB'

const BASE_URL = '/api/bug/'

export const bugService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter
}


function query(filterBy) {
  return axios
    .get(BASE_URL,{ params: filterBy })
    .then(res => res.data)
    .catch(err=> console.log("Error while getting bugs server bug-service", err))
}

function getById(bugId) {
  return axios.get(BASE_URL + bugId).then(res => res.data)
}

function remove(bugId) {
  return axios.delete(BASE_URL + bugId)
}

function save(bug) {
  if (bug._id) {
      return axios.put(BASE_URL, bug).then(res => res.data)
  } else {
      return axios.post(BASE_URL, bug).then(res => res.data)
  }
}

function getDefaultFilter() {
  return { txt: '', minSeverity: 0, labels: '', pageIdx: 0, sortBy: { title: '', desc: 1 } }
}

function _createBugs() {
  // let bugs = utilService.loadFromStorage(STORAGE_KEY)
  // if (!bugs || !bugs.length) {
  return [
    {
      title: "Infinite Loop Detected",
      severity: 4,
      _id: "1NF1N1T3"
    },
    {
      title: "Keyboard Not Found",
      severity: 3,
      _id: "K3YB0RD"
    },
    {
      title: "404 Coffee Not Found",
      severity: 2,
      _id: "C0FF33"
    },
    {
      title: "Unexpected Response",
      severity: 1,
      _id: "G0053"
    }
  ]
  //  utilService.saveToStorage(STORAGE_KEY, bugs)
}


function downloadPdf() {
  // return axios.get('/pdf',{ responseType: 'stream' }).then(res => res.data)
  // axios({
  //   url: '/pdf',
  //   method: 'GET',
  //   responseType: 'blob'
  // })
  //   .then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
}  