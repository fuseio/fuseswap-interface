import React from 'react'
import {useState} from "react";
import styled from 'styled-components'
import fuse from '../../assets/svg/fuse_sub.svg'
import { ChevronUp } from 'react-feather'


export const Wrapper = styled.div`
  position: relative;
  margin: auto;
  max-width: 525px;
  min-height:70px;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  border: solid 2px #000000;
  box-shadow:-webkit-box-shadow: 5px 5px 0px 0px #000000, 10px 10px 0px 0px #000000, 15px 15px 0px 0px #000000, 20px 20px 0px 0px #000000, 25px 25px 0px 0px #000000, 5px 5px 10px 4px rgba(248,207,255,0); 
  box-shadow: 5px 5px 0px 0px #000000, 8px 14px 0px 0px #000000, 16px 15px 0px 0px #000000, 5px 5px 10px 4px rgb(248 207 255 / 0%);
  border-radius: 30px;
  padding: 1rem;
  transition: height 10s;

`
export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  background: ${({ theme }) => theme.bg1};
  border-bottom: solid 2px #E4DDDD;
  line-height: 0rem;
`
export const HeaderItem = styled.div`
  display: flex;
  flex: 1 1 90%;
  flex-wrap: wrap;
  padding-bottom: 1rem;
`
const HeaderOptions = styled("div")<{ size: string, y: string }>`
  display: flex;
  flex: 1 1 10%;
  flex-wrap: wrap;
  transform: rotateX(${({ size }) => size}deg) translateX(10px) translateY(${({ y }) => y}px);
  transition: all 1s;
`

const ExpandableWrapper = styled.div`
overflow: hidden;
`

const Content = styled("div")<{ size: string }>`
margin-top: ${({ size }) => size}%;
transition: all 0.4s;`

export default function NewsModal() {
  const [open,setOpen] = useState(false);
  const articles = [
    {
    title: 'Article 1',
    description: 'Magna consectetur elit magna deserunt excepteur irure voluptate commodo do ipsum.',
    link: ''
  },
  {
    title: 'Article 2',
    description: 'Deserunt non occaecat tempor excepteur amet id sint eu laborum in.',
    link: ''
  },
  {
    title: 'Article 3',
    description: 'Est do dolor voluptate Lorem laborum ad ex pariatur anim id ea.',
    link: ''
  },

]
  const toggle = () => {setOpen(!open)}

  return (
    <Wrapper>
      <Header onClick={toggle}>
       <HeaderItem>
        <div>
          <img src={fuse} alt="test" width="32px"></img> 
        </div>
        <div>
          <h4>News</h4>
        </div>
       </HeaderItem>
        <HeaderOptions size={open? '-175' : '0'} y={open? '25' : '0'}>
        <ChevronUp />
        </HeaderOptions>
      </Header>

      <ExpandableWrapper>
        <Content size={open ? '0' : '-100'}>
        {articles.map((article, index) => (
          <div>
          <h4>{article.title}</h4>
          <p>{article.description}</p>
          <a href={article.link}>Read More</a>
          </div>
        ))}
        </Content>
      </ExpandableWrapper>
    </Wrapper>
  );
}