document.addEventListener("DOMContentLoaded", function() {
	document.querySelector("#done").addEventListener("click", function(e) {
    document.querySelector("#submit").classList.remove('hidden')
    
    var btip = document.querySelector("#imglink").value;
    var tip = btip.replace("b://", '');
    var bquery = {
        "v": 3,
        "q": {
          "db": ["u","c"],
          "find": {
            "tx.h": tip,
          },
          limit: 1,
        },
        "r": {
          "f": "[ .[] | { addr: .in[0].e.a? }]"
        }
      };
      var b64 = btoa(JSON.stringify(bquery));
      var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
      var header = {
        headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
      };
      fetch(url, header).then(function(r) {
        return r.json()
      }).then(function(r) {
        let res = r.u.concat(r.c)
        res.forEach(function(output) {
          var tipaddr = output.addr;
          var newt = document.querySelector("#newthread").value;
          function a(newt) {
            if (newt == "") {
      console.log("it is")
      return "  "
    } else {
      return newt;
    }
          }


          console.log(a(newt))
          databutton.build({
      data: ["1P8FmmWdyRY1bmHJso6nGc7smBSvwvFoje", board, "THREAD", a(newt), document.querySelector("#imglink").value],

      button: {
        $el: "#button",
        label: "",
        $pay: {
          to: [{
            address: "haichan@moneybutton.com",
            value: 5000
          },
        {
          address: tipaddr,
          value: 900 
        }],
        },
        onPayment: function(e) {
          window.location.reload();
          console.log("paid!", e)
          setTimeout(function() {
            feed();
          }, 1000)
        }
      }
    })
    })
  })
})
})
