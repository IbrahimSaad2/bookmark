var bookmarkName = document.getElementById("bookmark-name");
var bookmarkUrl = document.getElementById("url");
var msg = document.getElementById("msg");

var urlList  = [];

if(localStorage.getItem("urls")!==null){
    urlList = JSON.parse(localStorage.getItem("urls")); 
    display();
}

function addUrl(){
    if(validationName() == true  && validationUrl() == true){
        var link = {
            name :  bookmarkName.value ,
            url :   bookmarkUrl.value
        }
        urlList.push(link);
        localStorage.setItem("urls",JSON.stringify(urlList));
        clearUrl();
        display();
        console.log(urlList);
        msg.classList.add("d-none")
    }
    else{
        msg.classList.remove("d-none")
    }
}

function clearUrl(){

    bookmarkName.value = null ,
    bookmarkUrl.value = null    

    bookmarkName.classList.remove("is-valid");
    bookmarkUrl.classList.remove("is-valid");
}

function display(){
    var cartona = "";

    for (var i = 0;i<urlList.length;i++ ){
        cartona +=`
        <tr>
                    <th> ${i+1}</th>
                    <th>${urlList[i].name}</th>
                    <th>
                    <a href="${urlList[i].url}" target="_blank">
                    <button class = "btn btn-success">
                        <i class="fa-solid fa-eye" style="color: #ffffff;"></i>
                        Visit</button>
                    </a>
                </th>
                    <th>
                        <button onclick = "deleteUrl(${i})" class="btn btn-danger">
                            <i class="fa-solid fa-trash" style="color: #ffffff;"></i>
                            Delete
                        </button>
                    </th>
                </tr>
        `
    }

    document.getElementById("data").innerHTML = cartona; 
}

function deleteUrl(index){
    urlList.splice(index,1);
    display();
    localStorage.setItem("urls",JSON.stringify(urlList));

}

function validationName(){
    var nameurl = bookmarkName.value ;
    var regex = /^[a-zA-Z]{3,}$/;
    console.log(bookmarkName.value)
    if(regex.test(nameurl) == true){

        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");

        return true;
    }
    else{
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");

        return false;
    }
}

function validationUrl(){
    var url = bookmarkUrl.value;
    var regex = /^(?:(?:http|https|ftp):\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=%]+$/;

    if(regex.test(url) == true){
        bookmarkUrl.classList.add("is-valid");
        bookmarkUrl.classList.remove("is-invalid")
        return true;
    }
    else{
        bookmarkUrl.classList.add("is-invalid");
        bookmarkUrl.classList.remove("is-valid");
        return false;
    }
}
