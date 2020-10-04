import Form from "@rjsf/core";
import React, { useState }  from 'react'


import 'bootstrap/dist/css/bootstrap.min.css'
const schema = {
    title: "New museum",
    type: "object",
    properties: {
        name: {type: "string", title: "Name"},
        link: {type: "string", title: "Link"},
        city: {type: "string", title: "City"},
        address: {type: "string", title: "Address"},
        hours: {
            type: "object", title: "Opening hours",
            properties: {
                monday: {
                    type: "string", title: "Maantantai"
                },
                tuesday: {
                    type: "string", title: "Tiistai"
                },
                wednesday: {
                    type: "string", title: "Keskiviikko"
                },
                thursday: {
                    type: "string", title: "Torstai"
                },
                friday: {
                    type: "string", title: "Perjantai"
                },
                saturday: {
                    type: "string", title: "Lauantai"
                },
                sunday: {
                    type: "string", title: "Sunnuntai"
                },
            }
        },
        services: {
            type: "array", title: "Services",
            items: {
                type: "string"
            }
        },
        themes: {
            type: "array", title: "Themes",
            items: {
                type: "string"
            }

        },



    },
    "required": ["name", "link", "city", "address"]
}



//const log = (type) => console.log.bind(console, type);

const MuseumForm = () => {

    const onSubmit = ({formData}, e) => {
        console.log("Data submitted: ",  formData)
        var request = require('request');
    console.log(formData)
        var data = {
            url: "http://localhost:3001/api/addMuseum",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: formData
        }
//Custom Header pass
        var headersOpt = {
            "content-type": "application/json",
        };
        request.post(data, function(error, httpResponse, body){
            console.log(body);
        });

    };
    const log = (type) => console.log.bind(console, type);
    return (
        <Form schema={schema}
              onChange={log("changed")}
              onSubmit={onSubmit}

        >

        </Form>
    )
}
export default MuseumForm

