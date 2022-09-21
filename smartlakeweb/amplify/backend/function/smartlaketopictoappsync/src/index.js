/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_SMARTLAKEWEB_GRAPHQLAPIIDOUTPUT
	API_SMARTLAKEWEB_GRAPHQLAPIENDPOINTOUTPUT
	API_SMARTLAKEWEB_GRAPHQLAPIKEYOUTPUT
	AWS_NODEJS_CONNECTION_REUSE_ENABLED
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 const https = require('https');
 const AWS = require('aws-sdk');
 const urlParse = require("url").URL;
 
 //environment variables
 const region = process.env.REGION
 const appsyncUrl = process.env.API_SMARTLAKEWEB_GRAPHQLAPIENDPOINTOUTPUT;
 const endpoint = new urlParse(appsyncUrl).hostname.toString();
 
 

 
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const req = new AWS.HttpRequest(appsyncUrl, region);

    //define the graphql mutation to create the sensor values
    const mutationNameCreateSmartLakeDeviceLog = 'CreateSmartLakeDeviceLog';
    const mutationCreateSmartLakeDeviceLog = require('./mutations').createSmartLakeDeviceLog;

    const mutationNameListSmartLakeDevices = 'ListSmartLakeDevices';
    const mutationListSmartLakeDevices = require('./mutations').listSmartLakeDevices;
    
    const mutationNameUpdateSmartLakeDevice = 'UpdateSmartLakeDevice';
    const mutationUpdateSmartLakeDevice = require('./mutations').updateSmartLakeDevice;



    try {

        const devices = await processGrahpQL(req,{
            query: mutationListSmartLakeDevices,
            operationName: mutationNameListSmartLakeDevices,
            variables: {
                filter: {  dev_eui:{eq:event.dev_eui}}
            }
        });
    
        console.log(JSON.stringify(devices));
        console.log(JSON.stringify(devices.data.listSmartLakeDevices.items));
    
        if(devices.data.listSmartLakeDevices.items.length>0){
            let device = devices.data.listSmartLakeDevices.items[0];
            console.log(`Device id ${device.id}`)
    
            
    
            let clas = 1;
            let msg = "";
      
            // if (event.moisture < threshold.moisture.min || event.moisture > threshold.moisture.max){
            //     clas = 2; //dry
            //     msg = "Peatland is drying. Please monitor closely to make sure everything is alright and it's not just a false alarm."
            // }
    
            // if (event.gas > threshold.carbon.max){
            //     clas = 3; //smoke 
            //     msg = "Peatland may be on fire. Please take action as soon as possible to make sure it's not a false alarm."
            // }
    
            let updateInput;

            if(event.decoded.payload.hasGPS === 0){
                updateInput = {
                    id: device.id,
                    temperature: event.decoded.payload.temperature,
                    ph: event.decoded.payload.ph,
                    tds:event.decoded.payload.tds,
                    turbidity: event.decoded.payload.turbidity,
                    light: event.decoded.payload.light,
                    uv: event.decoded.payload.uv,
                    seq: 0,
                    clas: event.decoded.payload.prediction,
                    bat:4.2,
                    ts: Math.floor(new Date().getTime()/1000) 
                }
            }else{
                    updateInput = {
                        id: device.id,
                        lat: event.decoded.payload.latitude,
                        lng: event.decoded.payload.longitude,
                        ts: Math.floor(new Date().getTime()/1000) 
                    }
            }
            console.log('updating device with ', JSON.stringify(updateInput, null, 2));
            
            await processGrahpQL(req,{
                query: mutationUpdateSmartLakeDevice,
                operationName: mutationNameUpdateSmartLakeDevice,
                variables: {
                    input: updateInput
                }
            });
            console.log('update done. Create sensor log');
            //create the mutuation input from the sensor event data
            
    
            if(event.decoded.payload.hasGPS === 0){

                let createInput = {
                    ttl : Math.floor(new Date().getTime()/1000 + 3600*24),
                    ts: Math.floor(new Date().getTime()/1000) ,
                    dev_eui: event.decoded.payload.dev_eui,
                    temperature: event.decoded.payload.temperature,
                    ph: event.decoded.payload.ph,
                    tds:event.decoded.payload.tds,
                    turbidity: event.decoded.payload.turbidity,
                    light: event.decoded.payload.light,
                    uv: event.decoded.payload.uv,
                    clas: event.decoded.payload.prediction,
                    bat:4.2,
                    seq: 0
                }
                
                console.log('creating sensor data with ', JSON.stringify(createInput,null,2));

                const data = await processGrahpQL(req,{
                    query: mutationCreateSmartLakeDeviceLog,
                    operationName: mutationNameCreateSmartLakeDeviceLog,
                    variables: {
                        input: createInput
                    }
                })
                console.log("Successful insertion of sensor data ");
            }else{
                console.log("no sensor data update required");
            }
            
    
            // if(device.clas === 1 &&  clas > 1 && device.emails){
                
            //     console.log("Sending emails");
                
    
            //     await sendEmail({
            //         dev_eui: device.dev_eui,
            //         emails: device.emails,
            //         temperature: event.temperature,
            //         moisture: event.moisture,
            //         gas:event.gas,
            //         bat:event.bat,
            //         msg: msg
            //     });
            // }else{
            //     console.log("Not Sending emails", device.clas, clas, device.emails);
            // }
            
            
    
    
        }
    
       
    
        return {
            statusCode: 200,
            body: {}
        };
    
      }
      catch (err) {
        console.log("error: " + err);
        throw new Error("Error creating sensor value " );
      }
};

var processGrahpQL = async (req,body)=>{

    req.method = "POST";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.headers["x-api-key"] = process.env.API_SMARTLAKEWEB_GRAPHQLAPIKEYOUTPUT;
    req.body = JSON.stringify(body);

    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const data = await new Promise((resolve, reject) => {


      const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
          result.on('data', (data) => {
              resolve(JSON.parse(data.toString()));
          });
      });

      httpRequest.write(req.body);
      httpRequest.end();

    });

    return data;

}