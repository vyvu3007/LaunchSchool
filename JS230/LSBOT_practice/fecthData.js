function delay(duration){
    return new Promise((resolve) => {
   setTimeout(()=>{
     resolve()
   }, duration) 
    })
}

delay(2000).then(() => console.log('This message is logged after 2 seconds'));