import requests 



def getTickets(lat, lon):

    api_url = "https://api.seatgeek.com/2/events?"
    api_auth = "&client_id=MjQzMjE5MTZ8MTYzNjI0NzI0MC40MzUzMjU2&client_secret=809b5ff10396bba3e90845f0b0e0b78bba1163654d820c6e3c5583d83960baf5"
    
    
    built_url = api_url + "lat=" + lat + "&lon=" + lon +"&sort=score.asc&page=2"+ api_auth
    built_url2 =  api_url + "&sort=score.asc&page=2"+ api_auth
    #print(built_url)
    req = requests.get(built_url)
    print(req.json())           
    ### my client id MjQzMjE5MTZ8MTYzNjI0NzI0MC40MzUzMjU2
##809b5ff10396bba3e90845f0b0e0b78bba1163654d820c6e3c5583d83960baf5

##main
getTickets("39.9978726", "-83.0084871")