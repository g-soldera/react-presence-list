import { useState, useEffect } from "react"

import Card from "../../components/namecard/Card"

import "./Home.scss"
import "../../components/button/Button.scss"
import "../../components/input/Input.scss"

export function Home() {
  const [members, setMembers] = useState([])
  const [memberName, setMemberName] = useState()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [inputValue, setInputValue] = useState("")
  const [user, setUser] = useState({ name: "", avatar: "" })

  function handleAddMember() {
    const newAddMember = {
      name: memberName,
      time: currentTime.toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    }
    setMembers([...members, newAddMember])
    setMemberName("")
    setInputValue("")
  }

  const handleInputChange = (event) => {
    setInputValue(event)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    async function fetchData() {
      try {
        const response = await fetch("https://api.github.com/users/g-soldera")
        const data = await response.json()
        setUser({ name: data.login, avatar: data.avatar_url })
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
    
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <div className="containerHome">
        <header>
          <h1>Presence List</h1>
          <div className="user">
            <strong className="userName">{user.name}</strong>
            <img src={user.avatar} alt="" />
          </div>
        </header>

        <div className="inputArea">
          <input
            type="text"
            name="name"
            id="nameInput"
            value={inputValue}
            placeholder="Type your name..."
            onChange={(e) => {
              setMemberName(e.target.value)
              handleInputChange(e.target.value)
            }}
          />

          <input
            className="button"
            type="button"
            value="Add"
            onClick={memberName ? handleAddMember : null}
          />
        </div>
        <div className="membersList">
          <Card
            name={memberName}
            time={currentTime.toLocaleTimeString("pt-br", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          />
          {members.map((newMember, index) => (
            <Card key={index} name={newMember.name} time={newMember.time} />
          ))}
        </div>
      </div>
    </>
  )
}
