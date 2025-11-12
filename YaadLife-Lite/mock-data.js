// mock-data.js  (paste into YaadLife-Lite/mock-data.js)
const MOCK = {
  // ---- ACCOMMODATIONS (priority: local → Airbnb → Booking) ----
  accommodations: {
    kingston: [
      {name:"Rasta Road Villa",   source:"Local",   price:150, local:true,  type:"coastal"},
      {name:"Harbor View Apt",    source:"Airbnb",  price:80,  local:false, type:"coastal"},
      {name:"Kingston Roots GH",  source:"Local",   price:100, local:true,  type:"inland"}
    ],
    "st-andrew": [
      {name:"Blue Mountain Cabin",source:"Local",   price:200, local:true, type:"inland"}
    ],
    // add the other 12 parishes the same way …
  },

  // ---- TRANSPORT (Lynk first) ----
  transport: {
    kingston: [
      {name:"Lynk Airport → City", source:"Lynk", price:25, priority:true},
      {name:"JUTC Bus",            source:"Public",price:2,  priority:false}
    ]
  },

  // ---- ATTRACTIONS / TOURS ----
  tours: {
    kingston: [
      {name:"Bob Marley Museum", price:30},
      {name:"Devon House Tour",  price:20}
    ]
  }
};
