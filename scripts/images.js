// fetch from genesis
var threads = {
  "v": 3,
  "q": {
    "find": {
    "out.s1": "1P8FmmWdyRY1bmHJso6nGc7smBSvwvFoje"
     },
    "limit": 150,
  },
  "r": {
    "f": "[ .[] | { txid: .tx.h, img: .out[0].s5 }]"
  }
}

// parse it
var b64 = btoa(JSON.stringify(threads));
var url = "https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/" + b64;
var header = {
  headers: { key: "14QX7pn5GbipWvNLyDfrdcZLzwvPYJSnhB" }
};
//
fetch(url, header).then(function(r) {
  return r.json()

}).then(function(r) {
  let res = r.u.concat(r.c)
  res.forEach(function(output) {

    var threadid = output.txid;
    var content = output.txt;
    var imglink = output.img;

    console.log(`txid is ${threadid} `);
    console.log(`message is ${content}`);

    var thread = document.createElement("div");
    thread.id = (`${threadid}`);
    thread.setAttribute('class', 'thread');
   // image
    var img = document.createElement('img');
    var url = "https://bico.media/" + output.img
    img.setAttribute("src", `${url}`);
    console.log(`url is ${url}`);

  //
    thread.innerHTML =
    "<img src=" + `${url}` + " class=pic></img>"
    + "<textarea id=imglink" + output.txid + ">"
    + output.img + "</textarea>" +
    "<br />" +
    "<br />" + "<button id=imgcopy>Copy</button>";
    document.body.appendChild(thread);
    thread.querySelector("#imgcopy").addEventListener("click", function(e) {
        var copyURL = document.querySelector("#imglink" + output.txid);
        console.log(`${copyURL}`);
        copyURL.select();
        document.execCommand("copy");
        alert("Image link copied!");
    })
})
})

