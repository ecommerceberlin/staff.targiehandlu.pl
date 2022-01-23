import React from 'react'

import {
  connect,
  reduxWrapper,
  configure,
  Wrapper,

} from 'eventjuicer-site-components';

import {
  WidgetExhibitorsMap
} from 'eventjuicer-admin-site-components'

const settings = require('../settings').default;



const PageMap = () => (<Wrapper first><WidgetExhibitorsMap /></Wrapper>)



export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report", "bookingmap", "tickets"]
  })
})

export default connect()(PageMap);