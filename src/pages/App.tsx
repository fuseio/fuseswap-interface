import React, {Suspense} from 'react'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Popups from '../components/Popups'
import Background from '../components/Background'
import {  HashRouter ,Switch, Route } from 'react-router-dom'

import Web3ReactManager from '../components/Web3ReactManager'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import Pool from './Pool'
import Farm from './Farm'
import FarmSelect from './Farm/reselect'
import Lending from './Lending/index'

import Home from './Home'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import Bridge from './Bridge'
import { RedirectToDefault } from './redirects'
import Menu from '../components/Menu'

const AppWrapper = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 100vh;
    align-items: stretch;
`
const LeftMenu = styled.div`
    height: 100vh;
    flex: 0 0 19%;
    order: -1;
    ${({ theme }) => theme.mediaWidth.upToSmall`display: none;flex: 0 0 0`};
    ${({ theme }) => theme.mediaWidth.upToMedium`display: none;flex: 0 0 22%`};

`

const Sticky = styled.div`
  position: fixed;
position: -webkit-fixed;
top: 0;
width: 19%;
height: 100vh;
${({ theme }) => theme.mediaWidth.upToSmall`display: none;`};
`
const Content = styled.div`
background: black;
order: 1;
padding-top: 1rem;
width: 100%;
position: relative;
`

const Zindex = styled.div`
width: 100%;
height: 100%;
`

export default function App() {
  return (
      <Suspense fallback={null}>
      <HashRouter>
          <AppWrapper>
      <LeftMenu>
        <Sticky>
              <Menu></Menu>
        </Sticky>
      </LeftMenu>
          <Content>
          <Route exact strict path="/home" component={Background} />
          <Route component={GoogleAnalyticsReporter} />
            <Zindex>
            <Web3ReactManager>
                <Switch>
                <Route exact strict path="/home" component={Home} />
                <Route exact strict path="/swap" component={Swap} />
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                <Route exact strict path="/find" component={PoolFinder} />
                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/create" component={RedirectToAddLiquidity} />
                <Route exact path="/add" component={AddLiquidity} />
                <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
                <Route exact strict path="/bridge" component={Bridge} />
                <Route exact strict path="/farm" component={Farm} />
                  <Route exact path="/farm/:currencyIdA" component={FarmSelect} />
                  <Route exact strict path="/lending" component={Lending} />


                <Route component={RedirectToDefault} />
              </Switch>
              </Web3ReactManager>
     </Zindex>
     <Popups />

      </Content>
    </AppWrapper>
      </HashRouter>
      </Suspense>

  )
}
