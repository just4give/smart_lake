/**
https://files.seeedstudio.com/products/317990687/res/LoRa-E5%20AT%20Command%20Specification_V1.0%20.pdf

*/

#include "TFT_eSPI.h" //TFT LCD library 
#include <Wire.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include "Si115X.h"
#include "gps.h"
#include "SoftwareSerial2.h"
#include <Seeed_FS.h>
#include "SD/Seeed_SD.h"
#include <smart_lake_algae_prediction_inferencing.h>

#define PIN_PH 0                //pH Sensor 
#define PIN_TDS 2               //TDS sensor
#define PIN_TURBIDITY 4         //Turbidity Sensor
#define ONE_WIRE_BUS 6          // OneWire temperature
#define LORA_TRANSMIT_INTERVAL_IN_SECOND 120
SoftwareSerial1 softSerial2(40, 41);

char payload[500];
char filename[50] = "readings.csv";
int  row_count=0;

// variables for LORA
char str[100] = {0};
char str_devEui[50] = {0};
char str_appEvi[50] = {0};
static char recv_buf[512];
static bool is_exist = false;
static bool is_join = false;
static bool Lora_is_busy = false;
static int switch_UI = 0;
static int init_ui = 0;
static bool is_gps_sent = false;



#define SysV 3.3            
#define Offset  41.6875 //41.02740741      //deviation compensate  
#define kValue  -18.75     //-19.18518519
#define samplingInterval 20
#define printInterval 1000
#define ArrayLenth  40    //times of collection

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);
 
// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);
Si115X si1151;

int pHArray[ArrayLenth];   //Store the average value of the sensor feedback
int pHArrayIndex = 0;


TFT_eSPI tft; //Initializing TFT LCD'
TFT_eSprite spr = TFT_eSprite(&tft); //Initializing buffer


uint8_t state = 0;

static float pHValue, voltage;
static float tdsValue, tdsVoltage, turbidityVoltage, wTemperature , uvLight;
static uint16_t vLight;
static uint8_t counter = 0;
static long lastGpsRead = 0;


enum e_module_Response_Result{
  MODULE_IDLE,
  MODULE_RECEIVING,
  MODULE_TIMEOUT,
  MODULE_ACK_SUCCESS,
};

enum e_module_AT_Cmd{
  AT_OK,
  AT_ID,
  AT_MODE,
  AT_DR,
  AT_REPT,
  AT_RETRY,
  AT_CH,
  AT_KEY,
  AT_CLASS,
  //AT_ADR,
  AT_PORT,
  //AT_LW,  
  AT_JOIN,
  AT_CMSGHEX,
  AT_TIMOUT
};

int module_AT_Cmd = 0;
typedef struct s_E5_Module_Cmd{
  char p_ack[15];
  int timeout_ms;
  char p_cmd[70];
} E5_Module_Cmd_t;

E5_Module_Cmd_t E5_Module_Cmd[] ={
  {"+AT: OK", 1000, "AT\r\n"},
  {"+ID: AppEui", 1000, "AT+ID\r\n"},
  {"+MODE", 1000, "AT+MODE=LWOTAA\r\n"},
  {"+DR", 1000, "AT+DR=US915\r\n"},
  {"+REPT", 1000, "AT+REPT=1\r\n"},  
  {"+RETRY", 1000, "AT+RETRY=1\r\n"},  
  {"CH", 1000, "AT+CH=NUM,8-15\r\n"},
  {"+KEY: APPKEY", 1000, "AT+KEY=APPKEY,\"2B7E151628AED2A6ABF7158809CF4F3C\"\r\n"},
  {"+CLASS", 1000, "AT+CLASS=A\r\n"},
  //{"+ADR", 1000, "AT+ADR=OFF\r\n"},  
  {"+PORT", 1000, "AT+PORT=2\r\n"},
  //{"+LW", 1000, "AT+LW=LEN\r\n"},
  {"Done", 10000, "AT+JOIN\r\n"},
  {"Done", 30000, ""},
};

static int at_send_check_response(char *p_ack, int timeout_ms, char *p_cmd, ...){
  int ch;
  int num = 0;
  int index = 0;
  int startMillis = 0;
  va_list args;
  memset(recv_buf, 0, sizeof(recv_buf));
  va_start(args, p_cmd);
  softSerial2.printf(p_cmd, args);
  Serial.printf(p_cmd, args);
  va_end(args);

  startMillis = millis();

  if (p_ack == NULL){
    return 0;
  }
  do{
    while (softSerial2.available() > 0)
    {
      ch = softSerial2.read();
      recv_buf[index++] = ch;
      Serial.print((char)ch);
      delay(2);
    }

    if (strstr(recv_buf, p_ack) != NULL){
      return 1;
    }

  } while (millis() - startMillis < timeout_ms);
  return 0;
}


static int at_send_check_response_flag(int timeout_ms, char *p_cmd, ...){
  if (Lora_is_busy == true){
    return 0;
  }
  Lora_is_busy = true;
//  Lora_Ack_timeout = timeout_ms;
  va_list args;
  memset(recv_buf, 0, sizeof(recv_buf));
  va_start(args, p_cmd);
  softSerial2.printf(p_cmd, args);
  Serial.printf(p_cmd, args);
  va_end(args);
  return 1;
}

static int check_message_response(){
  static bool init_flag = false;
  static int startMillis = 0;
  static int index = 0;
  e_module_Response_Result result = MODULE_ACK_SUCCESS;
  int ch;
  int num = 0;
  if (Lora_is_busy == true){
    if (init_flag == false){
      startMillis = millis();
      init_flag = true;
      index = 0;
      memset(recv_buf, 0, sizeof(recv_buf));
      Serial.println("Cmd Start......");
    }
    Lora_is_busy = false;
    init_flag = false;
    while (softSerial2.available() > 0){
      ch = softSerial2.read();
      recv_buf[index++] = ch;
      Serial.print((char)ch);
      delay(2);
    }

    if (strstr(recv_buf, E5_Module_Cmd[module_AT_Cmd].p_ack) != NULL){
      //          is_join = true;
      return result;
    }

    if (millis() - startMillis >= E5_Module_Cmd[module_AT_Cmd].timeout_ms){
      Serial.println("Cmd Timeout......");
      return MODULE_TIMEOUT;
    }
    Lora_is_busy = true;
    init_flag = true;
    return MODULE_RECEIVING;
  }
  return MODULE_IDLE;
}

void print_EVI(){
  Serial.println("+++++++++++ Devicee Info ++++++++++");
  Serial.printf("Device EUI %s \n",str_devEui);
  Serial.printf("App EUI %s \n",str_appEvi);
  Serial.printf("App Key 2B7E151628AED2A6ABF7158809CF4F3C \n");
  Serial.println("+++++++++++++++++++++++++++++++++++");
}

void readFile(fs::FS& fs, const char* path) {
  Serial.print("Reading file: ");
  Serial.println(path);
  File file = fs.open(path);

  if (!file) {
    Serial.println("Failed to open file for reading");
    return;
  }

  Serial.print("Read from file: ");
  while (file.available()) {
    Serial.write(file.read());
  }
  file.close();
}

void writeFile(fs::FS& fs, const char* path, String data) {
  Serial.print("Writing file: ");
  Serial.println(path);
  File file = fs.open(path, FILE_WRITE);  //FILE_WRITE //FILE_APPEND
  if (!file) {
    Serial.println("Failed to open file for writing");
    return;
  }

  // write in chunks of 512 bytes
  for ( int i = 0; i < data.length(); i = i + 512) {
    if (!file.print(data.substring(i, i + 512))) {
      Serial.println("Write failed");
    }
  }


  file.close();
}

void deleteFile(fs::FS& fs, const char* path) {
  Serial.print("Deleting file: ");
  Serial.println(path);
  if (fs.remove(path)) {
    Serial.println("File deleted");
  } else {
    Serial.println("Delete failed");
  }
}

void buzz(){
  analogWrite(WIO_BUZZER, 128);
  delay(500);
  analogWrite(WIO_BUZZER, 0);
  
}

void appendDataToFile(String label){
  sprintf(filename, "%s.%d.csv",label.c_str(), row_count++);
  char data[100];
  sprintf(data,"pH,tds,turbidity,temperature,light\r\n%0.2f,%0.1f,%0.2f,%0.1f,%d\r\n",pHValue, tdsValue,turbidityVoltage,wTemperature,vLight);
  Serial.println(data);
  writeFile(SD, filename, data);
  
}

void setup()
{

  uint8_t conf[4];
  Wire.begin();
  Wire.setClock(400000);  //Increase I2C clock speed to 400kHz
  Serial.begin(115200);
  
  pinMode(PIN_PH, INPUT);
  pinMode(WIO_KEY_A, INPUT_PULLUP);
  pinMode(WIO_KEY_B, INPUT_PULLUP);
  pinMode(WIO_KEY_C, INPUT_PULLUP);
  pinMode(WIO_BUZZER, OUTPUT);
  
  //start temperature sensor
  sensors.begin();

  if (!si1151.Begin()){
        Serial.println("Si1151 is not ready!");
  }else{
        Serial.println("Si1151 is ready!");
  }

  //Start TFT LCD
  tft.begin();
  //Set TFT LCD rotation
  tft.setRotation(3);

  tft.setTextSize(1);
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_LIGHTGREY);

  //tft.drawString("Smart Lake Demo", 10, 10);
  tft.drawFastVLine(107, 0, 240, TFT_DARKGREEN); //Drawing verticle line
  tft.drawFastVLine(214, 0, 240, TFT_DARKGREEN); //Drawing verticle line
  tft.drawFastHLine(0, 120, 320, TFT_DARKGREEN); //Drawing horizontal line
  //tft.drawFastHLine(0, 210, 320, TFT_DARKGREEN); //Drawing horizontal line 2
  tft.drawString("pH", 10, 10);
  tft.drawString("TDS", 117, 10);
  tft.drawString("Turbidity", 224, 10);

  tft.drawString("Temperature", 10, 130);
  tft.drawString("Light", 117, 130);
  tft.drawString("UV", 224, 130);

  
  Serial.println("begin");

  //setup GPS
  GpsSerialInit();

  softSerial2.begin(9600);
  softSerial2.listen();
  while (!softSerial2);

  //sd card setup  
  while (!SD.begin(SDCARD_SS_PIN, SDCARD_SPI)) {
    Serial.println("Card Mount Failed");
    return;
  }

  uint8_t cardType = SD.cardType();

  if (cardType == CARD_NONE) {
    Serial.println("No SD card attached");
    return;
  }

}

int predict(){
    
    int ret = 0 ;
    float buffer[EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE] = { 0 };
    ei_impulse_result_t result = { 0 };
    buffer[0] = pHValue;
    buffer[1] = tdsValue;
    buffer[2] = turbidityVoltage;
    buffer[3] = wTemperature;
    buffer[4] = vLight;

    
    signal_t signal;
    int err = numpy::signal_from_buffer(buffer, EI_CLASSIFIER_DSP_INPUT_FRAME_SIZE, &signal);
    if (err != 0) {
        ei_printf("Failed to create signal from buffer (%d)\n", err);
        return ret;
    }

    // invoke the impulse
    EI_IMPULSE_ERROR res = run_classifier(&signal, &result, false /* debug */);
    ei_printf("run_classifier returned: %d\n", res);

    if (res != 0) {
      return ret;
    }

    float score = 0;
    String label = "";

    // human-readable predictions
    for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++) {
        
        if(result.classification[ix].value > score){
          score = result.classification[ix].value;
          label = result.classification[ix].label;
        }
    }
    Serial.printf("### PREDICTED VALUE %s", label.c_str());
    
    if(label == "normal"){
      ret = 1;
    }else if(label == "warning"){
      ret =2;
    }else if(label == "danger"){
      ret =3;
    }
    
    return ret;
}
void loop()
{

  //A - Normal , B- Warn , C - Danger
  

  static unsigned long samplingTime = millis();
  static unsigned long printTime = millis();
  static unsigned long loraTime = millis();
  
  

  if(millis() - lastGpsRead >  1 * 60 * 1000) {
    lastGpsRead = millis();
    GpsstopListening();
    delay(100);
    GpsSerialInit();
  }

  //if (millis() - samplingTime > samplingInterval)
  //{
    pHArray[pHArrayIndex++] = analogRead(PIN_PH);
    if (pHArrayIndex == ArrayLenth)pHArrayIndex = 0;
    voltage = avergearray(pHArray, ArrayLenth) * SysV / 1024;
    pHValue = kValue * voltage + Offset;


    int tdsAnalogValue = analogRead(PIN_TDS);
    tdsVoltage = tdsAnalogValue * SysV /1024.0; //Convert analog reading to Voltage
    tdsValue=(133.42/tdsVoltage*tdsVoltage*tdsVoltage - 255.86*tdsVoltage*tdsVoltage + 857.39*tdsVoltage)*0.5; //Convert voltage value to TDS value

    int turbidityAnalogValue = analogRead(PIN_TURBIDITY);
    turbidityVoltage = turbidityAnalogValue * SysV /1024.0; //Convert analog reading to Voltage

    sensors.requestTemperatures(); // Send the command to get temperatures
    // We use the function ByIndex, and as an example get the temperature from the first sensor only.
    wTemperature = sensors.getTempFByIndex(0);
    
    
    uvLight = si1151.ReadHalfWord_UV();
    vLight = si1151.ReadHalfWord_VISIBLE();
    


  //  samplingTime = millis();
  //}



  if (millis() - printTime > printInterval)  
  {
    

    // Serial.print("Voltage:");
    // Serial.print(voltage, 2);
    // Serial.print("    pH value: ");
    // Serial.println(pHValue, 2);

    displayOnTFP();
    
    //print_EVI();
    
    printTime = millis();
  }

  if (digitalRead(WIO_KEY_A) == LOW) {
    buzz();
    appendDataToFile("normal");
  }

  if (digitalRead(WIO_KEY_B) == LOW) {
    buzz();
    appendDataToFile("warning");
  }

  if (digitalRead(WIO_KEY_C) == LOW) {
    buzz();
    appendDataToFile("danger");
  }

  GetGpsInfoPolling();
  UpdateGpsInfo();

  
  int r = check_message_response();
  
  switch (r){
    case MODULE_IDLE:
      if (module_AT_Cmd <= AT_PORT){
      
        at_send_check_response_flag(E5_Module_Cmd[module_AT_Cmd].timeout_ms, E5_Module_Cmd[module_AT_Cmd].p_cmd);
        
      }
      else if (is_join == true){
        if(millis() - loraTime > (LORA_TRANSMIT_INTERVAL_IN_SECOND * 1000)){
        
          // int lat = (int)(Lat* (-0.01));
          // int lon = (int)(Lng*0.01);          
          Serial.printf("$$$$$$  Lat & Lng %d %d\n", Lat, Lng);
          loraTime = millis();
          char cmd[128];
          int phToInt = (int)(pHValue*10);
          int tdsToInt = (int)(tdsValue);
          int turbidityToInt = (int)(turbidityVoltage*10);
          int uvIndexToInt = (int)(uvLight*10);    
          int pLabel = predict();        
          module_AT_Cmd = AT_CMSGHEX;
          if (Lat != 0 ){
            if (!is_gps_sent){
                Serial.println("### GPS VALID AND SENDING");
                is_gps_sent = true;
                sprintf(cmd, "AT+CMSGHEX=\"%02X%02X%08X%08X\"\r\n", byte(1), byte(pLabel), (int)(Lat*1), (int)(Lng*1));                     
            }else{
                Serial.println("### GPS VALID BUT  ALREADY SENT BEFORE");
                sprintf(cmd, "AT+CMSGHEX=\"%02X%02X%02X%02X%04X%02X%02X%04X\"\r\n", byte(0), byte(pLabel), int(wTemperature), phToInt,tdsToInt,turbidityToInt,uvIndexToInt,vLight);
            }

                      
          }else{
            Serial.println("$$$ GPS NOT VALID");
            sprintf(cmd, "AT+CMSGHEX=\"%02X%02X%02X%02X%04X%02X%02X%04X\"\r\n", byte(0), byte(pLabel), int(wTemperature), phToInt,tdsToInt,turbidityToInt,uvIndexToInt,vLight);
          }

          at_send_check_response_flag(E5_Module_Cmd[module_AT_Cmd].timeout_ms, cmd);
          
        }
      }
      else if (is_join == false){
        Serial.printf("Not Connected. Trying to join... \n"); 
        if ((millis() - loraTime) > 5 * 1000){
          Serial.println("Send Jion");
          loraTime = millis();
          module_AT_Cmd = AT_JOIN;
          at_send_check_response_flag(E5_Module_Cmd[module_AT_Cmd].timeout_ms, E5_Module_Cmd[module_AT_Cmd].p_cmd);
        }
      }

      break;
    case MODULE_RECEIVING:
      break;
    case MODULE_TIMEOUT:
      is_exist = false;
      is_join  = false;
      module_AT_Cmd = AT_OK;
      Serial.println("MODULE_TIMEOUT");
      break;
    case MODULE_ACK_SUCCESS:
      is_exist = true;

      switch (module_AT_Cmd){
        case AT_JOIN:
          if (strstr(recv_buf, "Network joined") != NULL){
            is_join = true;
          }
          else{
            is_join = false;
          }
          break;

        case AT_ID:
          int j = 0;
          char *p_start = NULL;
          p_start = strstr(recv_buf, "DevEui");
          sscanf(p_start, "DevEui, %23s,", &str);//&E5_Module_Data.DevEui);
          j = 0;
          for (int i = 0; i < 16; i++, j++){
            if ((i != 0) && (i % 2 == 0)){
              j += 1;
            }
            str_devEui[i] = str[j];
          }
          Serial.println(str_devEui);
          p_start = strstr(recv_buf, "AppEui");
          sscanf(p_start, "AppEui, %23s,", &str);//&E5_Module_Data.AppEui);
          j = 0;
          for (int i = 0; i < 16; i++, j++){
            if ((i != 0) && (i % 2 == 0)){
              j += 1;
            }
            str_appEvi[i] = str[j];
          }
          Serial.println(str_appEvi);
          init_ui = 0;
          break;

      }

      if (module_AT_Cmd <= AT_PORT){
      //if (module_AT_Cmd <= AT_LW){
        module_AT_Cmd++;
      }
      break;
  }
  
}

double avergearray(int* arr, int number) {
  int i;
  int max, min;
  double avg;
  long amount = 0;
  if (number <= 0) {
    Serial.println("Error number for the array to avraging!/n");
    return 0;
  }
  if (number < 5) { //less than 5, calculated directly statistics
    for (i = 0; i < number; i++) {
      amount += arr[i];
    }
    avg = amount / number;
    return avg;
  } else {
    if (arr[0] < arr[1]) {
      min = arr[0]; max = arr[1];
    }
    else {
      min = arr[1]; max = arr[0];
    }
    for (i = 2; i < number; i++) {
      if (arr[i] < min) {
        amount += min;      //arr<min
        min = arr[i];
      } else {
        if (arr[i] > max) {
          amount += max;  //arr>max
          max = arr[i];
        } else {
          amount += arr[i]; //min<=arr<=max
        }
      }//if
    }//for
    avg = (double)amount / (number - 2);
  }//if
  return avg;
}

void displayOnTFP(){

    spr.createSprite(90, 90);
    spr.fillSprite(TFT_BLACK);
    spr.setTextColor(TFT_LIGHTGREY);
    spr.setTextSize(3);
    spr.drawFloat(pHValue, 2, 0, 30);
    spr.pushSprite(10, 20);
    spr.deleteSprite();

    spr.createSprite(90, 90);
    spr.fillSprite(TFT_BLACK);
    spr.setTextColor(TFT_LIGHTGREY);
    spr.setTextSize(3);
    spr.drawFloat(tdsValue, 1, 0, 30);
    spr.pushSprite(117, 20);
    spr.deleteSprite();
    

    spr.createSprite(90, 90);
    spr.fillSprite(TFT_BLACK);
    spr.setTextColor(TFT_LIGHTGREY);
    spr.setTextSize(3);
    spr.drawFloat(turbidityVoltage, 2, 0, 30);
    spr.pushSprite(224, 20);
    spr.deleteSprite();

    spr.createSprite(90, 90);
    spr.fillSprite(TFT_BLACK);
    spr.setTextColor(TFT_LIGHTGREY);
    spr.setTextSize(3);
    spr.drawFloat(wTemperature, 1, 0, 30);
    spr.pushSprite(10, 140);
    spr.deleteSprite();

    spr.createSprite(90, 90);
    spr.fillSprite(TFT_BLACK);
    spr.setTextColor(TFT_LIGHTGREY);
    spr.setTextSize(3);
    spr.drawNumber(vLight, 0, 30);
    spr.pushSprite(117, 140);
    spr.deleteSprite();

    spr.createSprite(90, 90);
    spr.fillSprite(TFT_BLACK);
    spr.setTextColor(TFT_LIGHTGREY);
    spr.setTextSize(3);
    spr.drawFloat(uvLight,2, 0, 30);
    spr.setTextSize(1);
    spr.drawFloat(Lat,5, 0, 60);
    spr.drawFloat(Lng,5, 0, 75);
    
    spr.pushSprite(224, 140);
    spr.deleteSprite();

}