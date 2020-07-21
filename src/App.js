import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [textStateBornDate, setTextStateBornDate] = useState("Entrez votre jours de naissance")
  const [yearsBornDate, setYearsBornDate] = useState("")
  const [monthBornDate, setMonthBornDate] = useState("")
  const [dayBornDate, setDayBornDate] = useState("")
  const [messageErrorGeneral, setMessageErrorGeneral] = useState("")
  const [visibilitySeconds, setVisibilitySeconds] = useState(false)
  const [age, setAge] = useState()
  const [secondsInLife, setSecondsInLife] = useState()
  const [toggleDay, setToggleDay] = useState(true)
  const [toggleMonth, setToggleMonth] = useState(false)
  const [toggleYears, setToggleYears] = useState(false)
  const [visibleMessage, setVisibleMessage] = useState("")
  const [differenceInSeconds, setDifferenceInSeconds] = useState()
  const thisYears = new Date()
  let   thisDay   = new Date()
  let   thisMonth = new Date()
  let   realAgeinSecond = 31536000 * age
  const getYears = thisYears.getFullYear() 
  const getDay   = thisDay.getDate()
  const getMonth = thisMonth.getMonth() + 1
  let dayCalculSeconds
  let differenceDay
  let differenceMonth

// Day of born submit Action

  const submitBornDay = (event) => {
    event.preventDefault()
    setMessageErrorGeneral("Veuillez entrer un jours en chiffre ex: 06")
    if(isNaN(dayBornDate) === true) {
      event.preventDefault()
      setMessageErrorGeneral("Veuillez entrer un jours en chiffre ex: 06")
    } else {
      setTextStateBornDate("Quelle mois ?")
      setToggleDay(false)
      setToggleMonth(true)
      setVisibleMessage(dayBornDate)
    }
  }

  //  Setting visibility, text & toggle for Month submit action

  const settingForMonthStep = () => {
    setTextStateBornDate("Quelle année ?")
    setToggleMonth(false)
    setToggleYears(true)
    setVisibleMessage(dayBornDate + " - " + monthBornDate)
  }

  // Month of born submit Action (Activate text step and start calcul of age difference)

  const submitBornMonth = (event) => {
    event.preventDefault()
    setMessageErrorGeneral("")
    if(isNaN(monthBornDate) === true) {
      event.preventDefault()
      setMessageErrorGeneral("Veuillez entrer un mois en chiffre ex: 13")
    } else {
      if(dayBornDate > getDay) { 
        differenceDay = dayBornDate - getDay
        const dayCalculSeconds = differenceDay * 86400
        console.log(dayCalculSeconds + " secondes des jours")
        settingForMonthStep()
      } if(dayBornDate === getDay) { 
        settingForMonthStep()
      } if(dayBornDate < getDay) { 
        differenceDay = getDay - dayBornDate
        const dayCalculSeconds = differenceDay * 86400
        console.log(dayCalculSeconds + " secondes des jours")
        settingForMonthStep()
      }
    }
  }

  // Setting visibility, text & toggle for Years submit action

  const settingForYearsStep = () => {
    setTextStateBornDate("Interressant, vous avez " + age + " ans")
    setVisibleMessage(dayBornDate + " - " + monthBornDate + " - " + yearsBornDate)
    setVisibilitySeconds(true)
  }

  const settingForYearsStepWithDecalage = () => {
    let decalageAge = age - 1
    setTextStateBornDate("Interressant, vous avez " + decalageAge + " ans")
    setVisibleMessage(dayBornDate + " - " + monthBornDate + " - " + yearsBornDate)
    setVisibilitySeconds(true)
  }

  // Day of born submit Action (conclusion of age and setting calcul of secondes)

  const submitBornYears = (event) => {
    event.preventDefault()
    setToggleYears(false)
    if(monthBornDate > getMonth) { 
      differenceMonth = (monthBornDate - getMonth) * 30
      let realMonthDifference = (31536000 - (differenceMonth * 86400)) - dayCalculSeconds
      setDifferenceInSeconds(realMonthDifference)
      console.log(differenceInSeconds + " total")
      settingForYearsStepWithDecalage()
    } if(monthBornDate === getMonth) {
        if(dayBornDate > getDay) {
          settingForYearsStepWithDecalage()
        } if(dayBornDate < getDay){
          settingForYearsStep()
        } if(dayBornDate === getDay) {
          settingForYearsStep()
        }
    } if(monthBornDate < getMonth) {
      settingForYearsStep()
      differenceMonth = getMonth - monthBornDate
      setDifferenceInSeconds(differenceMonth * 86400 + dayCalculSeconds)
      console.log(differenceInSeconds + " total")
    }
  }


  useEffect(() => {
    setAge( getYears - yearsBornDate)
    if(visibilitySeconds === true) {
      if(age) {
        setSecondsInLife(realAgeinSecond) 
        setInterval(() => {
          setSecondsInLife(secondsInLife => secondsInLife + 1)
        }, 1000)
      }
    }
  },[dayBornDate, monthBornDate, yearsBornDate, textStateBornDate, messageErrorGeneral, age, realAgeinSecond, differenceInSeconds, getYears])

  return (
    <div className="App">
      <div className="input_display">
        <h2>{textStateBornDate}</h2>
        <form className={toggleDay ? "form-display" : "displayNoneInput"} onSubmit={submitBornDay}>
          <input className="input-style" type="text" placeholder="exemple : 13" value={dayBornDate} onChange={(e) => setDayBornDate(e.target.value)}/>
        </form>
        <form className={toggleMonth ? "form-display" : "displayNoneInput"} onSubmit={submitBornMonth}>
          <input className="input-style" type="text" placeholder="exemple : 06" value={monthBornDate} onChange={(e) => setMonthBornDate(e.target.value)}/>
        </form>
        <form className={toggleYears ? "form-display" : "displayNoneInput"} onSubmit={submitBornYears}>
          <input className="input-style" type="text" placeholder="exemple : 1997" value={yearsBornDate} onChange={(e) => setYearsBornDate(e.target.value)}/>
        </form>
        <h5>{messageErrorGeneral}</h5>
        <h2 className={visibilitySeconds ? "SecondsText-not-visible" : "SecondsText-visible"}>{visibleMessage}</h2>
        <h3 className={visibilitySeconds ? "SecondsText-visible" : "SecondsText-not-visible"}>ou {secondsInLife} secondes</h3>
      </div>
    </div>
  )
}

export default App
