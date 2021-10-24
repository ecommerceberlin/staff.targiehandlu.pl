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
  get,
  ToolBar
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




const ExternalServices = ({checked, onChange}) => {
  const tickets = useDatasource({resource: "tickets", filters: {
    filter: ticket => ticket.role === "service_external"
  }})
  return tickets.map(ticket => <ServiceSelector key={ticket.id} id={ticket.id} checked={checked.includes(ticket.id)} name={clear(get(ticket, "names.pl"))} onChange={onChange} />)
}

const CustomPageAdminReport = () => {

  const [checked, setChecked] = useState([])
  const setCheckedCallback = useCallback((id) => setChecked(oldChecked => oldChecked.includes(id) ? [...oldChecked.filter(item => item!=id)] : [...oldChecked, id]))
  const data = useDatasource({resource: "report"})

  const findBoothsId = (source) => {
    let booths = [];
    source.forEach(exhibitor => {
        exhibitor.purchases.filter(ticket => ticket.formdata && "id" in ticket.formdata)
        .map(ticket => ticket.formdata.id)
        .forEach(formdata => booths.push(formdata))    
    })
    return booths
  }
  const findCheckedBooths = () => {
    const exhibitorWithExternalServices = data.filter(exhibitor => exhibitor.purchases.some(ticket => checked.includes(ticket.id)))
    return findBoothsId(exhibitorWithExternalServices);
  }

  if(isEmpty(data)){
    return (<Wrapper first></Wrapper>)
  }

  return (<Wrapper first>
  <ExternalServices checked={checked} onChange={setCheckedCallback} />

    <ToolBar 
    data={data} 
    indexes={[
      ["profile", "lname"],
      ["profile", "cname"],
      ["profile", "booth"],
      ["company", "name"]
    ]}
    render={(filtered) => <Bookingmap setting="bookingmap" marked={checked.length? findCheckedBooths(): filtered.length < data.length/3? findBoothsId(filtered): [] } /> } />
   

 </Wrapper>)
} 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  return await configure(props, {
    settings : settings,
    preload : ["report", "bookingmap", "tickets"]
  })
})

export default connect()(CustomPageAdminReport);