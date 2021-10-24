import {
  connect,
  reduxWrapper,
  configure,
  Wrapper
} from 'eventjuicer-site-components';

import {ExhibitorsStats} from 'eventjuicer-admin-site-components'

const settings = require('../settings').default;

const PageStats = () => {
  return (<Wrapper label="Stats"><ExhibitorsStats /></Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report"]
  })
})

export default connect()(PageStats);