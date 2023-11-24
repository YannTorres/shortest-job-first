import styled from 'styled-components'

export const MainContainer = styled.main``

export const Input = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 0.5rem;
  margin-top: -1.75rem;

  input[type='text'] {
    border: 1px solid #0d0d0d;
    box-shadow: none;
    padding: 1rem;
    background: #262626;
    border-radius: 8px;
    width: 27.625rem;
    color: white;
  }

  input[type='number'] {
    border: 1px solid #0d0d0d;
    box-shadow: none;
    padding: 1rem;
    background: #262626;
    border-radius: 8px;
    color: white;
  }

  button {
    border: none;
    padding: 1rem;
    background-color: #1e6f9f;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s;
  }

  button:hover {
    background-color: #4ea8de;
  }
`

export const ListProcess = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4rem;
  margin-inline: auto;
  margin-bottom: 1.5rem;
  justify-content: left;
  gap: 0.5rem;
  width: 48rem;

  p {
    color: #4ea8de;
    font-weight: bold;
  }

  span {
    border-radius: 999px;
    background: #333333;
    color: white;
    padding-inline: 0.5rem;
  }
`
