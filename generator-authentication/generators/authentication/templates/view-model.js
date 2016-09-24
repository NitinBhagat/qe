// start properties
<% if(enableRegistration) { %>
signinVisibility: 'visible',
registerVisibility: 'collapsed',
displayName: '',<% } %>
email: '',
password: '',
<% if (enableRememberme) { %>rememberme: '',
<% } %>
events: {<% if(enableRegistration) { %>
    register: 'register',
    showRegister: 'showRegister',
    showSignin: 'showSignin',<% } %>
    signin: 'signin'
},

onSignin: function() {
    this.notify({
        eventName: this.events.signin,
        email: this.get('email'),
        password: this.get('password')<% if (enableRememberme) { %>,
        rememberme: this.get('rememberme')
<% } %>
    });
},
<% if (enableRegistration) { %>
onShowRegister: function() {
    this.set('signinVisibility', 'collapsed');
    this.set('registerVisibility', 'visible');
},

onRegister: function() {
    this.notify({
        eventName: this.events.register,
        displayName: this.get('displayName'),
        password: this.get('password'),
        email: this.get('email')
    });
},

onShowSignin: function() {
    this.set('signinVisibility', 'visible');
    this.set('registerVisibility', 'collapsed');
},<% } %>
// end properties
