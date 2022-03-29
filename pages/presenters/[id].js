import React from 'react'
import { 
  Wrapper, 
  connect,
  reduxWrapper, 
  configure
} from 'eventjuicer-site-components'

import { WidgetPresenterGfx } from 'eventjuicer-admin-site-components'

const settings = require('../../settings').default;

const StaffPagePresenters = ({id}) =>  <Wrapper first><WidgetPresenterGfx id={id} /></Wrapper>


export async function getStaticPaths() {
    
  return {
    paths: [],
    fallback: true
  }
}


export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {

  return await configure(props, {
    settings : settings,
    preload : ["presenters"]
  })

})


// export default connect()(PageSpeaker);





// export const getStaticPaths = 

// export const getStaticProps = reduxWrapper.getStaticProps(async ({ store }) => {
  
//   return await configure(store, {
//     settings : settings,
//     preload : ['presenters']
//   })
 
// })

export default connect()(StaffPagePresenters);
