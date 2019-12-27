this.endpoint.on("registration_changed", (account) => {
    console.log("registration_changed", account);

    //makeCall 




    if (1 == 0) {
      //Звоним
      let options = {
        headers: {
          "P-Assserted-Identity": "Header example",
          "X-UA": "React native"
        }
      }

      
      let call = this.endpoint.makeCall(account, "50013", options);
      //let call =  this.endpoint.makeCall(account, "1111", options);
      call.then(() => {
        console.log("call.getId", call.getId());
      }).catch((e) => {
        console.log(e);

      });
    }


    console.log(8);

  });




  console.log("call_received", call);        
  //this.callId = call.getId();
  //console.log("this.callId", this.callId);






          /*
        //Позже когда событие дозвона в Dialerе (или callrecordere)

        let options = {};
        let promise = this.endpoint.answerCall(call, options);
        promise.then(() => {
          console.log('Answer complete, expect that "call_changed" will be fired.');
        }).catch((e) => {
          console.log('Answer failed, show error', e);
        });
        */
