'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    backButtonHidden: true,

    pageTitle: 'Home View',

    events: {
        homeViewModelSubmit: 'homeViewModelSubmit',
        homeViewModelCancel: 'homeViewModelCancel'
    },

    onhomeViewModelFormSubmit: function() {
        this.notify({
            eventName: this.events.homeViewModelSubmit
        });
    },

    onhomeViewModelFormCancel: function() {
        this.notify({
            eventName: this.events.homeViewModelCancel
        });
    },
    // additional properties

});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
module.exports = ViewModel;