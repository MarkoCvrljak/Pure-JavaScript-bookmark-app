//javascript...

//button listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){

//get site name and site url
var siteName = document.getElementById('siteName').value; 
var siteUrl = document.getElementById('siteUrl').value;

if(!siteName || !siteUrl){
alert('Please fill in the form')
return false;
}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
alert('Please enter a valid url')
return false;
}



document.getElementById('myForm').reset();

var bookmark = {
 
  name:siteName,
  url:siteUrl
}

//local storage

/*
localStorage.setItem('test','Heloo');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/

//test if item bookmarks is null
if(localStorage.getItem('bookmarks') === null){

//Initiate Array
var bookmarks = [];

//add to array
bookmarks.push(bookmark);

//set to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


//get bookmarks from local storage
}else{
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

for(var i=0; i<bookmarks.length; i++){
     //check if your current value against key name is already present in any existing bookmar 
        if(bookmarks[i].name === bookmark.name){
            alert('you already entered that bookmark');
            return false;
            
        }
    }


//add bookmark in array
bookmarks.push(bookmark);


//re-set back to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	  
}

//re-fetch bookmarks
fetchBookmarks();

//preventing form from submitting
e.preventDefault();

//end saveBookmark function
}








//deleteBookmark function
function deleteBookmark(url){

//get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//loop throught bookmarks and delete from array whit splice metodh
for(var i = 0; i<bookmarks.length; i++){
  if(bookmarks[i].url == url){

    bookmarks.splice(i, 1);

   }

 }


//re-set back to local storage
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


//re-fetch bookmarks
fetchBookmarks();

}





//fetch bookmarks function from local storage
function fetchBookmarks(){


//get bookmarks from local storage
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));


//Get output id
var bookmarksResults = document.getElementById('bookmarksResults');


//Build output
bookmarksResults.innerHTML = ' ';


//loop throught bookmarks that are stored in local storage and output them one by one
for(i = 0; i < bookmarks.length; i++){

var name = bookmarks[i].name;
var url = bookmarks[i].url;

bookmarksResults.innerHTML += '<div class="well">'+
                               '<h3>' + name +
							   //a tag je sa razmakom izmedju jednostrukih navodnika da bi na formi dobili razmak izmedju imena i botuna
							   ' <a class="btn btn-default" target="_blank" href="'+url+'">Go visit</a> '+
							   //ovdje prenosimo iz a taga url parametar u funkciju a posto smo u a tagu moramo improvizirati sa ovim back-slashom i navodnicima kako bi pravilno prenijeli parametar
							   ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete from bookmarks</a> '+
							   '</h3>' + 
							   '</div>';

}



//end fetchBookmars function
}

