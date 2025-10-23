import json
import threading
import time

import requests
import os
from coordenadas import *

if __name__==  '__main__':
    url = os.getenv("API_URL", "http://127.0.0.1:5000/geo")

    headers = {'Content-type': 'application/json'}
    def bus1():
        for x in geo1Aida():
            coords = {
                "linea": "1A",
                "patente": "SDXS23",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus2():
        for x in geo1Aida():
            coords = {
                "linea": "1A",
                "patente": "JDFW21",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus3():
        for x in geo1Aregreso():
            coords = {
                "linea": "1A",
                "patente": "YVGW12",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus4():
        for x in geo1Aregreso():
            coords = {
                "linea": "1A",
                "patente": "ZZAS23",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus5():
        for x in geo2Aida():
            coords = {
                "linea": "2A",
                "patente": "WXCF33",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus6():
        for x in geo2Aida():
            coords = {
                "linea": "2A",
                "patente": "YJDA43",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus7():
        for x in geo2Aregreso():
            coords = {
                "linea": "2A",
                "patente": "HTHJ42",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)

    def bus8():
        for x in geo2Aregreso():
            coords = {
                "linea": "2A",
                "patente": "XDSD12",
                "coordenadas": [x]
            }
            time.sleep(5)
            response = requests.post(url,headers=headers,data = json.dumps(coords))

            if response.status_code == 200:
                print(response.content)


hilo1 = threading.Thread(name='bus1', 
                         target=bus1,
                         daemon=True)
                         
hilo2 = threading.Thread(name='bus2',
                         target=bus2,)

hilo3 = threading.Thread(name='bus3',
                         target=bus3,)

hilo4 = threading.Thread(name='bus4',
                         target=bus4,)

hilo5 = threading.Thread(name='bus5',
                         target=bus5,)

hilo6 = threading.Thread(name='bus6',
                         target=bus6,)

hilo7 = threading.Thread(name='bus7',
                         target=bus7,)

hilo8 = threading.Thread(name='bus8',
                         target=bus8,)

hilo1.start()
hilo3.start()
hilo5.start()
hilo7.start()
time.sleep(30)
hilo2.start()
hilo4.start()
hilo6.start()
hilo8.start()