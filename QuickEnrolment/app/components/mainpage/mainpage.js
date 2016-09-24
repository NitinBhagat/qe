'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    gestures = require('ui/gestures'),
    // additional requires

    viewModel = require('./mainpage-view-model');

function onmainpageModelFormSubmit() {
    var topmost = frameModule.topmost();
    topmost.navigate("../navigation/navigation");
}

function onmainpageModelFormCancel() {
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

        viewModel.on(viewModel.events.mainpageModelSubmit, onmainpageModelFormSubmit);

        viewModel.on(viewModel.events.mainpageModelCancel, onmainpageModelFormCancel);

        // additional pageInit

    }
}

// START_CUSTOM_CODE_mainpage
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_mainpage
exports.pageLoaded = pageLoaded;