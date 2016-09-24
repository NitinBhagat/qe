'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    gestures = require('ui/gestures'),
    // additional requires

    viewModel = require('./homeView-view-model');

function onhomeViewModelFormSubmit() {}

function onhomeViewModelFormCancel() {
    helpers.back();
}

// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        viewModel.on(viewModel.events.homeViewModelSubmit, onhomeViewModelFormSubmit);

        viewModel.on(viewModel.events.homeViewModelCancel, onhomeViewModelFormCancel);

        // additional pageInit

    }
}

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_homeView
exports.pageLoaded = pageLoaded;