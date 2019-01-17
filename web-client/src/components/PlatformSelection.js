import React from 'react'
import { Tab } from 'semantic-ui-react'
import styled from 'styled-components'

import GamesContainer from './GamesContainer'

const CustomTab = styled(Tab)`
  &&& {
    background-color: #0849b9;
  }

  &&& a {
    color: #ffffff !important;
  }

  &&& a.active.item {
    border-color: #ffffff !important;
  }

  &&& a:first-child {
    margin-left: auto !important;
  }

  &&& a:last-child {
    margin-right: auto !important;
  }
`

const panes = [
  {
    menuItem: 'PS4',
    render: () => (
      <Tab.Pane attached={false}>
        <GamesContainer />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'XBox',
    render: () => (
      <Tab.Pane attached={false}>
        <GamesContainer />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'PC',
    render: () => (
      <Tab.Pane attached={false}>
        <GamesContainer />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Mobile',
    render: () => (
      <Tab.Pane attached={false}>
        <GamesContainer />
      </Tab.Pane>
    )
  }
]

const PlatformSelection = () => {
  return <CustomTab menu={{ secondary: true, pointing: true }} panes={panes} />
}

export default PlatformSelection
