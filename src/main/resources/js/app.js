let app = (() => {

    let $body = $('body');

    const PAGE_SIZE = 10;
    const POPULAR_HOME_PAGE_COUNT = 5;
    const NEW_HOME_PAGE_COUNT = 5;

    let getHomeView = (e) => {
        preventDefault(e);
        loadNav();

        show.home();
    }

    let getHome = () => {
        remote.loadFeatured().then(
            res => {
                show.homeFeatured(res);
            }
        );
        remote.loadByUploadDate("", 1, NEW_HOME_PAGE_COUNT).then(
            res => {
                show.homeNew(res)
            }
        );
        remote.loadByTimesDownloaded("", 1, POPULAR_HOME_PAGE_COUNT).then(
            res => {
                show.homePopular(res)
            }
        );
    }
    function getUsers(e) {
        preventDefault(e);
        let buttonId = $(this).attr('id');
        console.log(buttonId);
        switch (buttonId) {
            case 'active':
                request = remote.getUsers("active").then(
                res => {
                    console.log(res);
                    show.users(res,"block","all","active");
                }
                );
            break;
            case 'blocked':
                request = remote.getUsers("blocked").then(
                res => {
                    console.log(res);
                    show.users(res,"active","all","blocked");
                }
                );
            break;
            default:
                request = remote.getUsers("all").then(
                res => {
                    console.log(res);
                    show.users(res,"active","blocked","all");
                }
                );
            return;
        }
        console.log(buttonId);
        }


    function search(e) {
        preventDefault(e);

        let orderBy = $(this).attr('orderBy');
        let page = 1;
        let query = '';

        if ($(this).attr('pagenum')) {
            page = $(this).attr('pagenum');
            query = $('#query').text();
        }

        else if ($(this).attr('id') === 'search') {
            query = $('#search-input').val().trim();
            if (query.length === 0) return;
        }

        else if ($(this).is('button')) {
            query = $('#query').text();
        }

        let request;

        switch (orderBy) {
            case 'date':
                request = remote.loadByUploadDate(query, page, PAGE_SIZE);
                break;
            case 'name':
                request = remote.loadByName(query, page, PAGE_SIZE);
                break;
            case 'downloads':
                request = remote.loadByTimesDownloaded(query, page, PAGE_SIZE);
                break;
            case 'commits':
                request = remote.loadByLatestCommit(query, page, PAGE_SIZE);
                break;
            default:
                return;
        }

        request.then(
            res => {
                res = render.searchResults(res, query, orderBy)
                show.results(res);
            }
        )


    }

    let getExtensionView = function (e) {
        preventDefault(e);

        let id = $(this).attr('extensionId');

        remote.getExtension(id).then(
            res => {
                res = render.extension(res)
                show.extension(res)
            }
        );
    }

    let getTagView = function (e) {
        preventDefault(e);

        let tagName = $(this).attr('tagName');

        remote.getTag(tagName).then(
            show.tag
        )
    }

    let getProfileView = function (e) {
        preventDefault(e);

        let id = $(this).attr('userId');

        remote.getUserProfile(id).then(
            res => {
                res = render.profile(res);
                show.user(res);
            }
        )
    }

    let getOwnProfileView = function (e) {
        preventDefault(e);

        let id = localStorage.getItem('id');

        remote.getUserProfile(id).then(
            res => {
                res = render.profile(res);
                show.user(res);
            }
        )
    }

    let getLoginView = (e) => {
        preventDefault(e);
        show.login();
    }

    let getRegisterView = (e) => {
        preventDefault(e);
        show.register();
    }

    let getSubmitView = (e) => {
        preventDefault(e);
        show.submit();
    }

    let getUsersView = (e) => {
        preventDefault(e);
        let id = $(this).attr('id');
        console.log(id);
        remote.getUsers().then(
            res => {
                res = render.profile(res);
                show.users(res);
            }
        )
    }

    let register = function (e) {
        preventDefault(e);

        let username = $('#username').val();
        let password = $('#password').val();
        let repeatPassword = $('#repeatPassword').val();

        let registrationForm = {
            username,
            password,
            repeatPassword
        }
        remote.register(registrationForm).then(
        res => {
            login();
        }
        );

    }

    let login = function (e) {
        preventDefault(e);

        let username = $('#username').val();
        let password = $('#password').val();

        let user = {
            username,
            password,
        }

        remote.login(user).then(
            res => {
                localStorage.setItem('Authorization', res['token']);
                localStorage.setItem('id', res['id']);
                localStorage.setItem('username', res['username']);
                localStorage.setItem('role', res['role']);
                getHomeView();
            }
        );
    }

    let logout = (e) => {
        preventDefault(e);
        localStorage.clear();
        getHomeView();
    }

    let setPublishedState = function (e) {
        preventDefault(e);

        let id = $(this).attr('extensionId');
        let state = $(this).attr('setState');

        remote.setPublishedState(id, state).then(
            res => {
                console.log(res);
                show.pendingState(res)
            }
        );
    }

    let setFeaturedState = function (e) {
        preventDefault(e);

        let id = $(this).attr('extensionId');
        let state = $(this).attr('setState');

        remote.setFeaturedState(id, state).then(
            show.featuredState
        );
    }

    let deleteExtension = function (e) {
        preventDefault(e);

        let extensionId = $(this).attr('extensionId');
        remote.deleteExtension(extensionId).then(
            res => {
                getHomeView();
            }
        );
    }

    function setUserState(e) {
        preventDefault(e);

        let newState = $(this).attr('id');
        let userId = $(this).attr('userId');
        remote.setUserState(userId, newState).then(
            show.state
        ).catch((e) => {
            console.log(e);
        })
    }
    function refreshUsersView(e){
        preventDefault(e);
        let newState = $(this).attr('id');
        let userId = $(this).attr('userId');
        remote.setUserState(userId, newState).then(
            res => {
        let buttonCurrent = $(".current").attr('id');
        let ignore = $(".not").attr('id');
        let ignore1 = $(".not1").attr('id');
        console.log(ignore);
        console.log(ignore1)
               remote.getUsers(buttonCurrent).then(
                   res => {
                       console.log(res);
                       show.users(res,ignore,ignore1,buttonCurrent);
                   });
            })

    }

    let submit = (e) => {
        preventDefault(e);
        if (!hitEnter(e)) return;

        let name = $('#name').val();
        let version = $('#version').val();
        let description = $('#description').val();
        let github = $('#github').val();
        let tags = $('#tags').val();

        let extension = {
            name,
            version,
            description,
            github,
            tags
        }
        remote.submitExtension(extension).then(
            res => {
                getHomeView();
            }
        )
    }

    let getPendingExtensionsView = (e) => {
        preventDefault(e);

        remote.loadPending().then(
            show.pending
        )
    }

    function preventDefault(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    let loadNav = () => {
        if (remote.isAuth()) {
            if (localStorage.getItem('role') === 'ROLE_ADMIN') {
                show.adminNav();
            }
            else show.userNav();
        }
        else {
            show.guestNav();
        }
    }

    function hitEnter(e) {
        if (e.type === 'keypress' && e.which !== 13) {
            return false;
        }
        return true
    }
    $body.on('click', '.logo a', getHomeView)
    $body.on('click', '#login', getLoginView)
    $body.on('click', '#users', getUsers)
    $body.on('click', '#active', getUsers)
    $body.on('click', '#blocked', getUsers)
    $body.on('click', '#all', getUsers)
    $body.on('click', '#logout', logout)
    $body.on('click', '#register', getRegisterView)
    $body.on('click', '#profile', getOwnProfileView)
    $body.on('click', '#pending', getPendingExtensionsView)
    $body.on('click', '#search, #discover', search)
    $body.on('click', '#submit', getSubmitView)
    $body.on('click', '.hw-extensions .one', getExtensionView)
    $body.on('click', '.pages-control a', search)
    $body.on('click', '#submit-btn', submit)
    $body.on('click', '#register-btn', register)
    $body.on('click', '#login-btn', login)
    $body.on('click', '.tags a', getTagView)
    $body.on('click', '.user-link', getProfileView)
    $body.on('click', '.list-users .one', refreshUsersView)
    $body.on('click', '#orderBy button', search)
    $body.on('click', '.user-state-controls button', setUserState)
    $body.on('click', '.action-btn #change-published-state', setPublishedState)
    // $body.on('click', '.action-btn #edit', setPublishedState)
    $body.on('click', '.action-btn #delete', deleteExtension)
    // $body.on('click', '.action-btn #refresh-github', deleteExtension)
    $body.on('click', '.action-btn #change-featured-state', setFeaturedState)


    return {
        getHomeView,
        getHome
    }
})();

app.getHomeView();