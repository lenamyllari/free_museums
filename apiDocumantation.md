**Free museums in Finland: API documentation**

   The Free museums in Finland REST API requires no authentication at the moment.
   REST API responds to GET and POST and lives at the /api/museums/ endpoint. 
   
**Show all museums**
----
  Returns json data about all museums.

* **/api/museums/all**

  /museums/all

* **Method:**

  `GET`
  
*  **Query Params**

  None

* **Body Params**

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
    **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums"}`
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`

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
**Search museums by theme**
----
  Returns json data about museums with a selected theme.

* **/api/museums/themes**

  /museums/themes

* **Method:**

  `GET`
  
*  **Query Params**

  theme (string) - the selected theme

* **Body Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `    {
                          "_id": "5f79ad1c3915fa3dd8d0f71e",
                          "name": "Helsingin kaupunginmuseo",
                          "city": "Helsinki",
                          "address": " Aleksanterinkatu 16, 00170 Helsinki",
                          "link": "https://museot.fi/museohaku/index.php?museo_id=21099",
                          "hours": {
                              "monday": "11:00-19:00",
                              "tuesday": "11:00-19:00",
                              "wednesday": "11:00-19:00",
                              "thursday": "11:00-19:00",
                              "friday": "11:00-19:00",
                              "saturday": "11:00-17:00",
                              "sunday": "11:00-17:00"
                          },
                          "services": [
                              "Esteetön sisäänpääsy",
                              "Esteetön wc",
                              "Istumapaikkoja näyttelytiloissa",
                              "Kosketeltavia esineitä",
                              "Lainattava pyörätuoli",
                              "Tilattavissa opastuksia erityisryhmille",
                              "Kahvila",
                              "Kokoushuone",
                              "Lastenhoitotila",
                              "Leikkitila/tila perheille",
                              "Museokauppa",
                              "Oleskelutila istumapaikoilla",
                              "Tila omien eväiden syönnille"
                          ],
                          "themes": [
                              "Design ja arkkitehtuuri",
                              "Historia",
                              "Kansainvälistä",
                              "Lapsille",
                              "Satoja vuosia sitten"
                          ]
                      },`
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
      **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
  * **Code:** 404 NOT FOUND <br />
      **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums with this theme"}`
  * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`

* **Sample Call:**

  ```javascript
      $.ajax({
        url: "/museums/themes/?theme=",
        dataType: "json",
        type : "GET",
        success : function(r) {
          console.log(r);
        }
      });
  ```
  
  **Search museums by city**
  ----
    Returns json data about museums located in a selected city.
  
  * **/api/museums/city**
  
    /museums/city
  
  * **Method:**
  
    `GET`
    
  *  **Query Params**
  
    city (string) - the selected city
  
  * **Body Params**
  
    None
  
  * **Success Response:**
  
    * **Code:** 200 <br />
      **Content:** '`[ {
                        "_id": "5f79ad1c3915fa3dd8d0f71e",
                        "services": [
                        "Esteetön sisäänpääsy",
                        "Esteetön wc",
                        "Istumapaikkoja näyttelytiloissa",
                        "Kosketeltavia esineitä",
                        "Lainattava pyörätuoli",
                        "Tilattavissa opastuksia erityisryhmille",
                        "Kahvila",
                        "Kokoushuone",
                        "Lastenhoitotila",
                        "Leikkitila/tila perheille",
                        "Museokauppa",
                        "Oleskelutila istumapaikoilla",
                        "Tila omien eväiden syönnille"
                        ],
                        "themes": [
                        "Design ja arkkitehtuuri",
                        "Historia",
                        "Kansainvälistä",
                        "Lapsille",
                        "Satoja vuosia sitten"
                        ],
                        "name": "Helsingin kaupunginmuseo",
                        "link": "https://museot.fi/museohaku/index.php?museo_id=21099",
                        "city": "Helsinki",
                        "address": " Aleksanterinkatu 16, 00170 Helsinki",
                        "hours": {
                        "monday": "11:00-19:00",
                        "tuesday": "11:00-19:00",
                        "wednesday": "11:00-19:00",
                        "thursday": "11:00-19:00",
                        "friday": "11:00-19:00",
                        "saturday": "11:00-17:00",
                        "sunday": "11:00-17:00"
                        }}]`'
   
  * **Error Response:**
  
    * **Code:** 400 BAD REQUEST <br />
        **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
    * **Code:** 404 NOT FOUND <br />
        **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums with this city"}`
    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
  
  * **Sample Call:**
  
    ```javascript
          $.ajax({
            url: "/museums/city/?city=",
            dataType: "json",
            type : "GET",
            success : function(r) {
              console.log(r);
            }
          });
    ```
    **Search museums by name**
      ----
        Returns json data about a museum with a given name.
      
      * **/api/museums/name**
      
        /museums/name
      
      * **Method:**
      
        `GET`
        
      *  **Query Params**
      
        name (string) - the given name
      
      * **Body Params**
      
        None
      
      * **Success Response:**
      
        * **Code:** 200 <br />
          **Content:** `{
                            "_id": "5f79a3173915fa3dd8d0f71a",
                            "name": "Friitalan Nahkamuseo",
                            "city": "Ulvila",
                            "address": " Friitalantie 11 28400 Ulvila",
                            "link": "https://museot.fi/museohaku/index.php?museo_id=22095",
                            "hours": {
                                "monday": "Suljettu",
                                "tuesday": "Suljettu",
                                "wednesday": "Suljettu",
                                "thursday": "Suljettu",
                                "friday": "Suljettu",
                                "saturday": "Suljettu",
                                "sunday": "Suljettu"
                            },
                            "services": [
                                "Kahvila,Kosketeltavia esineitä,Myyntipiste,Pysäköintipaikka"
                            ],
                            "themes": [
                                "Design ja arkkitehtuuri",
                                "Erikoiset",
                                "Historia",
                                "Käsityö"
                            ]
                        }`
       
      * **Error Response:**
      
        * **Code:** 400 BAD REQUEST <br />
            **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
        * **Code:** 404 NOT FOUND <br />
            **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums with this name"}`
        * **Code:** 500 INTERNAL SERVER ERROR <br />
            **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
      
      * **Sample Call:**
      
        ```javascript
              $.ajax({
                url: "/museums/name/?name=",
                dataType: "json",
                type : "GET",
                success : function(r) {
                  console.log(r);
                }
              });
        ```
        
  **Search museums by services**
    ----
      Returns json data about museums with a selected service.
    
    * **/api/museums/services**
    
      /museums/services
    
    * **Method:**
    
      `GET`
      
    *  **Query Params**
    
      service (string) - the selected service
    
    * **Body Params**
    
      None
    
    * **Success Response:**
    
      * **Code:** 200 <br />
        **Content:** `[
                          {
                              "_id": "5f79a35f3915fa3dd8d0f71b",
                              "name": "Forssan Luontomuseo",
                              "city": "Forssa",
                              "address": " Wahreninkatu 4, A-rappu, Kehräämö (Kirjastotalo)",
                              "link": "https://museot.fi/museohaku/index.php?museo_id=21049",
                              "hours": {
                                  "monday": "Suljettu",
                                  "tuesday": "Suljettu",
                                  "wednesday": "12:00-16:00",
                                  "thursday": "Suljettu",
                                  "friday": "12:00-16:00",
                                  "saturday": "Auki",
                                  "sunday": "12:00-16:00"
                              },
                              "services": [
                                  "Esteetön sisäänpääsy",
                                  "Esteetön wc",
                                  "Invapysäköinti",
                                  "Istumapaikkoja näyttelytiloissa",
                                  "Kosketeltavia esineitä",
                                  "Kokoushuone",
                                  "Lastenhoitotila",
                                  "Leikkitila/tila perheille",
                                  "Museokauppa",
                                  "Myyntipiste",
                                  "Pysäköintipaikka",
                                  "Tila omien eväiden syönnille"
                              ],
                              "themes": []
                          }
                          ]`
     
    * **Error Response:**
    
      * **Code:** 400 BAD REQUEST <br />
          **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
      * **Code:** 404 NOT FOUND <br />
          **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums with this service"}`
      * **Code:** 500 INTERNAL SERVER ERROR <br />
          **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
    
    * **Sample Call:**
    
      ```javascript
            $.ajax({
              url: "/museums/services/?service=",
              dataType: "json",
              type : "GET",
              success : function(r) {
                console.log(r);
              }
            });
      ```
  **Search museums by when they are open**
    ----
      Returns json data about museums open on a selected weekday.
    
    * **/api/museums/hours**
    
      /museums/hours
    
    * **Method:**
    
      `GET`
      
    *  **Query Params**
    
      weekday (string) - the selected weekday
    
    * **Body Params**
    
      None
    
    * **Success Response:**
    
      * **Code:** 200 <br />
        **Content:** `[
                          {
                              "_id": "5f79acff3915fa3dd8d0f71c",
                              "services": [],
                              "themes": [
                                  "Nykytaide",
                                  "Taide"
                              ],
                              "name": "Galleri Elverket",
                              "link": "https://museot.fi/museohaku/index.php?museo_id=12022018",
                              "city": "Raasepori",
                              "address": " Gustav Wasas gata/Kustaa Vaasan katu 11,",
                              "hours": {
                                  "monday": "Suljettu",
                                  "tuesday": "11:00-17:00",
                                  "wednesday": "11:00-17:00",
                                  "thursday": "11:00-17:00",
                                  "friday": "11:00-17:00",
                                  "saturday": "11:00-17:00",
                                  "sunday": "11:00-17:00"
                              }
                          }]`
     
    * **Error Response:**
    
      * **Code:** 400 BAD REQUEST <br />
          **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
      * **Code:** 404 NOT FOUND <br />
          **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums open on this weekday"}`
      * **Code:** 500 INTERNAL SERVER ERROR <br />
          **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
    
    * **Sample Call:**
    
      ```javascript
            $.ajax({
              url: "/museums/hours/?weekday=",
              dataType: "json",
              type : "GET",
              success : function(r) {
                console.log(r);
              }
            });
      ```
  **Add a museum**
    ----
      Adds a museum to the database.
    
    * **/api/museums/add**
    
      /museums/add
    
    * **Method:**
    
      `POST`
      
    *  **Query Params**
    
      None
    
    * **Body Params**
    
      Museum - the museum to be added
      name:  the name of the museum (string)
      link: the link to the museum's website (string)
      city: the city where the museum is located (sting)
      address: the address of the museum (string)
      hours: {
        monday: the museum's opening hours on Mondays (string),
        tuesday: the museum's opening hours on Tuesdays (string),
        wednesday: the museum's opening hours on Wednesdays (string),
        thursday: the museum's opening hours on Thurdays (string),
        friday: the museum's opening hours on Fridays (string),
        saturday: the museum's opening hours on Saturdays (string),
        sunday: the museum's opening hours on Sundays (string)
      },
      services: the services provided by the museum [string],
      themes: the themes of the museum [string]
    
    * **Success Response:**
    
      * **Code:** 201 <br />
        **Content:** `{"message": "Museum successfully added"}`
     
    * **Error Response:**
  
      * **Code:** 400 BAD REQUEST <br />
        **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
      * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
    
    * **Sample Call:**
    
      ```javascript
            $.ajax({
              url: "/museums/add",
              dataType: "json",
              type : "POST",
              success : function(r) {
                console.log(r);
              }
            });
      ```
  **Update a museum**
  ----
    Updates a selected museum.
  
  * **/api/museums/update**
  
    /museums/update
  
  * **Method:**
  
    `PUT`
    
  *  **Query Params**
  
    None
  
  * **Body Params**
  
    Museum - the museum to be updated
          name:  the name of the museum (string)
          link: the link to the museum's website (string)
          city: the city where the museum is located (sting)
          address: the address of the museum (string)
          hours: {
            monday: the museum's opening hours on Mondays (string),
            tuesday: the museum's opening hours on Tuesdays (string),
            wednesday: the museum's opening hours on Wednesdays (string),
            thursday: the museum's opening hours on Thurdays (string),
            friday: the museum's opening hours on Fridays (string),
            saturday: the museum's opening hours on Saturdays (string),
            sunday: the museum's opening hours on Sundays (string)
          },
          services: the services provided by the museum [string],
          themes: the themes of the museum [string]
  
  * **Success Response:**
  
    * **Code:** 200 <br />
      **Content:** `{"message": "Museum successfully updated"}`
   
  * **Error Response:**
  
  * **Code:** 400 BAD REQUEST <br />
      **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
  * **Code:** 404 NOT FOUND <br />
      **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums with this name"}`
  * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
  
  * **Sample Call:**
  
    ```javascript
        $.ajax({
          url: "/museums/update/",
          dataType: "json",
          type : "PUT",
          success : function(r) {
            console.log(r);
          }
        });
    ```
   **Delete a museum**
    ----
      Deletes a selected museum from the database.
    
    * **/api/museums/delete**
    
      /museums/delete
    
    * **Method:**
    
      `DELETE`
      
    *  **Query Params**
    
      name (string) - the name of the museum to be deleted
    
    * **Body Params**
    
      None
    
    * **Success Response:**
    
      * **Code:** 200 <br />
        **Content:** `{"message": "Museum successfully deleted"}`
     
    * **Error Response:**
    
    * **Code:** 400 BAD REQUEST <br />
        **Content:** `{code: "400", error: "Bad Request", message: "Request parameter invalid or missing"}`
    * **Code:** 404 NOT FOUND <br />
        **Content:** `{code: "404", error: "Not Found", message: "Could not find any museums with this name"}`
    * **Code:** 500 INTERNAL SERVER ERROR <br />
        **Content:** `{code: "500", error: "Internal Server Error", message: "Something went wrong"}`
    * **Sample Call:**
    
      ```javascript
            $.ajax({
              url: "/museums/delete",
              dataType: "json",
              type : "DELETE",
              success : function(r) {
                console.log(r);
              }
            });
      ```   