import {
  connect,
  reduxWrapper,
  configure,
  Wrapper
} from 'eventjuicer-site-components';

import {
  WidgetExhibitorsList
} from 'eventjuicer-admin-site-components'

const settings = require('../settings').default;

const PageList = () => {

  return (
  <Wrapper first>
  <WidgetExhibitorsList />
  </Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report", "bookingmap"]
  })
})

export default connect()(PageList);