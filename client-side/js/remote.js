remote = (() => {

    const base = "http://localhost:8090";

    let isAuth = () => {
        return localStorage.getItem('Authorization') !== null;
    }

    let getTag = (tagName) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/tag/' + tagName,
        })
    }

    let loadByUploadDate = (name, page, perPage) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/filter' + '?name=' + name + '&orderBy=date' + '&page=' + page + '&perPage=' + perPage
        })
    }

    let getHomeExtension = (mostDownloadedCount, mostRecentCount) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/getHomeExtensions' + '?mostDownloadedCount=' + mostDownloadedCount + '&mostRecentCount=' + mostRecentCount
        })
    }

    let changePassword = (changePassword) => {
    console.log(changePassword)
        return $.ajax({
            type: 'PATCH',
            url: base + "/api/auth/changePassword",
            data: JSON.stringify(changePassword),
            contentType: 'application/json',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let loadByName = (name, page, perPage) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/filter' + '?name=' + name + '&orderBy=name' + '&page=' + page + '&perPage=' + perPage
        })
    }

    let loadByTimesDownloaded = (name, page, perPage) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/filter' + '?name=' + name + '&orderBy=downloads' + '&page=' + page + '&perPage=' + perPage
        })
    }

    let loadByLatestCommit = (name, page, perPage) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/filter' + '?name=' + name + '&orderBy=commits' + '&page=' + page + '&perPage=' + perPage
        })
    }

    let loadFeatured = () => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/featured'
        })
    }

    let createExtension = (formData) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/extensions/auth/create',
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }
    let editExtension = (id, formData) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/extensions/auth/edit/' + id,
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let submitExtensionFiles = (extensionId, formData) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/auth/upload/extensionFiles/' + extensionId,
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }
    let submitFile = (id, file) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/auth/upload/file/' + id,
            data: file,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let submitImage = (id, image) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/auth/upload/image/' + id,
            data: image,
            contentType: false,
            processData: false,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let getUserProfile = (id) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/users/' + id,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let login = (user) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/users/login',
            data: JSON.stringify(user),
            contentType: 'application/json'
        })
    }

    let register = (user) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/users/register',
            data: JSON.stringify(user),
            contentType: 'application/json',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let registerAdmin = (user) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/users/auth/adminRegistration',
            data: JSON.stringify(user),
            contentType: 'application/json',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let setPublishedState = (id, state) => {
        return $.ajax({
            type: 'PATCH',
            url: base + '/api/extensions/auth/' + id + '/status/' + state,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let setFeaturedState = (id, state) => {
        return $.ajax({
            type: 'PATCH',
            url: base + '/api/extensions/auth/' + id + '/featured/' + state,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }

    let deleteExtension = (id) => {
        return $.ajax({
            type: 'DELETE',
            url: base + '/api/extensions/auth/' + id,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })

    }

    let setUserState = (id, state) => {
        return $.ajax({
            type: 'PATCH',
            url: base + '/api/users/auth/setState/' + id + '/' + state,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    let getExtension = (id) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/' + id,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    let setGitHubSettings = (gitHubSettings) => {
        return $.ajax({
            type: 'POST',
            url: base + '/api/github/auth',
            data: JSON.stringify(gitHubSettings),
            contentType: 'application/json',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            },
        })
    }
    let refreshGitHub = (id) => {
        return $.ajax({
            type: 'PATCH',
            url: base + '/api/extensions/auth/' + id + '/github',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }
    let getUsers = (state) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/users/auth/all' + '?state=' + state,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    let loadPending = () => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/auth/unpublished',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    let downloadFile = (id) => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/extensions/download/' + id,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    let rateExtension = (id, rating) => {
        return $.ajax({
            type: 'PATCH',
            url: base + '/api/rating/auth/rate/' + id + "/" + rating,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    let getCurrentGitHubSettings = () => {
        return $.ajax({
            type: 'GET',
            url: base + '/api/github/auth',
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
    }

    return {
        isAuth,
        getTag,
        loadByUploadDate,
        loadByName,
        loadByTimesDownloaded,
        loadByLatestCommit,
        submitFile,
        submitImage,
        createExtension,
        editExtension,
        getUserProfile,
        setGitHubSettings,
        refreshGitHub,
        login,
        getUsers,
        getExtension,
        setPublishedState,
        setFeaturedState,
        deleteExtension,
        loadFeatured,
        loadPending,
        setUserState,
        register,
        registerAdmin,
        downloadFile,
        rateExtension,
        changePassword,
        getCurrentGitHubSettings,
        submitExtensionFiles,
        getHomeExtension
    }
})()
