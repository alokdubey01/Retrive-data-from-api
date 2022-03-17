# Retrive-data-from-api

  // creating a javascript array to store the value
      const userDetail = { name: user.name, img: user.img };
      
      // storing the value in previous defined array
      localStorage.setItem('userDetail', JSON.stringify(userDetail))
      
      // passing the detail from array
      const retrieveUser = JSON.parse(localStorage.getItem('userDetail'));
      
      // value is ready to use
      console.log(retrieveUser.img);
