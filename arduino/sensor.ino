#include <arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "ZoneZ";      // WiFi navn som kommunikationen skal se over
const char* password = "12ab12ab12";  // WiFi adgangskode

const char* DeviceID = "sensor_P1";                         // Navnet på sensor som sidder ved hvilken port
const char* LogUrl = "http://10.12.0.190:4000/updategate";  // IP til serveren og så endpoint til opdatering af status

const int trans_pin = 4;  //Trig
const int recv_pin = 5;   //Echo
float dist_raw;           //distance variable
int distIdx = 0;          // peger på næste felt i latestDist
float latestDist[5];      // De 5 nyeste dist værdier
bool isHome = true;
float homeDist = 1.6;
float loopTime = 2000;

void setup() {

  Serial.begin(9600);

  pinMode(trans_pin, OUTPUT);  //transmit is ouput
  pinMode(recv_pin, INPUT);    //receive is input

  // WiFi -------------------------------------------

  // Opret forbindelse til WiFi
  WiFi.begin(ssid, password);

  // Vent på forbindelse
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("----");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("----");

  // ------------------------------------------------
}

void isAmbuHome() {
  bool isHomeTest = true;
  bool isAwayTest = true;

  for (int i = 0; i < 5; i++) {
    if (latestDist[i] >= homeDist) {   // én eller flere målinger er ikke under 1.6
      isHomeTest = false;
    }
    if (latestDist[i] <= homeDist) {   // én eller flere målinger er ikke under 1.6
      isAwayTest = false;
    }
  }

  if (isHomeTest) {
    isHome = true;
  }

  if (isAwayTest) {
    isHome = false;
  }

  if (isHome) {
    // alle tre < 1.6 m  → ambulance registreret
    Serial.printf("HOME: ", DeviceID);
    SendToBackend("home");           // fx 1 = hjemme
  } else {
    // mindst én ≥ 1.6 m → ingen ambulance
    Serial.printf("AWAY: ", DeviceID);
    SendToBackend("away");           // fx 0 = væk
  }
}

// Sender JSON til serveren
// void SendToBackend(String value) {
void SendToBackend(String status) {
  String Json = "{";
  Json = Json + "\"deviceid\":\"" + DeviceID + "\",";
  Json = Json + "\"status\":\"" + status + "\"";
  Json = Json + "}";

  WiFiClient client;
  HTTPClient http;
  http.begin(client, LogUrl);
  http.setTimeout(500);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(Json);
  if (httpCode > 0) {
    // Serial.printf("[HTTP] POST... code: %d\n", httpCode);
    if (httpCode == HTTP_CODE_OK) {
      // Serial.printf("[HTTP] POST... succes %d\n", httpCode + "\n" + Json);
    } else {
      Serial.printf("[HTTP] POST... failed, code: %s\n", +http.errorToString(httpCode).c_str());
    }
  } else {
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
}

void loop() {

  float duration;  //time var

  digitalWrite(trans_pin, LOW);  // ensure no errant transmission
  delayMicroseconds(5);

  digitalWrite(trans_pin, HIGH);  // transmit
  delayMicroseconds(10);

  digitalWrite(trans_pin, LOW);        // stop transmission
  duration = pulseIn(recv_pin, HIGH);  // listen for pulses

  // dist_raw = duration*(340*39.37)/(2*1000000); // calculate distance

  dist_raw = duration * (340) / (2 * 1000000);  // calculate distance
  /*
d = c*delta(t)/2
c = 340 m/s
39.79 inch per meter
duration is in microseconds, so 1*10^6 is divided
*/

  // gem målingen i den cirkulære buffer
  latestDist[distIdx] = dist_raw;
  distIdx = (distIdx + 1) % 5;     // hop til næste plads (0 → 1 → 2 → 0)

  // tjek om ambulancen er hjemme
  isAmbuHome();


  Serial.print(dist_raw);
  Serial.println(" Meter");

  // SendToBackend(String(dist_raw));

  delay(loopTime);  // can alter based on needs of application
}