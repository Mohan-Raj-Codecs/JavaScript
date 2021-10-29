import pyfirmata as fir
from pyfirmata import INPUT,OUTPUT,PWM
from time import sleep
from urllib.request import urlopen
import json
import serial.tools.list_ports

##Functions
def Find_Arduino():
    Ards=[]
    ports = list(serial.tools.list_ports.comports())
    if len(ports)==1:
        return str(ports[0]).split(' ')[0]
    
    for p in ports:
        if "Arduino" in p.description:
            Ards.append(p.description.split(' '))

    if len(Ards)>1:
        print("Multiple Arduino Detected.....\nUsing First Arduino.....")
        return str(Ards[0]).split(' ')[0]

def fetch():
    url="http://3.108.227.188/data.json"
    data = json.loads(urlopen(url).read())
    return data["on"]
##Functions END

####Pre-Test
print("Auto-Detecting Arduino\n")
try:
    board=fir.Arduino(Find_Arduino())
    print("Found Arduino at Port : ",Find_Arduino())
    it = fir.util.Iterator(board)
except:
    print("Arduino is Not Connected :(")
    sleep(5)
    exit()
print("Arduino Check..............Connected")
print("\nChecking Internet Access")
try:
    fetch()
except:
    print("No Internet Access\nConnect to Internet :(")
    sleep(5)
    exit()
print("Internet Check.............Connected")
####Test-END

##VARS
volt=0.0
on=False
##VARS END


##Setup
net = board.get_pin('d:8:o')
it.start()
##Setup END


##Loop
print("\nReady :) ")
while True:
    try:
        if fetch():
            net.write(1)
        else:
            net.write(0)
    except:
        print("Internet Disconnected :( ")
        break
##Loop END


board.exit()
