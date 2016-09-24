// start require
dataService = require('../../dataProviders/<%= dataProvider %>'),
localSettings = require('application-settings'),
// end require

// start properties
consts = {
    accessTokenKey: 'accessToken',
    accessTokenTypeKey: 'accessTokenType',
    accessTokenPrincipalIdKey: 'accessTokenPrincipalId' <% if (enableRememberme) { %>,
    rememberKey: '<%= dataProvider %>_authData_<%= name %>'<% } %>
};

function validateArgs(args) {
    if (!args.email) {
        throw new Error('Service: login - missing email');
    }

    if (!args.password) {
        throw new Error('Service: login - missing password');
    }
}
<% if (enableRememberme) { %>
Service.prototype.rememberKey = consts.rememberKey;<% } %>
Service.prototype.signin = function(args, successCallback, errorCallback) {
    validateArgs(args);

    return dataService.Users.login(args.email, args.password)
        .then(function (e) {
            localSettings.setString(consts.accessTokenKey,
                e.result.access_token);
            localSettings.setString(consts.accessTokenTypeKey,
                e.result.token_type);
            localSettings.setString(consts.accessTokenPrincipalIdKey,
                e.result.principal_id);
            <% if (enableRememberme) { %>
            var rememberedData = {
                    email: args.email,
                    password: args.password
                };

            if (args.rememberme && rememberedData.email && rememberedData.password) {
                localSettings.setString(consts.rememberKey, JSON.stringify(rememberedData));
            }<% } %>

            successCallback();
        }, errorCallback);
};
<% if (enableLogout) { %>
Service.prototype.signout = function(successCallback, errorCallback) {
    if (!errorCallback) {
        errorCallback = function () {};
    }
    return this.getCurrentUser().then(function _logoutUser(){
        return dataService.Users.logout()
        .then(function (e) {
            localSettings.remove(consts.accessTokenKey);
            localSettings.remove(consts.accessTokenTypeKey);
            localSettings.remove(consts.accessTokenPrincipalIdKey);<% if (enableRememberme) { %>
            localSettings.remove(consts.rememberKey);<% } %>

            successCallback();
        }, errorCallback);
    }, errorCallback);
};
<% } %><% if (enableRegistration) { %>
Service.prototype.register = function(args, successCallback, errorCallback) {
    validateArgs(args);

    return dataService.Users.register(args.email, args.password, { Email: args.email, DisplayName: args.displayName})
        .then(successCallback, errorCallback);
};
<% } %>
Service.prototype.getCurrentUser = function() {
    return dataService.Users.currentUser();
};

Service.prototype.isAuthenticated = function() {
    return localSettings.getString(consts.accessTokenKey) &&
        localSettings.getString(consts.accessTokenTypeKey) &&
        localSettings.getString(consts.accessTokenPrincipalIdKey);
};

Service.prototype.setAuthorization = function() {
    dataService.Users.setAuthorization(
        localSettings.getString(consts.accessTokenKey),
        localSettings.getString(consts.accessTokenTypeKey),
        localSettings.getString(consts.accessTokenPrincipalIdKey));
};
// end properties
