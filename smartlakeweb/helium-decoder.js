function Decoder(bytes, port, uplink_info) {
    /*
      The uplink_info variable is an OPTIONAL third parameter that provides the following:
    
      uplink_info = {
        type: "join",
        uuid: <UUIDv4>,
        id: <device id>,
        name: <device name>,
        dev_eui: <dev_eui>,
        app_eui: <app_eui>,
        metadata: {...},
        fcnt: <integer>,
        reported_at: <timestamp>,
        port: <integer>,
        devaddr: <devaddr>,
        hotspots: {...},
        hold_time: <integer>
      }
    */
    
      const hasGPS = bytes[0];
    
      const decoded = { dev_eui: uplink_info.dev_eui, hasGPS: hasGPS, prediction :  bytes[1]};
      
      if(hasGPS == 0){
          decoded['temperature'] =  bytes[2];
          decoded['ph']= bytes[3]/10;
          decoded['tds']= (bytes[4] << 8| bytes[5]);
          decoded['turbidity']= bytes[6]/10;
          decoded['uv']= bytes[7]/10;
          decoded['light']= (bytes[8] << 8| bytes[9]);
      }else{
          decoded['latitude']   = (bytes[5] | (bytes[4]<<8) | (bytes[3]<<16)  | (bytes[2]<<24)) /1000000;
          decoded['longitude']   = (bytes[9] | (bytes[8]<<8) | (bytes[7]<<16)  | (bytes[6]<<24)) /1000000;
      }
      return decoded;
    }
    