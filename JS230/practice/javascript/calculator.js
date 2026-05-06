/*
Write some JavaScript to create a new product by sending a 
request to the JSON API on our web store. To create a product,
 make a POST request to
  https://ls-230-web-store-demo.herokuapp.com/v1/products. 
  To make the post request, you'll need the following:

Content-Type header set to application/json; charset=utf-8
Authorization header set to token AUTH_TOKEN
json object with the following properties:
name
sku (must have 3 or more characters)
price (must be an integer greater than 0)


Create a product
Make post request to href
post request has content-type, authorization.
body has json file
to create a json object
- take an object convert to JSON string using `JSON.stringify()`

*/
let data = {name: "Thomas Lee", sku: KTS234, price: 23}
let json = JSON.stringify(data)

let response = await fetch('https://ls-230-web-store-demo.herokuapp.com/v1/products', {
  method : 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utr-8',
    body: json
  }
  }
)

if (response.status === 201){
  console.log()
}
