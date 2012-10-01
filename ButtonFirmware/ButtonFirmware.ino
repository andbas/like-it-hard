byte ledPin = 13;
byte echoPin = 2;
byte interrupt = 0;
unsigned long lastTime;
unsigned long currentTime;

volatile int state = LOW;

void setup()
{
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  attachInterrupt(interrupt, pressed, RISING);
  lastTime = millis();
}

void loop()
{
  
}

void pressed()
{
  currentTime = millis();
  if((currentTime-lastTime) > 300){
    digitalWrite(ledPin, HIGH);
    Serial.println("PRESSED");
    digitalWrite(ledPin, LOW);
    lastTime = currentTime;
  }
}

