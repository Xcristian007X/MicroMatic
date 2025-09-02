import time
import requests

if __name__==  '__main__':

    while(True):
        time.sleep(1800)
        url = 'http://127.0.0.1:5000/clean'
        response = requests.delete(url)