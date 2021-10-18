import {
  connect,
  reduxWrapper,
  configure,
  Bookingmap,
  Wrapper,
  useDatasource,
  isEmpty
} from 'eventjuicer-site-components';


const settings = require('../settings').default;

const CustomPageAdminReport = () => {

  const data = useDatasource({resource: "report"})

  const exhibitorWithExternalServices = (data) => data.filter(exhibitor => exhibitor.purchases.some(ticket => ticket.role.includes("service_external")))

  let booths = [];
  exhibitorWithExternalServices(data).forEach(exhibitor => {
      exhibitor.purchases.filter(ticket => ticket.formdata && "id" in ticket.formdata)
      .map(ticket => ticket.formdata.id)
      .forEach(formdata => booths.push(formdata))    
  })


  if(isEmpty(data)){
    return (<Wrapper first></Wrapper>)
  }

  return (<Wrapper first><Bookingmap setting="bookingmap" marked={booths} /></Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report", "bookingmap"]
  })
})

export default connect()(CustomPageAdminReport);