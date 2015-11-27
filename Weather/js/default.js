// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var nav = WinJS.Navigation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                //TODO: 已经新启动此应用程序。请在此初始化你的应用程序。
                var titleBar = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
                console.log(titleBar);
                titleBar.backgroundColor = Windows.UI.Colors.black;
                titleBar.buttonBackgroundColor = Windows.UI.Colors.black;
                titleBar.inactiveBackgroundColor = Windows.UI.Colors.black;
                titleBar.buttonInactiveBackgroundColor = Windows.UI.Colors.black;
                titleBar.buttonHoverBackgroundColor = {r: 30, g: 30, b: 30, a: 1};
                titleBar.buttonHoverForegroundColor = Windows.UI.Colors.white;
                // console.log(titleBar);
                var mySplitView = window.mySplitView = {
                    splitView: new WinJS.UI.SplitView(document.querySelector('.splitView'), {oninvoked: function (ev) {
                        mySplitView.splitView.closePane();
                        var location = ev.target.winControl.location;
                        if (location && location !== nav.location) {
                            nav.navigate(location);
                        }
                    }}),
                    homeClicked: WinJS.UI.eventHandler(function (ev) {
                        // mySplitView.splitView.closePane();
                        
                    }),
                    cityClicked: WinJS.UI.eventHandler(function (ev) {
                        // mySplitView.splitView.closePane();
                        
                    })
                };
                /*var messageDialog = new Windows.UI.Popups.MessageDialog('nav.state.name1');
                console.log(messageDialog);
                messageDialog.showAsync().done(function () {
                    console.log('success');
                    var popupMenu = new Windows.UI.Popups.PopupMenu();
                    console.log(popupMenu.commands);
                    popupMenu.showAsync({x: 100, y: 100}).done(function () {
                        console.log('popupMenu');
                    });
                });*/
                // Windows.Storage.ApplicationData.current.localSettings.values['data'] = '{"date": "1992-3-25", "value": 23}';
                // console.log(Windows.Storage.ApplicationData.current.localSettings);

                var xmlDocument = new Windows.Data.Xml.Dom.XmlDocument();
                // console.log(xmlDocument);
                // console.log(Windows.UI.Notifications.TileUpdateManager);
                var Notifications = Windows.UI.Notifications;

                // Get an XML DOM version of a specific template by using getTemplateContent.
                var tileXml = Notifications.TileUpdateManager.getTemplateContent(Notifications.TileTemplateType.tileWide310x150Text03);

                // You will need to look at the template documentation to know how many text fields a particular template has.
                // Get the text attribute for this template and fill it in.
                var tileAttributes = tileXml.getElementsByTagName("text");
                tileAttributes[0].appendChild(tileXml.createTextNode("Hello World!"));

                // Create the notification from the XML.
                var tileNotification = new Notifications.TileNotification(tileXml);

                // Send the notification to the calling app's tile.
                Notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);
                var divControlCreation = document.querySelector("#divControlCreation");

                //
                // This function demonstrates creating a date picker control
                // and attaching to to a DOM element through JavaScript
                //
                function createDatePickerImperative() {
                    resetOutput();

                    // Create a JavaScript date object for date September 1, 1990.
                    // Note, JavaScript months are 0 based so September is referenced by 8, not 9
                    var initialDate = new Date();

                    // Create a new DatePicker control with value of initialDate inside element "myDatePickerDiv"
                    var control = new WinJS.UI.DatePicker(divControlCreation, { current: initialDate });
                }

                //
                // This function demonstrates creating a data picker control
                // declaratively through HTML
                //
                function createDatePickerDeclarative() {
                    resetOutput();

                    // Specify the control type to be created along with an options record to generate instance with given value.
                    // Note: internally, date value is passed along to the JavaScript Date object constructor which does the parsing.
                    divControlCreation.innerHTML = "<div id=\"solstice2011\" data-win-control='WinJS.UI.DatePicker' data-win-options='{current:\"June, 21, 2011\"}'></div>";

                    // Activate controls inside the div and process the options records
                    WinJS.UI.processAll(divControlCreation);

                }

                function resetOutput() {
                    divControlCreation.innerHTML = "";
                }

                // document.querySelector("#createImperative").addEventListener("click", createDatePickerImperative, false);
                // document.querySelector("#createDeclarative").addEventListener("click", createDatePickerDeclarative, false);


            } else {
                // TODO: 此应用程序已挂起，然后终止。
                // 若要创造顺畅的用户体验，请在此处还原应用程序状态，使应用似乎永不停止运行。
            }
            WinJS.Application.sessionState.previousExecutionState = args.detail.previousExecutionState;

            if (app.sessionState.history) {
                nav.history = app.sessionState.history;
            }
            args.setPromise(WinJS.UI.processAll().then(function () {
                // var splitView = document.querySelector(".splitView").winControl;
                // new WinJS.UI._WinKeyboard(splitView.paneElement);

                var notifications = Windows.UI.Notifications;
                // console.log(notifications);
                var template = notifications.ToastTemplateType.toastImageAndText01;
                var toastXml = notifications.ToastNotificationManager.getTemplateContent(template);
                var toastTextElements = toastXml.getElementsByTagName("text");
                toastTextElements[0].appendChild(toastXml.createTextNode("Hello World!"));
                // console.log(toastXml);
                var toast = new notifications.ToastNotification(toastXml);
                var toastNotifier = notifications.ToastNotificationManager.createToastNotifier();
                // toastNotifier.show(toast);
                // console.log(WinJS.Application.navigator);
                // Windows.UI.Core.SystemNavigationManager.getForCurrentView().appViewBackButtonVisibility = 0;
                // console.log(WinJS.Navigation.canGoBack);
                if (nav.location) {
                    nav.history.current.initialPlaceholder = true;
                    return nav.navigate(nav.location, nav.state);
                } else {
                    return nav.navigate(Application.navigator.home);
                }
            }));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: 此应用程序将被挂起。请在此保存需要挂起中需要保存的任何状态。
        //你可以使用 WinJS.Application.sessionState 对象，该对象在挂起中会自动保存和还原。
        //如果需要在应用程序被挂起之前完成异步操作，请调用 args.setPromise()。
        app.sessionState.history = nav.history;
    };

    app.start();
})();
