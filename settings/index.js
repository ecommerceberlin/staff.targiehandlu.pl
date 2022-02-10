
const settings =  {
      
    system : {
        ogTemplate: "",
        passwords : {
            'admin': '1751bfe48d5ad21fd9d'
        },
        lang_api_endpoint : 'https://api.eventjuicer.com/proxy?url=https%3A%2F%2Flocalise.biz%2Fapi%2Fexport%2Fall.json%3Fformat%3Dmulti%26pretty%26key%3DSHiwxgKaPMx_KThQH2zcdzwiKEMzuNBm',    
        api : "https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl",
        proxy: "https://api.eventjuicer.workers.dev?url=",
        // api : "http://eventjuicer-api.test/v1/public/hosts/targiehandlu.pl",
        post_api : "https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/register",
        service_api : "https://api.eventjuicer.com/v1/services",
        og_image : "https://res.cloudinary.com/ecommerceberlin/image/upload/c_limit,w_1024/v1546943854/ebe_og_home.jpg",
    
    },

    bookingmap : {
        wrapperProps: {
            label: "exhibitors.map.title",
            secondaryLabel: "exhibitors.map.opensales"
        },
        height : 400,
        allowedGroupIds : [310, 311, 312, 313, 314],
        disabledTicketIds : [],
        boothStyleMapping: {
            309: "light",
            310: "standard",
            311: "hot",
            312: "superHot",
            313: "ultra",
            314: "grand",
            315: "stage",
            316: "networking",
            321: "boothSold", //last minute / buffer
            338: "boothSold", //test
            339: "stage"
        },
        api : "https://stoiska.targiehandlu.pl/preorder",

    },

    ui : {

        menuItems : [

            {
                name: 'report',
                items: [
                  {name: 'brandname.list', to: '/'},
                  {name: 'map', to: '/map'},
                  {name: 'stats', to: '/stats'},
                ]
            },
           
  
        ]
    },

   
    common : {

        organizer_name : '',
        organizer_address : '',
        organizer_regno : '',
        event_name : 'targiehandlu.pl',
        event_location : '',
        event_date : '',
        event_hours : '',
    },

    sales_support : {
        title: 'event.support.hello',
        description: 'event.support.description',
        people : []
    },

   
    footer : {
        iconStyle : "black",
        primaryStyle: null,
        secondaryStyle: null,
      //  iconStyle: "heroIcon",
        links : []
    },

    appbar : {
        profile: ["logout"],
        links: [
            // {label: "common.menu.visitors.vote", color: "secondary",  href: "/vote", as: "/vote", variant: "contained"}
        ],
    },
    
};
  

export default settings