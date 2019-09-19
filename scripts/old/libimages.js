// fetch from genesis
var threads = {
  "v": 3,
  "q": {
    "find": {
      "$text": { "$search": "b://" },
    "out.s1": "1P8FmmWdyRY1bmHJso6nGc7smBSvwvFoje"
     },
    "limit": 50,
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
    var imglink = output.img;

    console.log(`txid is ${threadid} `);

    var image = document.createElement("div");
    image.id = (`${threadid}`);
    image.setAttribute('class', 'library');
   // image
    var img = document.createElement('img');
    var url = "https://bico.media/" + output.img;
    img.setAttribute("src", `${url}`);
    console.log(`url is ${url}`);

  //
    image.innerHTML =
    "<img src=" + `${url}` + " class=libimg></img>"
    + "<textarea id=imglink" + threadid + ">"
    + imglink + "</textarea>" +
    "<br />" +
    "<br />" + "<button id=imgcopy" + threadid + " >Copy</button>"
    + "</div>";
    document.body.appendChild(image);
    image.querySelector("#imgcopy" + threadid).addEventListener("click", function(e) {
        var copyURL = image.querySelector("#imglink" + threadid);
        console.log(`${copyURL}`);
        copyURL.select();
        document.execCommand("copy");
        alert("Image link copied: (" +  copyURL.value + ")");
    })
})
})

