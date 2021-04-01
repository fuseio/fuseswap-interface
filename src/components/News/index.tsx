import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex-wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 2rem;
  background-color: black;
  box-sizing: content-box;
}
`

const NewsWrapper = styled.div`
  display: inline-block;
  height: 2rem;
  line-height: 2rem;
  white-space: nowrap;
  padding-right: 100%;
  box-sizing: content-box;
}
`

export default function News() {
  const [data, setData] = useState<any[]>([])
  const fetchURL = "https://jsonplaceholder.typicode.com"
  const getData = () =>
    fetch(`${fetchURL}/posts`)
      .then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data.body))
  }, [])
  return (
    <Wrapper>
      <NewsWrapper>
      {data}
      </NewsWrapper>
    </Wrapper>
  )
}
