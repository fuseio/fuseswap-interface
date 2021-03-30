import React from 'react'
import styled from 'styled-components'

const Circles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: #f5f278;
    animation: animate 25s linear infinite;
    bottom: -150px;
  }

  li:nth-child(1) {
    left: 25%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
  }

  li:nth-child(2) {
    left: 10%;
    width: 100px;
    height: 100px;
    animation-delay: 2s;
    animation-duration: 12s;
  }

  li:nth-child(3) {
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
  }

  li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
  }

  li:nth-child(5) {
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
  }

  li:nth-child(6) {
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
  }

  li:nth-child(7) {
    left: 35%;
    width: 60px;
    height: 60px;
    animation-delay: 7s;
  }

  li:nth-child(8) {
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
  }

  li:nth-child(9) {
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
  }

  li:nth-child(10) {
    left: 85%;
    width: 100px;
    height: 100px;
    animation-delay: 0s;
    animation-duration: 11s;
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }
    30% {
      transform: translateY(-330px) rotate(240deg);
      background-color: #e5f588;
      border-radius: 10%;
    }
    50% {
      transform: translateY(-500px) rotate(360deg);
      background-color: #c6fbb3;
      border-radius: 25%;
    }
    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0.25;
      background-color: #77e183;
      border-radius: 50%;
    }
  }
`

export default function Bubbles() {
  return (
    <Circles>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </Circles>
  )
}
