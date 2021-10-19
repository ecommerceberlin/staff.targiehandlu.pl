import React, {useState, useCallback, useEffect} from 'react'

import {
  connect,
  reduxWrapper,
  configure,
  Bookingmap,
  Wrapper,
  useDatasource,
  isEmpty,
  FormControlLabel,
  Checkbox,
  keyBy,
  get
} from 'eventjuicer-site-components';

import {clear, findName} from '../lib/helpers'

const settings = require('../settings').default;


const ServiceSelector = ({id, checked, name, onChange, color="primary"}) => (
<FormControlLabel
  control={
    <Checkbox
    id={id}
    checked={checked}
    onChange={() => onChange(id)}
    name={name}
    color={color}
    />
  }
  label={name}
/>)


const allServices = {
  electricity: 1769,
  highvoltage: 1906,
  chair: 1781,
  table: 1788,
  carpet: 1779,
  counter: 1770,
  booth_osb: 1772,
  booth_fullprint: 1771,
  display: 1775
}

const useTickets = () => {

  const tickets = useDatasource({resource: "tickets", filters: {
    filter: ticket => ticket.role === "service_external"
  }})

  return [tickets, keyBy((tickets || []), "id")]

}

const CustomPageAdminReport = () => {

  const [checked, setChecked] = useState([])
  const setCheckedCallback = useCallback((id) => setChecked(oldChecked => oldChecked.includes(id) ? [...oldChecked.filter(item => item!=id)] : [...oldChecked, id]))
  const data = useDatasource({resource: "report"})
  const [tickets, keyedTickets] = useTickets()

  const findBooths = () => {
    const exhibitorWithExternalServices = data.filter(exhibitor => exhibitor.purchases.some(ticket => checked.includes(ticket.id)))
    let booths = [];
    exhibitorWithExternalServices.forEach(exhibitor => {
        exhibitor.purchases.filter(ticket => ticket.formdata && "id" in ticket.formdata)
        .map(ticket => ticket.formdata.id)
        .forEach(formdata => booths.push(formdata))    
    })
    return booths;
  }

  const renderServices = () => tickets.map(ticket => <ServiceSelector key={ticket.id} id={ticket.id} checked={checked.includes(ticket.id)} name={clear(get(ticket, "names.pl"))} onChange={setCheckedCallback} />)
    
  console.log(tickets)

  if(isEmpty(data)){
    return (<Wrapper first></Wrapper>)
  }

  return (<Wrapper first>
  {renderServices()}
  <Bookingmap setting="bookingmap" marked={findBooths()} /></Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report", "bookingmap", "tickets"]
  })
})

export default connect()(CustomPageAdminReport);