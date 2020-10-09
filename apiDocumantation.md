**Free museums in Finland: API documentation**

   The Free museums in Finland REST API requires no authentication at the moment.
   REST API responds to GET and POST and lives at the /api/museums/ endpoint. 
   
**Show all museums**
----
  Returns json data about all museums.

* **/api/museums/**

  /museums/

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[  {
    _id: 5f7af55dc913478d68fb0d4a,
    services: [],
    themes: [], {
    _id: 5f7af37cc913478d68fb0d2f,
    services: [
      'Esteetön sisäänpääsy',
      'Esteetön wc',
      'Oleskelutila istumapaikoilla',
      'Pysäköintipaikka'
    ],
    themes: [ 'Erikoiset', 'Historia', 'Tiede ja tekniikka' ],
    name: 'Lapuan Patruunatehtaan museo',
    link: 'https://museot.fi/museohaku/index.php?museo_id=22192',
    city: 'Lapua',
    address: ' Kulttuurikeskus Vanha Paukku, Vanhan Paukun tie 1, 62100 Lapua',
    hours: {
      monday: '11:00-19:00',
      tuesday: '11:00-19:00',
      wednesday: '11:00-19:00',
      thursday: '11:00-19:00',
      friday: '11:00-19:00',
      saturday: '11:00-15:00',
      sunday: 'Suljettu'
    }
  }
    name: 'Sairaalamuseo',
    link: 'https://museot.fi/museohaku/index.php?museo_id=21820',
    city: 'Raasepori',
    address: ' Västra Nylandssukhus/Länsi-Uudenmaan sairaalamuseo, Östra Strandgatan 9/ Itäinen Rantakatu 9'
  },]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No data to show" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/museums/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
