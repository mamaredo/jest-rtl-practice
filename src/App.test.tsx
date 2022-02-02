/* eslint-disable testing-library/no-debugging-utils */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'
import axios from 'axios'

jest.mock('axios')

const axiosGet = jest.spyOn(axios, 'get')

describe('App', () => {
  test('fetches stories from an API and displays them', async () => {
    const stories = [
      { objectID: '1', title: 'Hello' },
      { objectID: '2', title: 'React' }
    ]

    axiosGet.mockImplementation(() =>
      Promise.resolve({ data: { hits: stories } })
    )

    render(<App />)

    userEvent.click(screen.getByRole('button'))

    const items = await screen.findAllByRole('listitem')

    expect(items).toHaveLength(2)
  })
})

// describe('App', () => {
// test('render App component', () => {
//   render(<App />)

//   // screen.getByText('Search: ')
//   // screen.getByRole('')
//   expect(screen.getByRole('textbox')).toBeInTheDocument()
//   expect(screen.getByText('Search:')).toBeInTheDocument()

//   // eslint-disable-next-line testing-library/no-debugging-utils
//   // screen.debug()
// })

// test('renders App async component', async () => {
//   render(<App />)

//   expect(screen.queryByText(/Signed in as/)).toBeNull()

//   // screen.debug()

//   expect(await screen.findByText(/Signed in as/)).toBeInTheDocument()

//   // screen.debug()
// })

// test('fireEvent', async () => {
//   render(<App />)

//   // wait for the user to resolve
//   // needs only be used in our special case
//   await screen.findByText(/Signed in as/)

//   expect(screen.queryByText(/Searches for JavaScript/)).toBeNull()

//   fireEvent.click(screen.getByRole('textbox'), {
//     target: { value: 'JavaScript' }
//   })

//   expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument()
// })

//   test('userEvent', async () => {
//     render(<App />)

//     // wait for the user to resolve
//     await screen.findByText(/Signed in as/)

//     expect(screen.queryByText(/Searches for JavaScript/)).toBeNull()
//     screen.debug()
//     await userEvent.type(screen.getByRole('textbox'), 'JavaScript', {
//       delay: 1
//     })

//     screen.debug()
//     expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument()
//   })

//   test('calls the onChange callback handler', () => {
//     const onChange = jest.fn()

//     render(
//       <Search value='' onChange={onChange}>
//         Search:
//       </Search>
//     )

//     fireEvent.change(screen.getByRole('textbox'), {
//       target: { value: 'JavaScript' }
//     })

//     expect(onChange).toHaveBeenCalledTimes(1)
//   })

//   test('call the onChange callback handler', () => {
//     const onChange = jest.fn()

//     render(
//       <Search value='' onChange={onChange}>
//         Search:
//       </Search>
//     )

//     userEvent.type(screen.getByRole('textbox'), 'JavaScript')

//     expect(onChange).toHaveBeenCalledTimes(10)
//   })
// })
