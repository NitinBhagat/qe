'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Form',

    events: {
        mainpageModelSubmit: 'mainpageModelSubmit',
        mainpageModelCancel: 'mainpageModelCancel'
    },

    onmainpageModelFormSubmit: function() {
        this.notify({
            eventName: this.events.mainpageModelSubmit
        });
    },

    onmainpageModelFormCancel: function() {
        this.notify({
            eventName: this.events.mainpageModelCancel
        });
    },
    // additional properties

});

// START_CUSTOM_CODE_mainpage
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_mainpage
module.exports = ViewModel;