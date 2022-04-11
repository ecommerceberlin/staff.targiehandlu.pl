import React from 'react'
import {
  connect,
  reduxWrapper,
  configure,
  Wrapper
} from 'eventjuicer-site-components';

import { WidgetExhibitorsTable } from 'eventjuicer-admin-site-components'

const settings = require('../../settings').default;

const StaffPagePresentersBrands = () => (<Wrapper first><WidgetExhibitorsTable /></Wrapper>)

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["presenters"]
  })
})

export default connect()(StaffPagePresentersBrands);