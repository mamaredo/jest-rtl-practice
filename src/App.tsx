// import React from 'react'
// import './index.css'

// function getUser() {
//   return Promise.resolve({ id: '1', name: 'Robin' })
// }

// function App() {
//   const [search, setSearch] = React.useState('')
//   const [user, setUser] = React.useState<null | { id: string; name: string }>(
//     null
//   )

//   React.useEffect(() => {
//     const loadUser = async () => {
//       const user = await getUser()
//       setUser(user)
//     }

//     loadUser()
//   }, [])

//   function handleChange(event: any) {
//     setSearch(event.target.value)
//   }

//   return (
//     <div>
//       {user ? <p>Signed in as {user.name}</p> : null}

//       <Search value={search} onChange={handleChange}>
//         Search:
//       </Search>

//       <p>Searches for {search ? search : '...'}</p>
//     </div>
//   )
// }

// export function Search({ value, onChange, children }: any) {
//   return (
//     <div>
//       <label htmlFor='search'>{children}</label>
//       <input id='search' type='text' value={value} onChange={onChange} />
//     </div>
//   )
// }

// export default App

import React from 'react'
import axios from 'axios'

const URL = 'http://hn.algolia.com/api/v1/search'

function App() {
  const [stories, setStories] = React.useState([])
  const [error, setError] = React.useState<null | any>(null)

  async function handleFetch(event: any) {
    console.log('hoge')
    let result

    try {
      result = await axios.get(`${URL}?query=React`)
      console.log(result.data)
      setStories(result.data.hits)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div>
      <button type='button' onClick={handleFetch}>
        Fetch Stories
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map((story: any) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
