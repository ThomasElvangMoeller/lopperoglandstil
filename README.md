# Website, LopperogLandstil

###Vores kodestil

1. Alt skal skrives på engelsk
2. Koden skal opdeles i funktionalitet, hold relateret funktioner tæt
3. END points på websiden er på dansk

###End points
*beskrivelse er over end point*
```
GET: http://lopperoglandstil.dk/

GET: http://lopperoglandstil.dk/admin
GET: http://lopperoglandstil.dk/session
```
Returnerer Produkterne i databasen, :id er ObjectId på et specifikt produkt
```
GET: http://lopperoglandstil.dk/api/produkter
GET: http://lopperoglandstil.dk/api/produkter/:id
```
Returnerer et array med den fulde sti til billedet
```
GET: http://lopperoglandstil.dk/api/produkter/:id/billeder
```

- req.body Parametere (name, desc, amount, categories, price)
```
POST: http://lopperoglandstil.dk/api/produkter
```
- req.files = array af billeder
```
POST: http://lopperoglandstil.dk/api/produkter/:id/uploadbilleder
```


###Medlemmer
- Frank
- Frederik
- Ole
- Simon K
- Simon G
- Thomas


