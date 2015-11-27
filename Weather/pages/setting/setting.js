(function () {
    'use strict';

    WinJS.UI.Pages.define('/pages/setting/setting.html', {
        init: function () {
            // console.log('init');
        },
        processed: function () {
            // console.log('processed');
        },
        ready: function () {
            // console.log('ready');
            var wifiToggle = document.querySelector('#wifiToggle').winControl,
                roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            if (!roamingSettings.values['isToast']) {
                roamingSettings.values['isToast'] = wifiToggle.checked ? 'on' : 'off';
            }
            wifiToggle.checked = roamingSettings.values['isToast'] === 'on' ? 1 : 0;
        },
        error: function () {
            console.log('error');
        }
    });
})();
function toggleWifi() {
    var obj = document.querySelector('#wifiToggle').winControl;
    Windows.Storage.ApplicationData.current.roamingSettings.values['isToast'] = obj.checked ? 'on' : 'off';
}
WinJS.Utilities.markSupportedForProcessing(toggleWifi);