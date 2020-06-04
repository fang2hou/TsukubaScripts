// ==UserScript==
// @name         TsukubaAuth
// @namespace    FangScripts
// @version      0.1
// @include      *://idp.account.tsukuba.ac.jp/*
// @description  try to take over the world!
// @author       Zhou Fang
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
(function() {
    'use strict';

    let UsernameTextArea = document.getElementById("username");
    let PasswordTextArea = document.getElementById("password");
    let SubmitButtons = document.getElementsByTagName("button");

    if (UsernameTextArea == null || PasswordTextArea == null) {
        return;
    };

    // Start Configuration
    var configIsOpen = false;

    GM_config.init({
        'id': 'TsukubaAuthConfigs',
        'title': 'Auth Configuration',
        'fields': {
            'userId':
            {
                'label': 'User ID',
                'type': 'text',
                'title': 'UTID-13 or UTID-NAME',
            },
            'password':
            {
                'label': 'Password',
                'type': 'text',
                'title': 'Your Password',
            }
        },
        'events': {
            'close': function() {
                configIsOpen = false;
                setTimeout(function() {
                    submitForm();
                }, 1000);
            },
        }
    });

    // Create a button for opening config frame
    var openConfigButton = document.createElement('button');
    openConfigButton.innerHTML = 'Auto Auth Settings';
    openConfigButton.onclick = function() {
        configIsOpen = true;
        GM_config.open();
    };

    let rightPanel = document.getElementsByClassName("column two")
    rightPanel[0].parentElement.appendChild(openConfigButton);

    // Func: Change the text areas and submit the form
    function submitForm() {
        if (configIsOpen == true) {
            return;
        };

        var username = GM_config.get('userId');
        var password = GM_config.get('password');

        if (username == '' || password == '') {
            configIsOpen = true;
            GM_config.open();
        } else {
            UsernameTextArea.value = username;
            PasswordTextArea.value = password;
            SubmitButtons[0].click();
        }
    }

    // In this 1 sec, user is able to open the config frame
    setTimeout(function() {
        submitForm();
    }, 1000);

})();