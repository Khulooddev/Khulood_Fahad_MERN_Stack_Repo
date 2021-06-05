let ready = false;

$(document).ready(function () {
    if (false) { return; }

    // imports footer and header in each html file
    loadHeaderFooter();

    // handles the 'create-a-post.html' form 
    formHandler();

    // views created posts in 'view-blogs.html' 
    viewBlogs();

});


$(window).on('load', function () {

    // gets the current web page url and stores it in variable
    let pageURL = window.location.href;

    // change the href value of the nav-bar link to 'index.html'
    // when the web page is either 'create-a-post.html' or 'view-blogs.html'
    if (pageURL.indexOf("create-a-post.html") >= 0 || pageURL.indexOf("view-blogs.html") >= 0) {
        for (let i = 1; i < 4; i++) {
            $(`.page-btn-${i}`).attr('href', './index.html');
            console.log($('.page-btn').attr('href'));
        }
    }
});

function loadHeaderFooter() {

    // imports footer and header in each html file
    $(".header-section").load("./header.html");
    $(".footer-section").load("./footer.html");
}

function formHandler() {

    const titleArray = [];
    const contentArray = [];
    let textFieldInput, textAreaInput;

    // fires this function when submit button is clicked
    $("#submit-btn").click(function () {

        // gets and store the values of input fields
        textFieldInput = $("#inputtext-id").val();
        textAreaInput = $("#textarea-id").val();

        // check if session storge exists or not
        // does not matter which one, all sessions storge, 
        // used here stores the same number of data
        // it's Important to check, otherwise all previous values will be override 
        if (sessionStorage["blog-title"]) {

            // gets session storage data and stores it 
            let sessionBlogTitle = JSON.parse(sessionStorage.getItem('blog-title'));
            let sessionBlogContent = JSON.parse(sessionStorage.getItem('blog-content'));

            // pushs the input fields into arrays
            sessionBlogTitle.push(textFieldInput);
            sessionBlogContent.push(textAreaInput);

            // stores array in session storage
            sessionStorage.setItem('blog-title', JSON.stringify(sessionBlogTitle));
            sessionStorage.setItem('blog-content', JSON.stringify(sessionBlogContent));

        }
        else {
            // in case session storage with respective key does not exist
            // create a new session storage and stores arrays in it
            titleArray.push(textFieldInput);
            contentArray.push(textAreaInput);
            sessionStorage.setItem('blog-title', JSON.stringify(titleArray));
            sessionStorage.setItem('blog-content', JSON.stringify(contentArray));
        }
    });
}

function viewBlogs() {

    // gets session storage values and stores it in new variables
    let sessionBlogTitle = JSON.parse(sessionStorage.getItem('blog-title'));
    let sessionBlogContent = JSON.parse(sessionStorage.getItem('blog-content'));
    let sessionBlogImage = JSON.parse(sessionStorage.getItem('blog-image'));

    // hides article tag with the class name 'blog-post' when no post is created
    $('.blog-post').hide();

    // removes the div tag with the class name '.no-content-div' 
    // this div contains a message 
    // no need for this meessage when posts are created
    if (sessionBlogTitle.length > 0) {
        $(".no-content-div").remove();
    }

    // a reference of the div with the class name '.blog-content-coloumn'
    // all posts content are append as a child for this div
    let bigContainer = $('.blog-content-coloumn')[0];

    // created once and sets multiple times
    let divCol4;
    let divCol8;
    let divRow;
    let articleTag;

    // iterates through session storage to get posts' title
    sessionBlogTitle.forEach((title, index) => {

        // creates h3 and sets the inner text to title
        // values of inner text retrieved from session storage
        // add class names to reflects style
        // append h3 elemets as child of the div 'divCol8'
        $(`.blog-post-${index + 1}`).show();

        let h3Tag = document.createElement('H3');
        divCol8 = $(`.content-col-${index + 1}`)[0];

        h3Tag.classList.add('blog-title-h3');
        h3Tag.innerText = title;
        divCol8.appendChild(h3Tag);
    });

    // iterates through session storage to get posts' content
    sessionBlogContent.forEach((content, index) => {

        // creates p and sets the inner text to content
        // values of inner text retrieved from session storage
        // creates a and sets the inner text to 'Read more'
        // add class names to reflects style
        // append p and a elemets as child of the div 'divCol8'
        let pTag = document.createElement('P');
        divCol8 = $(`.content-col-${index + 1}`)[0];

        let aTag = document.createElement('A');
        aTag.classList.add('float-right', 'readmore-link');


        aTag.innerText = 'Read more';
        pTag.classList.add('blog-content-p');

        divCol8.appendChild(pTag);
        divCol8.append(aTag);

        // used to trim the string when the nummber of characters exceed 250 
        // append '...' at the end
        if (content.length > 250) {

            content = content.substring(0, 250);
            content += '...';
            pTag.innerText = content;
        }
    });

    // iterates through session storage to get posts' images
    sessionBlogImage.forEach((images, index) => {

        // creates img and sets the src content to images
        // values of src retrieved from session storage
        // add class names to reflects style
        // append img elemets as child of the div 'divCol4'
        let imagTag = document.createElement('IMG');
        divCol4 = $(`.img-col-${index + 1}`)[0];

        imagTag.classList.add('img-fluid', 'blog-img');
        imagTag.src = images;
        divCol4.appendChild(imagTag);
    });

    // append each div as a child to the big container
    for (i = 0; i < sessionBlogContent.length; i++) {

        divCol4 = $(`.img-col-${index + 1}`)[0];
        divCol8 = $(`.content-col-${index + 1}`)[0];
        divRow = $(`.row-num-${index + 1}`)[0];
        articleTag = $(`.blog-post-${index + 1}`)[0];

        divRow.appendChild(divCol4);
        divRow.appendChild(divCol8);
        articleTag.appendChild(divRow);
        bigContainer.appendChild(articleTag);
    }
}

// fires this function when input file content changed
function trackFile(e) {

    let img = e.files[0];
    let arrayImages = [];

    // declares a file reader object
    let reader = new FileReader();
    reader.onloadend = function () {

        // check if session storge with this key exists or not
        // used here stores the same number of data
        // it's Important to check, otherwise all previous values will be override 
        if (sessionStorage["blog-image"]) {
            // gets session storage data and stores it 
            // pushs the file's contents in array. 'reader.result'
            // stores array in session storage
            let sessionBlogImage = JSON.parse(sessionStorage.getItem('blog-image'));
            sessionBlogImage.push(reader.result);
            sessionStorage.setItem('blog-image', JSON.stringify(sessionBlogImage));
        }

        else {

            arrayImages.push(reader.result);
            sessionStorage.setItem('blog-image', JSON.stringify(arrayImages));
        }
    };

    // to read the contents of the input file content, here is image
    reader.readAsDataURL(img);
}
