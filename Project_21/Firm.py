import pyfirmata as fir
from pyfirmata import INPUT,OUTPUT,PWM
from time import sleep
from urllib.request import urlopen
import json


def fetch():
    url="http://3.108.227.188/data.json"
    data = json.loads(urlopen(url).read())
    return data["on"]

print("Detecting Arduino")
try:
    board=fir.Arduino('COM3')
    it = fir.util.Iterator(board)
except:
    print("Arduino is Not Connected :(")
    sleep(5)
    exit()
print("Arduino Check..............Connected")
print("Checking Internet Access")
try:
    fetch()
except:
    print("No Internet Access\nConnect to Internet :(")
    sleep(5)
    exit()
print("Internet Check.............Connected")

##VARS
volt=0.0
on=False
##VARS End


##Setup
net = board.get_pin('d:8:o')
it.start()
##Setup End


##Loop
print("Ready :) ")
while True:
    try:
        if fetch():
            net.write(1)
        else:
            net.write(0)
    except:
        pass
##Loop End


board.exit()
