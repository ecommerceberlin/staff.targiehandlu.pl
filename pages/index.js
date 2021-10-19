import {
  connect,
  reduxWrapper,
  configure,
  Wrapper
} from 'eventjuicer-site-components';

import {useRouter} from 'next/router'  
const settings = require('../settings').default;
import PageAdminReport from '../lib/PageAdminReport'

const CustomPageAdminReport = () => {
  const {query:{sort,details}} = useRouter();
  return (<Wrapper><PageAdminReport sort={sort} details={Boolean(details)} /></Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report","bookingmap"]
  })
})

export default connect()(CustomPageAdminReport);