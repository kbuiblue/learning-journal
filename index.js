const appSettings = {
    databaseURL: "https://learning-journal-e7115-default-rtdb.asia-southeast1.firebasedatabase.app",
  };

  const app = firebase.initializeApp(appSettings);
  const database = firebase.database();
  const blogsInDB = firebase.database().ref("blogs-list");

const heroEl = document.querySelector(".hero");

blogsInDB.on("value", function (snapshot) {
    if (snapshot.exists()) {
        const data = Object.entries(snapshot.val());
        console.log(data);

        renderHtml(data);
    } else {
        console.log("No data available");
    }
});

function renderHtml(data) {
    data.forEach(function(blog){
        heroEl.innerHTML += JSON.stringify(blog);
    })
}

// contentEl.innerHTML += `<img src="/img/article-image-03.png">
//                             <p class="date">JULY 23, 2022</p>`
