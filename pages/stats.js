import {
  connect,
  reduxWrapper,
  configure,
  Wrapper
} from 'eventjuicer-site-components';


const settings = require('../settings').default;
import AdminReportStats from '../lib/AdminReportStats'

const CustomPageAdminReport = () => {
  return (<Wrapper label="Stats"><AdminReportStats /></Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report"]
  })
})

export default connect()(CustomPageAdminReport);