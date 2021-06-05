
function viewBlogs() {
    console.log('run viewBlogs function');

    let sessionBlogTitle = JSON.parse(sessionStorage.getItem('blog-title'));
    let sessionBlogContent = JSON.parse(sessionStorage.getItem('blog-content'));
    let sessionBlogImage = JSON.parse(sessionStorage.getItem('blog-image'));

    // delete the div when you post
    if (sessionBlogTitle.length > 0) {
        $(".no-content-div").remove();
    }

    let bigContainer = $('.blog-content-coloumn')[0];
    sessionBlogContent.forEach((blog, index) => {

        // create elements
        let articleTag = document.createElement('ARTICLE');
        let divRow = document.createElement('DIV');
        let divCol4 = document.createElement('DIV');
        let divCol8 = document.createElement('DIV');
        let aTag = document.createElement('A');

        // add classes to the elements
        articleTag.classList.add('blog-post', 'blog-post-' + (index + 1));
        divRow.classList.add('row', 'row-num-' + (index + 1));
        divCol4.classList.add('col-sm-4', 'col-num-' + (index + 1));
        divCol8.classList.add('col-sm-8', 'blog-post-div', 'blog-post-div-' + (index + 1));
        aTag.classList.add('float-right', 'readmore-link', 'readmore-link-' + (index + 1));
        aTag.innerText = 'Read more';

    });


    sessionBlogTitle.forEach((title, index) => {
        let h3Tag = document.createElement('H3');
        h3Tag.classList.add('blog-title-h3');
        h3Tag.innerText = title;
        let tagName = '.blog-post-div-' + (index + 1);
        $(tagName).append(h3Tag);
        // divCol8.appendChild(h3Tag);

    });

    sessionBlogContent.forEach((content, index) => {

        let pTag = document.createElement('P');
        pTag.classList.add('blog-content-p');
        pTag.innerText = content;
        let tagName = '.blog-post-div-' + (index + 1);
        let tagName2 = '.blog-post-div-' + (index + 1);
        let tagName3 = '.readmore-link-' + (index + 1);
        $(tagName).append(pTag);
        $(tagName2).append($(tagName3));
        // divCol8.appendChild(pTag);
        // divCol8.append(aTag);
    });

    if (sessionBlogImage.length > 1) {
        sessionBlogImage.forEach((images, index) => {

            let imagTag = document.createElement('IMG');
            imagTag.classList.add('img-fluid', 'blog-img');
            imagTag.src = images;
            let tagName = '.col-num-' + (index + 1);
            $(tagName).append(imagTag);
            // divCol4.appendChild(imagTag);
        });
    }

    else if (sessionBlogImage.length == 1) {
        let imagTag = document.createElement('IMG');
        imagTag.classList.add('img-fluid', 'blog-img');
        imagTag.src = sessionBlogImage;
        divCol4.appendChild(imagTag);
    }


    sessionBlogTitle.forEach((item, index) => {
        let tagName = '.row-num-' + (index + 1);
        let tagName2 = '.col-num-' + (index + 1);
        let tagName3 = '.row-num-' + (index + 1);
        let tagName4 = '.blog-post-div-' + (index + 1);
        let tagName5 = '.blog-post-' + (index + 1);
        let tagName6 = '.row-num-' + (index + 1);
        let tagName7 = '.blog-post-' + (index + 1);

        console.log(tagName)

        $(tagName).append($(tagName2));
        $(tagName3).append($(tagName4));
        $(tagName5).append($(tagName6));

        (bigContainer).append($(tagName7));
    });

}
