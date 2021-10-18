import {
  connect,
  reduxWrapper,
  configure
} from 'eventjuicer-site-components';

import {useRouter} from 'next/router'  
const settings = require('../settings').default;
import PageAdminReport from '../lib/PageAdminReport'

const CustomPageAdminReport = () => {
  const {query:{sort}} = useRouter();
  return (<PageAdminReport sort={sort} />)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report"]
  })
})

export default connect()(CustomPageAdminReport);