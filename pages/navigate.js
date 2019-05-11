const navigate = (page, params = {}) => {
    $('#container').children().remove();
    switch (page) {
        case 'home':
            renderHomePage(params);
        break;
        case 'post':
            renderPostPage(params);
        break;
        case 'login':
            renderLoginPage(params);
        break;
    }
}