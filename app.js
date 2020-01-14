    var long = 116.4074;
    var lat =39.9042;
    let tempratureDescription = document.querySelector(".temprature-description");
    let tempratureDegree = document.querySelector(".temprature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    let city = document.querySelector(".city");
    let localTime = document.querySelector(".time");
    var date = new Date();
    var hours = date.getUTCHours();
    var minutes =  date.getMinutes();
    
    lat = 41.8781;;
    long = -87.6298;
    weath();

    city.addEventListener("change", () => {
        switch(city.value){
            case "washington":
                console.log("this is wash")
                lat = 41.8781;
                long = -87.6298;
                hours = date.getUTCHours(); 
                hours = hours -6;
                console.log(lat);
                console.log(long);
                weath();
                break;
            
            case "tokyo":
                console.log("this is tokyo")
              
                lat = 35.6762;
                long = 139.6503;
                hours = date.getUTCHours(); 
                hours = hours +9;
                console.log(lat);
                console.log(long);
                weath();
                break;
            
            case "khartoum":
                console.log("this is khartoum")
                
                lat = 15.5007;
                long = 32.5599;
                hours = date.getUTCHours(); 
                hours = hours +2;
                console.log(lat);
                console.log(long);
                weath();
                break;
            
            case "riyadh":
                
                lat = 24.7136;
                long = 46.6753;
                hours = date.getUTCHours(); 
                hours = hours +3;
                weath();
                break;
            

            case "my-city":
                
                if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                console.log(long,lat);
                hours = date.getHours();
                weath();
                });
            }
                break;



            default:
                lat = 48.8566;
                long = 2.3522;
                weath();
        }
    });
                    
                function weath(){
                   // city.addEventListener("change", () => {
                    var proxy = 'https://cors-anywhere.herokuapp.com/';
                    var api = `${proxy}https://api.darksky.net/forecast/e1f1b1374ece33bbe42fa78dcac804d1/${lat},${long}`;
                    
                    fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                    console.log(data);
                        
                        var { temperature, summary, icon} = data.currently;
                        // Setting DOM Elements
                        tempratureDegree.textContent = Math.round(temperature);
                        tempratureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        temperatureSpan.textContent = "F";
                        //localTime.textContent = time;
                       
                        // Foumula for time
                        // Create a new JavaScript Date object based on the timestamp
                        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                        //var date = new Date(time*1000);
                        // Hours part from the timestamp
                        //var hours = date.getHours();
                        // Minutes part from the timestamp
                        //var minutes =  date.getMinutes();
                        // Seconds part from the timestamp
                        var seconds = "0" + date.getSeconds();

                        // Will display time in 10:30:23 format
                        var formattedTime = hours + ':' + minutes;
                        localTime.textContent = formattedTime;

                        
                        //set Icom
                        setIcons(icon, document.querySelector(".icon"));
                        // choose a city
                        
                        
                        
                        //change temperature to C/F
                        
                        
                    

                        

                        
                    });

                

                }
             
            temperatureSection.addEventListener("click", ()=> {
                
                if (temperatureSpan.textContent === "F"){
                var celsius = Math.round((tempratureDegree.textContent - 32) * (5/9)); 
                    temperatureSpan.textContent = "C";
                    tempratureDegree.textContent = (celsius);

                }else{
                var fah = Math.round((tempratureDegree.textContent / (5/9)) +32);
                    temperatureSpan.textContent = "F";
                    tempratureDegree.textContent = (fah);
                }
                
            });
            
              
        
        
        
            
        function setIcons(icon, iconID){
            var skycons = new Skycons ({color: "white"});
            var currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }

        
    
