'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Home View",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Form",
    "moduleName": "components/mainpage/mainpage",
    "icon": "\ue204"
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;