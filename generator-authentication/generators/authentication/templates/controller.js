// start require
service = require('./<%= parent %>-service'),
localSettings = require('application-settings'),
// end require

// start functions
function validateData(data) {
    if(!data.email) {
        alert('Missing email');
        return false;
    }

    if(!data.password) {
        alert('Missing password');
        return false;
    }

    return true;
}

function authError(error) {
    if (error) {
        if (error.message) {
            alert(error.message);
        }

        return false;
    }
}

function signinSuccess() {
    helpers.navigate('components/<%= signinRedirect %>/<%= signinRedirect %>');
}

function onSignin(data) {
    if(validateData(data)){
        data.email = data.email.toLowerCase();
        service.signin(data, signinSuccess, authError);
    }
}

<% if (enableRegistration) { %>
function registerSuccess() {
    helpers.navigate('components/<%= registerRedirect %>/<%= registerRedirect %>');
}

function onRegister(data) {
    if(validateData(data)){
        data.email = data.email.toLowerCase();
        service.register(data, registerSuccess, authError);
    }
}

function onShowRegister(){
    viewModel.onShowRegister();
}

function onShowSignin(){
    viewModel.onShowSignin();
}
<% } %>
// end functions

// start pageLoaded
if (page.navigationContext && page.navigationContext.logout) {
    service.signout(onShowSignin, onShowSignin);
} else {
    if (service.isAuthenticated()) {
        service.setAuthorization();
        signinSuccess();
    }<% if (enableRememberme) { %> else {
        var rememberedData = localSettings.hasKey(service.rememberKey) && JSON.parse(localSettings.getString(service.rememberKey));
        if (rememberedData && rememberedData.email && rememberedData.password) {
            onSignin(rememberedData);
        }
    }<% } %>
}
// end pageLoaded

// start pageInit
    viewModel.on(viewModel.events.signin, onSignin);
    <% if (enableRegistration) { %>
    viewModel.on(viewModel.events.register, onRegister);
    viewModel.on(viewModel.events.showRegister, onShowRegister);
    viewModel.on(viewModel.events.showSignin, onShowSignin);
    <% } %>
// end pageInit
