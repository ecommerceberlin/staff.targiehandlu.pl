import {
  connect,
  reduxWrapper,
  configure,
  Wrapper
} from 'eventjuicer-site-components';

import {
  ExhibitorsList
} from 'eventjuicer-admin-site-components'

import {useRouter} from 'next/router'  
const settings = require('../settings').default;

const PageList = () => {
  const {query:{sort,details}} = useRouter();
  return (<Wrapper><ExhibitorsList sort={sort} details={Boolean(parseInt(details))} /></Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report","bookingmap"]
  })
})

export default connect()(PageList);