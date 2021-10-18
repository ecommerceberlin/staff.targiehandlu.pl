import {
  Wrapper,
  MyTypography as Text,
  Box,
  Exhibitor,
  useDatasource,
  Alert,
  MyLink,
  ToolBar
} from 'eventjuicer-site-components';


const reducer = (acc, currentValue) => acc + currentValue.quantity;

const howManyBooths = (purchases) => purchases? purchases.filter(item => item.role=="exhibitor").length: 0
const howManyCatering = (purchases) => purchases? purchases.filter(item => item.id == 1776).reduce(reducer, 0): 0
const howManyParking = (purchases) => purchases? purchases.filter(item => item.id == 1780).reduce(reducer, 0): 0

const cateringReal = (purchases, reps) => {
  const booths = howManyBooths(purchases)
  const catering = howManyCatering(purchases)

  if(!reps){
    return 1 + catering
  }

  if(reps > booths * 4){
    return (booths * 4) + catering
  }else{
    return reps + catering
  }
}
const parkingReal = (purchases) => howManyBooths(purchases) * 1 + howManyParking(purchases)

const ExhibitorAlert = ({reps, purchases}) => {
  return <Alert type="info" content={<>Catering: <strong>{cateringReal(purchases, reps)}</strong> {` `}
  Parking: <strong>{parkingReal(purchases)}</strong></>} />
}

const PageAdminReport = ({sort}) => {


  const data = useDatasource({resource: "report", filters: {
    sort: sort && sort==="booth"?  "profile.booth": "company.name"
  }})
  
  
  const countTotals = () => {
    let catering = 0;
    let parking = 0;

    data.map(exhibitor => {
      catering = catering + cateringReal(exhibitor.purchases, exhibitor.reps);
      parking = parking + parkingReal(exhibitor.purchases)
    })

    return {catering, parking}
  }

  const totals = countTotals();

  //parse params!
  
//   const { query } = props;
//   const { range, sort, service } = query;

//   const sorting = sort === 'booth' ? 'profile.booth' : 'company.name';

//   let _filter =
//     range && range.length > 0
//       ? function(item) {
//           return (
//             'booth' in item.profile &&
//             item.profile.booth &&
//             range.split(',').includes(item.profile.booth.trim().charAt(0))
//           );
//         }
//       : function() {
//           return true;
//         };

//   const filterByService = function(item) {
//     return (
//       'purchases' in item &&
//       Array.isArray(item.purchases) &&
//       item.purchases.filter(p => p.role === 'service_' + service).length
//     );
//   };

 

 return (<Wrapper>

   {/* <ToolBar /> */}

   <Alert content={<div>Total catering: {totals.catering}{` `}Total parking: {totals.parking}{` `}</div>} />
   
   {data.map(exhibitor => <Exhibitor 
    key={exhibitor.id} 
    {...exhibitor} 
    roles={["presenter","service_internal","service_external"]}
    alert={<ExhibitorAlert key={exhibitor.id}  {...exhibitor} />}
    />)}

 </Wrapper>)

}


export default PageAdminReport;